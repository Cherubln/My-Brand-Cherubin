const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.send(blogs);
};

exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    res.send(blog);
  } catch {
    res.status(404);
    res.send({ error: "Blog doesn't exist!" });
  }
};

exports.createBlog = (req, res) => {
  jwt.verify(req.token, "secretKey", (error) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
      });
      blog.save();
      res.send(blog);
    }
  });
};

exports.updateBlog = (req, res) => {
  jwt.verify(req.token, "secretKey", async (error) => {
    if (error) {
      res.sendStatus(403);
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
        res.send({ error: "blog doesn't exist!" });
      }
    }
  });
};

exports.deleteBlog = (req, res) => {
  jwt.verify(req.token, "secretKey", (error) => {
    if (error) {
      res.sendStatus(403);
    } else {
      try {
        Blog.deleteOne({ _id: req.params.id });
        res.status(204).send();
      } catch {
        res.status(404);
        res.send({ error: "blog doesn't exist!" });
      }
    }
  });
};
