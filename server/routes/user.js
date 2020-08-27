import express from "express";
const Router = express.Router();
import userController from "../controllers/userController";
import validateUser from "../middleware/userValidator";
Router.post("/login", validateUser, userController.logIn);
Router.get("/logout", userController.logOut);
export default Router;
