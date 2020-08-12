const query = require("../models/query");

const queryValidator = async (req, res, next) => {
  try {
    await query.validateAsync(req.body);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }

  next();
};

module.exports = queryValidator;
