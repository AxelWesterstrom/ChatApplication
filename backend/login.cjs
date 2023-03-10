const session = require("express-session");
const store = require("better-express-store");
const acl = require("./acl.cjs");
const passwordEncryptor = require("./passwordEncryptor.cjs");
const passwordField = "password";

// salt for cookie hash generation
let salt = "someUnusualStringThatIsUniqueForThisProject";

// if we are running in production mode and no password salt or short password salt exit
if (process.env.PRODUCTION) {
  if (!process.env.COOKIE_SALT) {
    console.log(
      "Shutting down, in production and missing env. variable COOKIE_SALT"
    );
    process.exit();
  } else if (process.env.COOKIE_SALT.length < 32) {
    console.log("Shutting down, env. variable COOKIE_SALT too short.");
    process.exit();
  } else {
    salt = process.env.COOKIE_SALT;
  }
}

module.exports = function (app, db) {
  app.use(
    session({
      secret: salt,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: "auto" },
      store: store({ dbPath: "./database/Chat.db" }),
    })
  );

  app.post("/api/login", (req, res) => {
    if (!acl("login", req)) {
      res.status(405);
      res.json({ _error: "Not allowed" });
    }
    req.body[passwordField] = passwordEncryptor(req.body[passwordField]);
    let stmt = db.prepare(`
      SELECT * FROM users
      WHERE username = :username AND password = :password
    `);
    let result = stmt.all(req.body)[0] || { _error: "No such user." };
    delete result.password;
    if (!result._error) {
      req.session.user = result;
    }
    res.json(result);
  });

  app.get("/api/login", (req, res) => {
    if (!acl("login", req)) {
      res.status(405);
      res.json({ _error: "Not allowed" });
    }
    res.json(req.session.user || { _error: "Not logged in" });
  });

  app.delete("/api/login", (req, res) => {
    if (!acl("login", req)) {
      res.status(405);
      res.json({ _error: "Not allowed" });
    }
    delete req.session.user;
    res.json({ success: "logged out" });
  });
};
