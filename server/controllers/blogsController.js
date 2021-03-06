import Blog from "../models/blog";
import jwt from "jsonwebtoken";

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.send(blogs);
};

exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    res.send(blog || status(404));
  } catch {
    res.status(404);
    res.send({ status: 404, error: "Blog doesn't exist!" });
  }
};

exports.createBlog = (req, res) => {
  jwt.verify(req.token, "secretKey", (error) => {
    if (error) {
      res.status(401).send({ status: 401, message: "Unauthorized" });
    } else {
      const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
      });
      blog.save();
      res.status(201);
      res.send(blog);
    }
  });
};

exports.updateBlog = (req, res) => {
  jwt.verify(req.token, "secretKey", async (error) => {
    if (error) {
      res.status(401).send({ status: 401, message: "Unauthorized" });
    } else {
      try {
        const blog = await Blog.findOne({ _id: req.params.id });

        if (req.body.title) {
          blog.title = req.body.title;
        }

        if (req.body.content) {
          blog.content = req.body.content;
        }

        blog.save();
        res.send(blog);
      } catch {
        res.status(404);
        res.send({ status: 404, error: "blog doesn't exist!" });
      }
    }
  });
};

exports.deleteBlog = (req, res) => {
  jwt.verify(req.token, "secretKey", async (error) => {
    if (error) {
      res.status(401).send({ status: 401, message: "Unauthorized" });
    } else {
      try {
        await Blog.deleteOne({ _id: req.params.id });
        res.sendStatus(204);
      } catch {
        res.status(404);
        res.send({ status: 404, error: "blog doesn't exist!" });
      }
    }
  });
};
