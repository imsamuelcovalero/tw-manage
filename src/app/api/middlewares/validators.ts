/* File: src/app/api/middlewares/validators.ts */
import Joi from 'joi';
import CustomError from '../errors/CustomError';

import { memberSchema, guildSchema, allyCodesSchema, selectedUnitSchema, unitDataSchema, shipDataSchema } from './joiSchemas';

type SchemaName = 'memberSchema' | 'guildSchema' | 'allyCodesSchema' | 'selectedUnitSchema' | 'unitDataSchema' | 'shipDataSchema';

function validate(schema: Joi.ObjectSchema | Joi.ArraySchema, schemaName: SchemaName) {
  return (data: any) => {
    console.log(`validate ${schemaName}`, data);

    const { error } = schema.validate(data);

    if (error) {
      console.log('Validator Error', error.message);
      let [status, message] = error.message.split('|');

      if (!error.message.includes('|')) {
        status = '400';
        message = error.message;
      }

      const statusCode = isNaN(Number(status)) ? 400 : Number(status);
      throw new CustomError(statusCode, message);
    }
  };
}

const validators = {
  validateMembersData: validate(memberSchema, 'memberSchema'),
  validateGuildData: validate(guildSchema, 'guildSchema'),
  validateAllyCodesData: validate(allyCodesSchema, 'allyCodesSchema'),
  validateSelectedUnitsData: validate(selectedUnitSchema, 'selectedUnitSchema'),
  validateUnitsData: validate(unitDataSchema, 'unitDataSchema'),
  validateShipsData: validate(shipDataSchema, 'shipDataSchema')
};

export default validators;

