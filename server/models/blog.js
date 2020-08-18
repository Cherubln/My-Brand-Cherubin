const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: String,
  content: String,
  comments: Array,
  likes: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("blog", schema);
