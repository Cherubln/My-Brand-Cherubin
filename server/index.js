const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");

mongoose
  .connect("mongodb://localhost:27017/myBrand", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const app = express();
    app.use(bodyParser.json());

    app.use("/", routes);
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server has started at ${port}`);
    });
  });
