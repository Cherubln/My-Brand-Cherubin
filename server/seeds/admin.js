const user = require("../models/user");
require("dotenv").config();
const admin = {
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
};
const account = new user(admin);
account.save();

module.exports = account;
