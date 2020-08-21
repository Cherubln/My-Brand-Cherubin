import express from "express";
const router = express.Router();

import likesController from "../controllers/likesController";

router.post("/blogs/likes/:id", likesController.likeBlog);

export default router;
