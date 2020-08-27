import Joi from "@hapi/joi";
//create JOI schema
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
const validateUser = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    if (value) next();
  } catch (err) {
    res.send({ error: err.details[0].message });
  }
};
export default validateUser;
