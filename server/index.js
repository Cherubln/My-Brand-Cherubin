const express = require("express");
const mongoose = require("mongoose");
const blog = require("./routes/blog");
const query = require("./routes/query");
const user = require("./routes/user");
const comment = require("./routes/comment");
const likeBlog = require("./routes/likes");
const bodyParser = require("body-parser");
const passport = require("./config/passport");
const session = require("express-session");
const app = express();
mongoose
  .connect("mongodb://localhost:27017/myBrand", {
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
module.exports = server;
