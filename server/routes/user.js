const express = require("express");
const Router = express.Router();
const passport = require("passport");
const userValidator = require("../middleware/userValidator");
const userController = require("../controllers/userController");

Router.post(
  "/login",
  passport.authenticate("local"),
  userValidator,
  userController.logIn
);

Router.get("/logout", userController.logOut);

module.exports = Router;
