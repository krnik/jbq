import Joi from 'joi';
import { TYPE, VALUE } from '../../../src/constants';

const DATA = {
  TYPE: 'boolean',
  VALUE: false,
};

export const booleanTests = [
  {
    name: 'boolean',
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
        joi: Joi.boolean(),
      },
      {
        type: 'value',
        vjs: {
          [TYPE]: DATA.TYPE,
          [VALUE]: DATA.VALUE,
        },
      },
    ],
  },
  {
    name: 'boolean_fail',
    data: NaN,
    fail: true,
    schemas: [
      {
        type: 'type_only',
        ajv: {
          type: DATA.TYPE,
        },
        vjs: {
          [TYPE]: DATA.TYPE,
        },
        joi: Joi.boolean(),
      },
    ],
  },
  {
    name: 'boolean_fail',
    data: !DATA.VALUE,
    fail: true,
    schemas: [
      {
        type: 'value',
        vjs: {
          [TYPE]: DATA.TYPE,
          [VALUE]: DATA.VALUE,
        },
      },
    ],
  },
];
