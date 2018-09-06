import Joi from 'joi';
import { TYPE, MIN_LEN, MAX_LEN, LEN, SYM_SCHEMA_COLLECTION, INCLUDES } from '../../../constants';

const DATA = {
  MIN: 1,
  MAX: 10,
  TYPE: 'array',
  VALUE: [1, 2, 3, 4, 5],
};

export const arrayTests = [
  {
    name: 'array',
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
        joi: Joi.array(),
      },
      {
        type: 'min_length',
        ajv: {
          type: DATA.TYPE,
          minItems: DATA.MIN,
        },
        vjs: {
          [TYPE]: DATA.TYPE,
          [MIN_LEN]: DATA.MIN,
        },
        joi: Joi.array().min(DATA.MIN),
      },
      {
        type: 'max_length',
        ajv: {
          type: DATA.TYPE,
          maxItems: DATA.MAX,
        },
        vjs: {
          [TYPE]: DATA.TYPE,
          [MAX_LEN]: DATA.MAX,
        },
        joi: Joi.array().max(DATA.MAX),
      },
      {
        type: 'items/elements',
        ajv: {
          type: DATA.TYPE,
          items: {
            type: 'number',
          },
        },
        vjs: {
          [TYPE]: DATA.TYPE,
          [SYM_SCHEMA_COLLECTION]: {
            [TYPE]: 'number',
          },
        },
        joi: Joi.array().items(Joi.number()),
      },
      {
        type: 'all',
        ajv: {
          type: DATA.TYPE,
          minItems: DATA.MIN,
          maxItems: DATA.MAX,
          items: {
            type: 'number',
          },
        },
        vjs: {
          [TYPE]: DATA.TYPE,
          [MIN_LEN]: DATA.MIN,
          [MAX_LEN]: DATA.MAX,
          [SYM_SCHEMA_COLLECTION]: {
            [TYPE]: 'number',
          },
        },
        joi: Joi.array().min(DATA.MIN).max(DATA.MAX).items(Joi.number()),
      },
      {
        type: 'contains',
        ajv: {
          type: DATA.TYPE,
          contains: {
            type: 'number',
          },
        },
      },
      {
        type: 'includes',
        vjs: {
          [TYPE]: DATA.TYPE,
          [INCLUDES]: 1,
        },
      },
      {
        type: 'length',
        vjs: {
          [TYPE]: DATA.TYPE,
          [LEN]: DATA.VALUE.length,
        },
        joi: Joi.array().length(DATA.VALUE.length),
      },
    ],
  },
];
