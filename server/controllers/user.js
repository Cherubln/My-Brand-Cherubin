const express = require("express");
const Router = express.Router();
const passport = require("passport");

Router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/loginSuccess",
    failureRedirect: "/loginFailure",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

Router.get("/loginSuccess", (req, res) => {
  res.send({ message: "you are Logged in", user: req.user });
});

Router.get("/loginFailure", (req, res) => {
  res.send({ error: " failed to Login" });
});

Router.get("/logout", (req, res) => {
  req.logout();
  res.send("logged out successfully");
});

Router.get(
  "/dashboard",
  (req, res, next) => {
    if (req.isAuthenticated()) return next();
    else res.send("Not logged in");
  },
  (req, res) => {
    res.send("welcome to dashboard");
  }
);

module.exports = Router;
