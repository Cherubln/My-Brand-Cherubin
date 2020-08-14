const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const user = new mongoose.Schema({
  id: ObjectId,
  email: String,
  password: String,
});

module.exports = mongoose.model("user", user);
