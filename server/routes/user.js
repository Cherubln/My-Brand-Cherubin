import express from "express";
const Router = express.Router();
import passport from "passport";
import userController from "../controllers/userController";
import validateUser from "../middleware/userValidator";
Router.post(
  "/login",
  validateUser,
  passport.authenticate("local"),
  userController.logIn
);
Router.get("/logout", userController.logOut);
export default Router;
