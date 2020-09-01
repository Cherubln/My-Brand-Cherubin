import Query from "../models/query";
import jwt from "jsonwebtoken";

exports.getAllQueries = (req, res) => {
  jwt.verify(req.token, "secretKey", async (error) => {
    if (error) {
      res.status(401).send({ status: 401, message: "Unauthorized" });
    } else {
      const queries = await Query.find();
      res.send(queries);
    }
  });
};

exports.getSingleQuery = (req, res) => {
  jwt.verify(req.token, "secretKey", async (error) => {
    if (error) {
      res.status(401).send({ status: 401, message: "Unauthorized" });
    } else {
      try {
        const query = await Query.findOne({ _id: req.params.id });
        res.send(query || status(404));
      } catch {
        res.status(404);
        res.send({ status: 404, error: "Query doesn't exist!" });
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
  res.status(201);
  res.send(query);
};

exports.deleteQuery = (req, res) => {
  jwt.verify(req.token, "secretKey", async (error) => {
    if (error) {
      res.status(401).send({ status: 401, message: "Unauthorized" });
    } else {
      try {
        await Query.deleteOne({ _id: req.params.id });
        res.sendStatus(204);
      } catch {
        res.status(404);
        res.send({ status: 404, error: "Query doesn't exist!" });
      }
    }
  });
};
