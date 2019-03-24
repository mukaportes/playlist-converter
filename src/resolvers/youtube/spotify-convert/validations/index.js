import Joi from 'joi';

const inputSchema = Joi.object().keys({
  playlistUrl: Joi.string().required(),
}).required().options({ stripUnknown: true });

export default inputSchema;
