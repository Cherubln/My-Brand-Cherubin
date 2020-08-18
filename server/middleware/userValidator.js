const Joi = require("@hapi/joi");
//create JOI schema
const schema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(6).required(),
});
const validateUser = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    if (value) next();
  } catch (err) {
    res.send({ error: err.details[0].message });
  }
};
module.exports = validateUser;
