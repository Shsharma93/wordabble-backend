const Joi = require('@hapi/joi');

const validateUser = data => {
  const schema = Joi.object({
    username: Joi.string()
      .min(3)
      .max(50)
      .required(),
    password: Joi.string()
      .min(8)
      .max(32)
      .required()
  });
  return schema.validate(data);
};

module.exports = validateUser;
