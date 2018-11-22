import Joi from 'joi';
import * as Yup from 'yup';
import { MAX, MIN, MULTIPLE_OF, ONE_OF, TYPE } from '../../../src/constants';

const DATA = {
    MIN: 10,
    MAX: 200,
    TYPE: 'number',
    VALUE: 100,
    ONE_OF: [1, 2, 4, 6, 8, 100],
    MULTIPLE_OF: 1,
};

export const numberTests = [
    {
        name: 'number',
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
                joi: Joi.number(),
                yup: Yup.number(),
            },
            {
                name: 'min',
                ajv: {
                    type: DATA.TYPE,
                    minimum: DATA.MIN,
                },
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [MIN]: DATA.MIN,
                },
                joi: Joi.number().min(DATA.MIN),
                yup: Yup.number().min(DATA.MIN),
            },
            {
                name: 'max',
                ajv: {
                    type: DATA.TYPE,
                    maximum: DATA.MAX,
                },
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [MAX]: DATA.MAX,
                },
                joi: Joi.number().max(DATA.MAX),
                yup: Yup.number().max(DATA.MAX),
            },
            {
                name: 'multipleOf',
                ajv: {
                    type: DATA.TYPE,
                    multipleOf: DATA.MULTIPLE_OF,
                },
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [MULTIPLE_OF]: DATA.MULTIPLE_OF,
                },
                joi: Joi.number().multiple(DATA.MULTIPLE_OF),
                yup: Yup.number().integer(),
            },
            {
                name: 'oneOf',
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [ONE_OF]: DATA.ONE_OF,
                },
            },
            {
                name: 'all',
                ajv: {
                    type: DATA.TYPE,
                    minimum: DATA.MIN,
                    maximum: DATA.MAX,
                    multipleOf: DATA.MULTIPLE_OF,
                },
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [MIN]: DATA.MIN,
                    [MAX]: DATA.MAX,
                    [MULTIPLE_OF]: DATA.MULTIPLE_OF,
                },
                joi: Joi.number().min(DATA.MIN).max(DATA.MAX).multiple(DATA.MULTIPLE_OF),
                yup: Yup.number().min(DATA.MIN).max(DATA.MAX).integer(),
            },
        ],
    },
    {
        name: 'number_fail',
        data: new Date(),
        fail: true,
        schemas: [
            {
                name: 'type_only',
                ajv: {
                    type: DATA.TYPE,
                },
                jbq: {
                    [TYPE]: DATA.TYPE,
                },
                joi: Joi.number(),
                yup: Yup.number(),
            },
            {
                data: DATA.VALUE / 20,
                name: 'min',
                ajv: {
                    type: DATA.TYPE,
                    minimum: DATA.MIN,
                },
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [MIN]: DATA.MIN,
                },
                joi: Joi.number().min(DATA.MIN),
                yup: Yup.number().min(DATA.MIN),
            },
            {
                data: DATA.VALUE * 10,
                name: 'max',
                ajv: {
                    type: DATA.TYPE,
                    maximum: DATA.MAX,
                },
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [MAX]: DATA.MAX,
                },
                joi: Joi.number().max(DATA.MAX),
                yup: Yup.number().max(DATA.MAX),
            },
            {
                data: 0.5,
                name: 'multipleOf',
                ajv: {
                    type: DATA.TYPE,
                    multipleOf: DATA.MULTIPLE_OF,
                },
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [MULTIPLE_OF]: DATA.MULTIPLE_OF,
                },
                joi: Joi.number().multiple(DATA.MULTIPLE_OF),
                yup: Yup.number().integer(),
            },
            {
                data: 0.5,
                name: 'oneOf',
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [ONE_OF]: DATA.ONE_OF,
                },
            },
        ],
    },
];
