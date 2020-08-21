import mongoose from "mongoose";
const ObjectId = mongoose.Schema.ObjectId;

const user = new mongoose.Schema({
  id: ObjectId,
  email: String,
  password: String,
});

export default mongoose.model("user", user);
