import mongoose from "mongoose";

const schema = mongoose.Schema({
  title: String,
  content: String,
  comments: Array,
  likes: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("blog", schema);
