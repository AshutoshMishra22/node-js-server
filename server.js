const express = require("express");
const server = express();

// middleware
server.use(function (req, res, next) {
  
});

// routes
server.get("/", function (req, res) {
  res.send("Server Homepage ");
});

server.listen(8080);
