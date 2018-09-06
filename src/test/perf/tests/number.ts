import Joi from 'joi';
import { MAX, MIN, TYPE } from '../../../constants';

const DATA = {
  MIN: 10,
  MAX: 200,
  TYPE: 'number',
  VALUE: 100,
};

export const numberTests = {
  name: 'number',
  data: DATA.VALUE,
  schemas: [
    {
      type: 'type_only',
      ajv: {
        type: DATA.TYPE,
      },
      vjs: {
        [TYPE]: DATA.TYPE,
      },
      joi: Joi.number(),
    },
    {
      type: 'min',
      ajv: {
        type: DATA.TYPE,
        minimum: DATA.MIN,
      },
      vjs: {
        [TYPE]: DATA.TYPE,
        [MIN]: DATA.MIN,
      },
      joi: Joi.number().min(DATA.MIN),
    },
    {
      type: 'max',
      ajv: {
        type: DATA.TYPE,
        maximum: DATA.MAX,
      },
      vjs: {
        [TYPE]: DATA.TYPE,
        [MAX]: DATA.MAX,
      },
      joi: Joi.number().max(DATA.MAX),
    },
    {
      type: 'all',
      ajv: {
        type: DATA.TYPE,
        minimum: DATA.MIN,
        maximum: DATA.MAX,
      },
      vjs: {
        [TYPE]: DATA.TYPE,
        [MIN]: DATA.MIN,
        [MAX]: DATA.MAX,
      },
      joi: Joi.number().min(DATA.MIN).max(DATA.MAX),
    },
  ],
};
