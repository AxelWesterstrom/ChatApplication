const path = require("path");
const betterSqlite3 = require("better-sqlite3");
const db = betterSqlite3("./database/Chat.db");
const port = process.env.PORT || 4000;
const express = require("express");

if (!process.env.PRODUCTION) {
  console.log("WARNING: Runnning in dev mode with unsafe salts etc...");
}

const app = express();

app.use(express.static("frontend"));

app.use(express.json({ limit: "100MB" }));

app.listen(port, () => console.log("Listening on http://localhost:" + port));
const login = require("./login.cjs");

login(app, db);

const setupRESTapi = require("./rest-api.cjs");
setupRESTapi(app, db);

app.all("*", (req, res) => {
  res.status(404);
  res.set("Content-Type", "text/html");
  res.sendFile(path.join(__dirname, "frontend", "404.html"));
});
