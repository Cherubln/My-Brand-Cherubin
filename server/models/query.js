const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

module.exports = mongoose.model("query", schema);
