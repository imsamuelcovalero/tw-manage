/* File: src/app/api/middlewares/joiSchemas.ts */
import Joi from 'joi';

const REQUIRED_FIELD = '400|The field is required';
const INVALID_VALUE = '400|Invalid value provided';
const INVALID_URL = '400|Invalid URL format';
const INVALID_UNIT_TYPE = '400|The unit type is either UNIT or SHIP';

export const memberSchema = Joi.array().items(
  Joi.object({
    player_name: Joi.string().required().messages({
      'string.empty': REQUIRED_FIELD,
      'any.required': REQUIRED_FIELD
    }),
    galactic_power: Joi.number().required().messages({
      'number.base': INVALID_VALUE,
      'any.required': REQUIRED_FIELD
    }),
    ally_code: Joi.number().required().messages({
      'number.base': INVALID_VALUE,
      'any.required': REQUIRED_FIELD
    }),
    guildId: Joi.string().required().messages({
      'string.empty': REQUIRED_FIELD,
      'any.required': REQUIRED_FIELD
    })
  })
);

export const allyCodesSchema = Joi.array().items(
  Joi.number().required().messages({
    'number.base': INVALID_VALUE,
    'any.required': REQUIRED_FIELD
  })
).min(1);

export const guildSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': REQUIRED_FIELD,
    'any.required': REQUIRED_FIELD
  }),
  url: Joi.string().required().uri().messages({
    'string.empty': REQUIRED_FIELD,
    'string.uri': INVALID_URL,
    'any.required': REQUIRED_FIELD
  })
});

export const selectedUnitSchema = Joi.array().items(
  Joi.object({
    id: Joi.number().optional().messages({
      'number.base': INVALID_VALUE
    }),
    base_id: Joi.string().required().messages({
      'string.empty': REQUIRED_FIELD,
      'any.required': REQUIRED_FIELD
    }),
    name: Joi.string().required().messages({
      'string.empty': REQUIRED_FIELD,
      'any.required': REQUIRED_FIELD
    }),
    type: Joi.string().valid('UNIT', 'SHIP').required().messages({
      'string.empty': REQUIRED_FIELD,
      'string.valid': INVALID_UNIT_TYPE,
      'any.required': REQUIRED_FIELD
    }),
    omicron1Id: Joi.string().allow(null).optional().messages({
      'string.empty': REQUIRED_FIELD
    }),
    omicron2Id: Joi.string().allow(null).optional().messages({
      'string.empty': REQUIRED_FIELD
    }),
    omicron3Id: Joi.string().allow(null).optional().messages({
      'string.empty': REQUIRED_FIELD
    })
  })
);

/* 
  Aqui começam os schemas de unidade e navio.
*/
const omicronAbilitySchema = Joi.object({
  id: Joi.number().optional().messages({
    'number.base': INVALID_VALUE
  }),
  omicronId: Joi.string().required().messages({
    'string.empty': REQUIRED_FIELD,
    'any.required': REQUIRED_FIELD
  }),
  players: Joi.array().items(Joi.string()).required().messages({
    'array.base': INVALID_VALUE,
    'any.required': REQUIRED_FIELD
  })
});

const gameEntitySchema = Joi.object({
  id: Joi.number().optional().messages({
    'number.base': INVALID_VALUE
  }),
  base_id: Joi.string().required().messages({
    'string.empty': REQUIRED_FIELD,
    'any.required': REQUIRED_FIELD
  }),
  name: Joi.string().required().messages({
    'string.empty': REQUIRED_FIELD,
    'any.required': REQUIRED_FIELD
  }),
  quantity: Joi.number().required().messages({
    'number.base': INVALID_VALUE,
    'any.required': REQUIRED_FIELD
  })
});

export const unitDataSchema = Joi.array().items(
  gameEntitySchema.keys({
    omicron_count_1: Joi.number().required().messages({
      'number.base': INVALID_VALUE,
      'any.required': REQUIRED_FIELD
    }),
    omicron_count_2: Joi.number().required().messages({
      'number.base': INVALID_VALUE,
      'any.required': REQUIRED_FIELD
    }),
    omicron_count_3: Joi.number().required().messages({
      'number.base': INVALID_VALUE,
      'any.required': REQUIRED_FIELD
    }),
    omicronAbilities: Joi.array().items(omicronAbilitySchema).optional()
  })
);

export const shipDataSchema = Joi.array().items(gameEntitySchema);