const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  message: Joi.string().min(6).required(),
});
const validatecomment = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    if (value) next();
  } catch (err) {
    res.send({ error: err.details[0].message });
  }
};
module.exports = validatecomment;
