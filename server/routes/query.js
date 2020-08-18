const express = require("express");
const Query = require("../models/query");
const router = express.Router();
const queryValidator = require("../middleware/queryValidator");
const verifyToken = require("../middleware/verifyToken");
const queriesController = require("../controllers/queriesController");

router.get("/queries", verifyToken, queriesController.getAllQueries);

router.get("/queries/:id", verifyToken, queriesController.getSingleQuery);

router.post("/queries", queryValidator, queriesController.createQuery);

router.delete("/queries/:id", verifyToken, queriesController.deleteQuery);

module.exports = router;
