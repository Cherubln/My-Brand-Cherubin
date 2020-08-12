const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
});

module.exports = mongoose.model("query", schema);
