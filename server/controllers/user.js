const express = require("express");
const Router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

Router.post("/login", passport.authenticate("local"), (req, res) => {
  jwt.sign(
    {
      data: req.body,
    },
    "secretKey",
    (error, token) => {
      res.send({
        message: "Logged in successfully",
        user: req.user,
        token,
      });
    }
  );
});

Router.get("/logout", (req, res) => {
  req.logout();
  res.send("logged out successfully");
});

module.exports = Router;
