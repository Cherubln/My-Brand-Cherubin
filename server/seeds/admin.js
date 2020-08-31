import user from "../models/user";
require("dotenv").config();
const admin = {
  email: "admin@user.com",
  password: "password",
};
const account = new user(admin);
account.save();

export default account;
