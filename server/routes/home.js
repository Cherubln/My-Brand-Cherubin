import express from "express";
const router = express.Router();
import homeController from "../controllers/homecontroller";

router.get("/", homeController);
