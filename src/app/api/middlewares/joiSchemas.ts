/* File: src/app/api/middlewares/joiSchemas.ts */
import Joi from 'joi';

export const memberSchema = Joi.array().items(
  Joi.object({
    player_name: Joi.string().required(),
    galactic_power: Joi.number().required(),
    ally_code: Joi.number().required(),
    guildId: Joi.string().required()
  })
);

export const guildSchema = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().required().uri(),
});