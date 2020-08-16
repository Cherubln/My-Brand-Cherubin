const express = require("express");
const Query = require("../models/query");
const router = express.Router();
const queryValidator = require("../validators/query");
const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken");

router.get("/queries", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", async (error) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const queries = await Query.find();
      res.send(queries);
    }
  });
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

router.get("/queries/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", async (error) => {
    if (error) {
      res.sendStatus(403);
    } else {
      try {
        const query = await Query.findOne({ _id: req.params.id });
        res.send(query);
      } catch {
        res.status(404);
        res.send({ error: "Query doesn't exist!" });
      }
    }
  });
});

router.delete("/queries/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (error) => {
    if (error) {
      res.sendStatus(403);
    } else {
      try {
        Query.deleteOne({ _id: req.params.id });
        res.status(204).send();
      } catch {
        res.status(404);
        res.send({ error: "Query doesn't exist!" });
      }
    }
  });
});

module.exports = router;
