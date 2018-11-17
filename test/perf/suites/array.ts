import Joi from 'joi';
import * as Yup from 'yup';
import { EVERY, INCLUDES, LEN, MAX_LEN, MIN_LEN, SOME, SYM_SCHEMA_COLLECTION, SYM_SCHEMA_PROPERTIES, TYPE } from '../../../src/constants';

const DATA = {
    MIN: 1,
    MAX: 10,
    TYPE: 'array',
    VALUE: [1, 2, 3, 4, 5],
    OBJ_VALUE: [
        {
            firstName: 'John',
            lastName: 'Doe',
            email: 'jdoe@mail.com',
            age: 45,
            height: 190,
        },
        {
            firstName: 'Emma',
            lastName: 'Doe',
            email: 'emd@yahoo.com',
            age: 32,
            height: 172,
        },
        {
            firstName: 'Cat',
            lastName: 'Whiskars',
            email: 'imacat@gmail.com',
            age: 4,
            height: 20,
        },
        {
            firstName: 'Daryl',
            lastName: 'Borg',
            email: 'DarylMBorg@teleworm.us',
            age: 68,
            height: 163,
        },
        {
            firstName: 'Carl',
            lastName: 'Sawyer',
            email: 'CarlKAndrews@rhyta.com',
            age: 39,
            height: 181,
        },
    ],
};

export const arrayTests = [
    {
        name: 'array',
        data: DATA.VALUE,
        schemas: [
            {
                name: 'type_only',
                ajv: {
                    type: DATA.TYPE,
                },
                vjs: {
                    [TYPE]: DATA.TYPE,
                },
                joi: Joi.array(),
                yup: Yup.array(),
            },
            {
                name: 'min_length',
                ajv: {
                    type: DATA.TYPE,
                    minItems: DATA.MIN,
                },
                vjs: {
                    [TYPE]: DATA.TYPE,
                    [MIN_LEN]: DATA.MIN,
                },
                joi: Joi.array().min(DATA.MIN),
                yup: Yup.array().min(DATA.MIN),
            },
            {
                name: 'max_length',
                ajv: {
                    type: DATA.TYPE,
                    maxItems: DATA.MAX,
                },
                vjs: {
                    [TYPE]: DATA.TYPE,
                    [MAX_LEN]: DATA.MAX,
                },
                joi: Joi.array().max(DATA.MAX),
                yup: Yup.array().max(DATA.MAX),
            },
            {
                name: 'items/elements',
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
                yup: Yup.array().of(Yup.number()),
            },
            {
                name: 'all',
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
                yup: Yup.array().min(DATA.MIN).max(DATA.MAX).isType(Yup.number()),
            },
            {
                name: 'contains',
                ajv: {
                    type: DATA.TYPE,
                    contains: {
                        type: 'number',
                    },
                },
            },
            {
                name: 'includes',
                vjs: {
                    [TYPE]: DATA.TYPE,
                    [INCLUDES]: 1,
                },
            },
            {
                name: 'length',
                vjs: {
                    [TYPE]: DATA.TYPE,
                    [LEN]: DATA.VALUE.length,
                },
                joi: Joi.array().length(DATA.VALUE.length),
            },
            {
                name: 'every',
                vjs: {
                    [TYPE]: DATA.TYPE,
                    [EVERY]: (e: any) => typeof e === 'number',
                },
            },
            {
                name: 'some',
                vjs: {
                    [TYPE]: DATA.TYPE,
                    [SOME]: (e: any) => typeof e === 'number',
                },
            },
        ],
    },
    {
        name: 'array_fail',
        fail: true,
        data: new Array(DATA.MAX).fill('0'),
        schemas: [
            {
                data: NaN,
                name: 'type_only',
                ajv: {
                    type: DATA.TYPE,
                },
                vjs: {
                    [TYPE]: DATA.TYPE,
                },
                joi: Joi.array(),
                yup: Yup.array(),
            },
            {
                name: 'min_length',
                ajv: {
                    type: DATA.TYPE,
                    minItems: DATA.MAX << 2,
                },
                vjs: {
                    [TYPE]: DATA.TYPE,
                    [MIN_LEN]: DATA.MAX << 2,
                },
                joi: Joi.array().min(DATA.MAX << 2),
                yup: Yup.array().min(DATA.MAX << 2),
            },
            {
                name: 'max_length',
                ajv: {
                    type: DATA.TYPE,
                    maxItems: DATA.MIN,
                },
                vjs: {
                    [TYPE]: DATA.TYPE,
                    [MAX_LEN]: DATA.MIN,
                },
                joi: Joi.array().max(DATA.MIN),
                yup: Yup.array().max(DATA.MIN),
            },
            {
                name: 'items/elements',
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
                yup: Yup.array().of(Yup.number()),
            },
            {
                name: 'contains',
                ajv: {
                    type: DATA.TYPE,
                    contains: {
                        type: 'number',
                    },
                },
            },
            {
                name: 'includes',
                vjs: {
                    [TYPE]: DATA.TYPE,
                    [INCLUDES]: 1,
                },
            },
            {
                name: 'length',
                vjs: {
                    [TYPE]: DATA.TYPE,
                    [LEN]: DATA.MIN,
                },
                joi: Joi.array().length(DATA.MIN),
            },
            {
                name: 'every',
                vjs: {
                    [TYPE]: DATA.TYPE,
                    [EVERY]: (e: any) => typeof e === 'number',
                },
            },
            {
                name: 'some',
                vjs: {
                    [TYPE]: DATA.TYPE,
                    [SOME]: (e: any) => typeof e === 'number',
                },
            },
        ],
    },
    {
        name: 'array_of_objects',
        data: DATA.OBJ_VALUE,
        schemas: [
            {
                name: 'types_only',
                ajv: {
                    type: DATA.TYPE,
                    items: {
                        type: 'object',
                        properties: {
                            firstName: { type: 'string' },
                            lastName: { type: 'string' },
                            email: { type: 'string' },
                            age: { type: 'number' },
                            height: { type: 'number' },
                        },
                    },
                },
                vjs: {
                    [TYPE]: DATA.TYPE,
                    [SYM_SCHEMA_COLLECTION]: {
                        [TYPE]: 'object',
                        [SYM_SCHEMA_PROPERTIES]: {
                            firstName: { [TYPE]: 'string' },
                            lastName: { [TYPE]: 'string' },
                            email: { [TYPE]: 'string' },
                            age: { [TYPE]: 'number' },
                            height: { [TYPE]: 'number' },
                        },
                    },
                },
                joi: Joi.array().items(Joi.object().keys({
                    firstName: Joi.string(),
                    lastName: Joi.string(),
                    email: Joi.string(),
                    age: Joi.number(),
                    height: Joi.number(),
                })),
                yup: Yup.array().of(Yup.object().shape({
                    firstName: Yup.string(),
                    lastName: Yup.string(),
                    email: Yup.string(),
                    age: Yup.number(),
                    height: Yup.number(),
                })),
            },
        ],
    },
    {
        name: 'array_of_objects_fail',
        data: DATA.OBJ_VALUE,
        fail: true,
        schemas: [
            {
                name: 'types_only',
                ajv: {
                    type: DATA.TYPE,
                    items: {
                        type: 'object',
                        properties: {
                            firstName: { type: 'string' },
                            lastName: { type: 'string' },
                            email: { type: 'string' },
                            age: { type: 'number' },
                            height: { type: 'string' },
                        },
                    },
                },
                vjs: {
                    [TYPE]: DATA.TYPE,
                    [SYM_SCHEMA_COLLECTION]: {
                        [TYPE]: 'object',
                        [SYM_SCHEMA_PROPERTIES]: {
                            firstName: { [TYPE]: 'string' },
                            lastName: { [TYPE]: 'string' },
                            email: { [TYPE]: 'string' },
                            age: { [TYPE]: 'number' },
                            height: { [TYPE]: 'string' },
                        },
                    },
                },
                joi: Joi.array().items(Joi.object().keys({
                    firstName: Joi.string(),
                    lastName: Joi.string(),
                    email: Joi.string(),
                    age: Joi.number(),
                    height: Joi.string(),
                })),
                yup: Yup.array().of(Yup.object().shape({
                    firstName: Yup.string(),
                    lastName: Yup.string(),
                    email: Yup.string(),
                    age: Yup.number(),
                    height: Yup.string(),
                })),
            },
        ],
    },
];
