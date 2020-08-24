import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

export default mongoose.model("query", schema);
