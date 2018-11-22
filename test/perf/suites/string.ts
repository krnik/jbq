import Joi from 'joi';
import * as Yup from 'yup';
import { LEN, MAX_LEN, MIN_LEN, ONE_OF, REGEX, TYPE } from '../../../src/constants';

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
                name: 'type_only',
                ajv: {
                    type: DATA.TYPE,
                },
                jbq: {
                    [TYPE]: DATA.TYPE,
                },
                joi: Joi.string(),
                yup: Yup.string(),
            },
            {
                name: 'min_length',
                ajv: {
                    type: DATA.TYPE,
                    minLength: DATA.MIN,
                },
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [MIN_LEN]: DATA.MIN,
                },
                joi: Joi.string().min(DATA.MIN),
                yup: Yup.string().min(DATA.MIN),
            },
            {
                name: 'max_length',
                ajv: {
                    type: DATA.TYPE,
                    maxLength: DATA.MAX,
                },
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [MAX_LEN]: DATA.MAX,
                },
                joi: Joi.string().max(DATA.MAX),
                yup: Yup.string().min(DATA.MIN),
            },
            {
                name: 'regex/pattern',
                ajv: {
                    type: DATA.TYPE,
                    pattern: DATA.PATTERN,
                },
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [REGEX]: new RegExp(DATA.PATTERN),
                },
                joi: Joi.string().regex(new RegExp(DATA.PATTERN)),
                yup: Yup.string().matches(new RegExp(DATA.PATTERN)),
            },
            {
                name: 'all',
                ajv: {
                    type: DATA.TYPE,
                    minLength: DATA.MIN,
                    maxLength: DATA.MAX,
                    pattern: DATA.PATTERN,
                },
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [MIN_LEN]: DATA.MIN,
                    [MAX_LEN]: DATA.MAX,
                    [REGEX]: new RegExp(DATA.PATTERN),
                },
                joi: Joi.string().min(DATA.MIN).max(DATA.MAX).regex(new RegExp(DATA.PATTERN)),
                yup: Yup.string().min(DATA.MIN).max(DATA.MAX).matches(new RegExp(DATA.PATTERN)),
            },
            {
                name: 'len',
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [LEN]: DATA.VALUE.length,
                },
            },
            {
                name: 'oneOf',
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [ONE_OF]: ['', 'string', DATA.VALUE],
                },
            },
        ],
    },
    {
        name: 'string_fail',
        data: DATA.VALUE,
        fail: true,
        schemas: [
            {
                data: NaN,
                name: 'type_only',
                ajv: {
                    type: DATA.TYPE,
                },
                jbq: {
                    [TYPE]: DATA.TYPE,
                },
                joi: Joi.string(),
                yup: Yup.string(),
            },
            {
                name: 'min_length',
                ajv: {
                    type: DATA.TYPE,
                    minLength: DATA.MAX,
                },
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [MIN_LEN]: DATA.MAX,
                },
                joi: Joi.string().min(DATA.MAX),
                yup: Yup.string().min(DATA.MAX),
            },
            {
                name: 'max_length',
                ajv: {
                    type: DATA.TYPE,
                    maxLength: DATA.MIN,
                },
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [MAX_LEN]: DATA.MIN,
                },
                joi: Joi.string().max(DATA.MIN),
                yup: Yup.string().max(DATA.MIN),
            },
            {
                name: 'regex/pattern',
                ajv: {
                    type: DATA.TYPE,
                    pattern: DATA.FAIL_PATTERN,
                },
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [REGEX]: new RegExp(DATA.FAIL_PATTERN),
                },
                joi: Joi.string().regex(new RegExp(DATA.FAIL_PATTERN)),
                yup: Yup.string().matches(new RegExp(DATA.FAIL_PATTERN)),
            },
            {
                name: 'len',
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [LEN]: DATA.VALUE.length + 1,
                },
            },
            {
                name: 'oneOf',
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [ONE_OF]: ['', 'string'],
                },
            },
        ],
    },
];
