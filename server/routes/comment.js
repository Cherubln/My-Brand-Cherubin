const express = require("express");
const router = express.Router();
const validateComment = require("../middleware/commentValidator");
const commentController = require("../controllers/commentController");

router.post(
  "/blogs/comments/:id",
  validateComment,
  commentController.addComment
);

module.exports = router;
