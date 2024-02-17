const express = require("express");
const { formatRequest } = require("./handler/preprocessRequest");

// initialisation
const server = express();

// ejs setup
server.set("view engine", "ejs");

// render static folders
server.use(express.static("./public"));

// middleware
// server.use(formatRequest);

// routes
server.get("/", function (req, res) {
  res.render("index", { serverName: "Backend Server build upon Node.js" });
});

server.get("/profile/:username", function (req, res) {
  res.send(`Profile ${req.params.username}`);
});

// error handler
server.use(function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err });
});
server.listen(8080);
