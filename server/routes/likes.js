const express = require("express");
const router = express.Router();

const likesController = require("../controllers/likesController");

router.post("/blogs/likes/:id", likesController.likeBlog);

module.exports = router;
