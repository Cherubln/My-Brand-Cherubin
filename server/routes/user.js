const express = require("express");
const Router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");

Router.post("/login", passport.authenticate("local"), userController.logIn);

Router.get("/logout", userController.logOut);

module.exports = Router;
