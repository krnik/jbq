import Joi from 'joi';
import * as Yup from 'yup';
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
                name: 'type_only',
                ajv: {
                    type: DATA.TYPE,
                },
                jbq: {
                    [TYPE]: DATA.TYPE,
                },
                joi: Joi.boolean(),
                yup: Yup.boolean(),
            },
            {
                name: 'value',
                jbq: {
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
                name: 'type_only',
                ajv: {
                    type: DATA.TYPE,
                },
                jbq: {
                    [TYPE]: DATA.TYPE,
                },
                joi: Joi.boolean(),
                yup: Yup.boolean(),
            },
            {
                data: !DATA.VALUE,
                name: 'value',
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [VALUE]: DATA.VALUE,
                },
            },
        ],
    },
];
