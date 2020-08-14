const express = require("express");
const Router = express.Router();
const passport = require("passport");

Router.post("/login", passport.authenticate("local"), (req, res) => {
  req.login(req.body, (error) => {
    if (error) res.send(error);
    else {
      res.send({
        message: "Logged in successfully",
        user: req.user,
      });
    }
  });
});

Router.get("/logout", (req, res) => {
  req.logout();
  res.send("logged out successfully");
});

module.exports = Router;
