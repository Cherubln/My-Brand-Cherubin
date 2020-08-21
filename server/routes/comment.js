import express from "express";
const router = express.Router();
import validateComment from "../middleware/commentValidator";
import commentController from "../controllers/commentController";

router.post(
  "/blogs/comments/:id",
  validateComment,
  commentController.addComment
);

export default router;
