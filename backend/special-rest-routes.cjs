const passwordEncryptor = require("./passwordEncryptor.cjs");

module.exports = function (app, runQuery, db) {
  app.get("/api/online-users", (req, res) => {
    runQuery(
      "online-users",
      req,
      res,
      {},
      `
      SELECT id, username FROM users WHERE loggedIn = 1
    `
    );
  });

  app.get("/api/my-chatrooms", (req, res) => {
    runQuery(
      "my-chat-room",
      req,
      res,
      { userId: req.session.user.id },
      `
      SELECT * FROM chatMembers WHERE userId = :userId
    `
    );
  });

  app.get("/api/current-user", (req, res) => {
    runQuery(
      "my-chat-room",
      req,
      res,
      { userId: req.session.user.id },
      `
      SELECT id, username, userRole FROM users WHERE id = :userId
    `
    );
  });

  app.get("/api/my-invitations", (req, res) => {
    runQuery(
      "my-chat-room",
      req,
      res,
      { userId: req.session.user.id },
      `
      SELECT * FROM allPendingInvitations WHERE userId = :userId
    `
    );
  });

  function editMyUserInfo(req, res) {
    // fix security issue
    // (user could elevate their own user role)
    delete req.body.userRole;

    let userId = req.session.user?.id;

    let queryParameters = { ...req.body, id: userId };

    if (queryParameters.password) {
      queryParameters.password = passwordEncryptor(queryParameters.password);
    }

    runQuery(
      "edit-my-user-info",
      req,
      res,
      queryParameters,
      `
        UPDATE user
        SET ${Object.keys(req.body).map((x) => x + " = :" + x)}
        WHERE id = :id
    `
    );

    let stmt = db.prepare("SELECT * FROM user WHERE id = :id");
    let updatedUserInfo = stmt.all({ id: queryParameters.id })[0];
    delete updatedUserInfo.password;
    req.session.user = updatedUserInfo;
  }
  app.put("/api/edit-my-user-info", editMyUserInfo);
  app.patch("/api/edit-my-user-info", editMyUserInfo);
};
