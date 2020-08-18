const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const blogValidator = require("../middleware/blogValidator");
const blogsController = require("../controllers/blogsController");

router.get("/blogs", blogsController.getAllBlogs);

router.post("/blogs", verifyToken, blogValidator, blogsController.createBlog);

router.get("/blogs/:id", blogsController.getSingleBlog);

router.patch(
  "/blogs/:id",
  verifyToken,
  blogValidator,
  blogsController.updateBlog
);

router.delete("/blogs/:id", verifyToken, blogsController.deleteBlog);

module.exports = router;
