const Joi = require('@hapi/joi');

const validateGame = data => {
  const schema = Joi.object({
    user: Joi.string(),
    game: Joi.object().required()
  });
  return schema.validate(data);
};

module.exports = validateGame;
