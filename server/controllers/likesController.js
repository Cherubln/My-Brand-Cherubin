import Blog from "../models/blog";

exports.likeBlog = async (req, res) => {
  try {
    await Blog.updateOne(
      { _id: req.params.id },
      {
        $inc: { likes: 1 },
      }
    );
    res.status(200).send({ status: 200, message: "like added" });
  } catch {
    res.status(404);
    res.send({ status: 404, error: "Blog doesn't exist!" });
  }
};
