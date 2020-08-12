// const query = require("../models/query");

// const queryValidator = async (req, res, next) => {
//   try {
//     await query.validateAsync(req.body);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ error });
//   }

//   next();
// };

// module.exports = queryValidator;

const Joi = require("@hapi/joi");
//create JOI schema
const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  message: Joi.string().min(3).required(),
});
const validateQuery = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    if (value) next();
  } catch (err) {
    res.send({ error: err.details[0].message });
  }
};
module.exports = validateQuery;
