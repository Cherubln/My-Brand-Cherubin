const express = require("express");
const Query = require("../models/query");
const router = express.Router();
const queryValidator = require("../validators/query");

router.get("/queries", async (req, res) => {
  const queries = await Query.find();
  res.send(queries);
});

router.post("/queries", queryValidator, async (req, res) => {
  const query = new Query({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  await query.save();
  res.send(query);
});

router.get("/queries/:id", async (req, res) => {
  try {
    const query = await Query.findOne({ _id: req.params.id });
    res.send(query);
  } catch {
    res.status(404);
    res.send({ error: "Query doesn't exist!" });
  }
});

router.patch("/queries/:id", async (req, res) => {
  try {
    const query = await Query.findOne({ _id: req.params.id });

    if (req.body.name) {
      query.name = req.body.name;
    }

    if (req.body.email) {
      query.email = req.body.email;
    }

    if (req.body.message) {
      query.message = req.body.message;
    }

    await query.save();
    res.send(query);
  } catch {
    res.status(404);
    res.send({ error: "Query doesn't exist!" });
  }
});

router.delete("/queries/:id", async (req, res) => {
  try {
    await Query.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Query doesn't exist!" });
  }
});

module.exports = router;
