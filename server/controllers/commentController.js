import Blog from "../models/blog";

exports.addComment = async (req, res) => {
  try {
    await Blog.updateOne(
      { _id: req.params.id },
      {
        $push: { comments: { name: req.body.name, message: req.body.message } },
      }
    );
    res.status(200).send({ status: 200, message: "comment added" });
  } catch {
    res.status(404);
    res.send({ status: 404, error: "Blog doesn't exist!" });
  }
};
