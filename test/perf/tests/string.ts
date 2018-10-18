import Joi from 'joi';
import { LEN, MAX_LEN, MIN_LEN, REGEX, TYPE } from '../../../src/constants';

const DATA = {
  MIN: 10,
  MAX: 40,
  TYPE: 'string',
  VALUE: 'test string'.repeat(2),
  PATTERN: 'test',
  FAIL_PATTERN: '\\d',
};

export const stringTests = [
  {
    name: 'string',
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
        joi: Joi.string(),
      },
      {
        type: 'min_length',
        ajv: {
          type: DATA.TYPE,
          minLength: DATA.MIN,
        },
        vjs: {
          [TYPE]: DATA.TYPE,
          [MIN_LEN]: DATA.MIN,
        },
        joi: Joi.string().min(DATA.MIN),
      },
      {
        type: 'max_length',
        ajv: {
          type: DATA.TYPE,
          maxLength: DATA.MAX,
        },
        vjs: {
          [TYPE]: DATA.TYPE,
          [MAX_LEN]: DATA.MAX,
        },
        joi: Joi.string().max(DATA.MAX),
      },
      {
        type: 'regex/pattern',
        ajv: {
          type: DATA.TYPE,
          pattern: DATA.PATTERN,
        },
        vjs: {
          [TYPE]: DATA.TYPE,
          [REGEX]: new RegExp(DATA.PATTERN),
        },
        joi: Joi.string().regex(new RegExp(DATA.PATTERN)),
      },
      {
        type: 'all',
        ajv: {
          type: DATA.TYPE,
          minLength: DATA.MIN,
          maxLength: DATA.MAX,
          pattern: DATA.PATTERN,
        },
        vjs: {
          [TYPE]: DATA.TYPE,
          [MIN_LEN]: DATA.MIN,
          [MAX_LEN]: DATA.MAX,
          [REGEX]: new RegExp(DATA.PATTERN),
        },
        joi: Joi.string().min(DATA.MIN).max(DATA.MAX).regex(new RegExp(DATA.PATTERN)),
      },
      {
        type: 'len',
        vjs: {
          [TYPE]: 'string',
          [LEN]: DATA.VALUE.length,
        },
      },
    ],
  },
  {
    name: 'string_fail',
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
        joi: Joi.string(),
      },
    ],
  },
  {
    name: 'string_fail',
    data: DATA.VALUE.slice(5),
    fail: true,
    schemas: [
      {
        type: 'min_length',
        ajv: {
          type: DATA.TYPE,
          minLength: DATA.MAX,
        },
        vjs: {
          [TYPE]: DATA.TYPE,
          [MIN_LEN]: DATA.MAX,
        },
        joi: Joi.string().min(DATA.MAX),
      },
      {
        type: 'max_length',
        ajv: {
          type: DATA.TYPE,
          maxLength: DATA.MAX / 10,
        },
        vjs: {
          [TYPE]: DATA.TYPE,
          [MAX_LEN]: DATA.MAX / 10,
        },
        joi: Joi.string().max(DATA.MAX / 10),
      },
      {
        type: 'regex/pattern',
        ajv: {
          type: DATA.TYPE,
          pattern: DATA.FAIL_PATTERN,
        },
        vjs: {
          [TYPE]: DATA.TYPE,
          [REGEX]: new RegExp(DATA.FAIL_PATTERN),
        },
        joi: Joi.string().regex(new RegExp(DATA.FAIL_PATTERN)),
      },
      {
        type: 'len',
        vjs: {
          [TYPE]: 'string',
          [LEN]: DATA.VALUE.length,
        },
      },
    ],
  },
];
