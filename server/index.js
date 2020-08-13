const express = require("express");
const mongoose = require("mongoose");
const blog = require("./controllers/blog");
const query = require("./controllers/query");
const user = require("./controllers/user");
const bodyParser = require("body-parser");
const passport = require("./config/passport");
const session = require("express-session");

mongoose
  .connect("mongodb://localhost:27017/myBrand", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    require("./seeds/admin");
    const app = express();
    app.use(bodyParser.json());
    app.use(
      session({ secret: "secret", resave: true, saveUninitialized: true })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use("/", blog);
    app.use("/", query);
    app.use("/", user);
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server has started at ${port}`);
    });
  });
