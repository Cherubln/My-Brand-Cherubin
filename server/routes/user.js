import express from "express";
const Router = express.Router();
import passport from "passport";
import userController from "../controllers/userController";

Router.post("/login", passport.authenticate("local"), userController.logIn);

Router.get("/logout", userController.logOut);

export default Router;
