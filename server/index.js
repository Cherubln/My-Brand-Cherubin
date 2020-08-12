const express = require("express");
const mongoose = require("mongoose");
const blog = require("./controllers/blog");
const query = require("./controllers/query");
const bodyParser = require("body-parser");

mongoose
  .connect("mongodb://localhost:27017/myBrand", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const app = express();
    app.use(bodyParser.json());

    app.use("/", blog);
    app.use("/", query);
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server has started at ${port}`);
    });
  });
