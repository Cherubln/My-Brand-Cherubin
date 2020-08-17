const Query = require("../models/query");
const jwt = require("jsonwebtoken");

exports.getAllQueries = (req, res) => {
  jwt.verify(req.token, "secretKey", async (error) => {
    if (error) {
      res.sendStatus(403);
    } else {
      const queries = await Query.find();
      res.send(queries);
    }
  });
};

exports.getSingleQuery = (req, res) => {
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
};

exports.createQuery = async (req, res) => {
  const query = new Query({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  await query.save();
  res.send(query);
};

exports.deleteQuery = (req, res) => {
  jwt.verify(req.token, "secretKey", async (error) => {
    if (error) {
      res.sendStatus(403);
    } else {
      try {
        await Query.deleteOne({ _id: req.params.id });
        res.json({ message: "Query deleted" });
      } catch {
        res.status(404);
        res.send({ error: "Query doesn't exist!" });
      }
    }
  });
};
