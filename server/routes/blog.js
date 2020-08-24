import express from "express";
const router = express.Router();
import verifyToken from "../middleware/verifyToken";
import blogValidator from "../middleware/blogValidator";
import blogsController from "../controllers/blogsController";

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

export default router;
