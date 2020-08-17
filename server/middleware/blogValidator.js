const Joi = require("@hapi/joi");
//create JOI schema
const schema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  content: Joi.string().min(50).required(),
});
const validateBlog = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    if (value) next();
  } catch (err) {
    res.send({ error: err.details[0].message });
  }
};
module.exports = validateBlog;
