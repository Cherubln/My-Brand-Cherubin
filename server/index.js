import express from "express";
import mongoose from "mongoose";
import blog from "./routes/blog";
import query from "./routes/query";
import user from "./routes/user";
import comment from "./routes/comment";
import likeBlog from "./routes/likes";
import bodyParser from "body-parser";
import passport from "./config/passport";
import session from "express-session";
const app = express();
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/myBrand", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    require("./seeds/admin");

    app.use(bodyParser.json());
    app.use(
      session({ secret: "secret", resave: true, saveUninitialized: true })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use("/", blog);
    app.use("/", query);
    app.use("/", user);
    app.use("/", comment);
    app.use("/", likeBlog);
  })
  .catch((error) => {
    console.log(error);
  });
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server has started at ${port}`);
});
export default server;
