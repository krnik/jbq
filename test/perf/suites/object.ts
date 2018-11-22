import Joi from 'joi';
import * as Yup from 'yup';
import { MAX_KEY_COUNT, MAX_PROP_COUNT, MIN_KEY_COUNT, MIN_PROP_COUNT, SYM_SCHEMA_COLLECTION, SYM_SCHEMA_PROPERTIES, TYPE } from '../../../src/constants';

const DATA = {
    TYPE: 'object',
    VALUE: {
        id: 1,
        name: 'Bulbasaur',
        weight: 69,
        height: 7,
        types: [
            { name: 'grass' },
            { name: 'poison' },
        ],
    },
    MIN_PROP: 4,
    MAX_PROP: 5,
};

export const objectTests = [
    {
        name: 'object',
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
                joi: Joi.object(),
                yup: Yup.object(),
            },
            {
                name: 'properties',
                ajv: {
                    type: DATA.TYPE,
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        weight: { type: 'number' },
                        height: { type: 'number' },
                        types: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                },
                            },
                        },
                    },
                },
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [SYM_SCHEMA_PROPERTIES]: {
                        id: { [TYPE]: 'number' },
                        name: { [TYPE]: 'string' },
                        weight: { [TYPE]: 'number' },
                        height: { [TYPE]: 'number' },
                        types: {
                            [TYPE]: 'array',
                            [SYM_SCHEMA_COLLECTION]: {
                                [TYPE]: 'object',
                                [SYM_SCHEMA_PROPERTIES]: {
                                    name: { [TYPE]: 'string' },
                                },
                            },
                        },
                    },
                },
                joi: Joi.object().keys({
                    id: Joi.number(),
                    name: Joi.string(),
                    weight: Joi.number(),
                    height: Joi.number(),
                    types: Joi.array().items(Joi.object().keys({
                        name: Joi.string(),
                    })),
                }),
                yup: Yup.object().shape({
                    id: Yup.number(),
                    name: Yup.string(),
                    weight: Yup.number(),
                    height: Yup.number(),
                    types: Yup.array().of(Yup.object().shape({
                        name: Yup.string(),
                    })),
                }),
            },
            {
                name: 'minKeyCount',
                ajv: {
                    type: DATA.TYPE,
                    minProperties: DATA.MIN_PROP,
                },
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [MIN_KEY_COUNT]: DATA.MIN_PROP,
                },
            },
            {
                name: 'maxKeyCount',
                ajv: {
                    type: DATA.TYPE,
                    maxProperties: DATA.MAX_PROP,
                },
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [MAX_KEY_COUNT]: DATA.MAX_PROP,
                },
            },
            {
                name: 'minPropCount',
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [MIN_PROP_COUNT]: DATA.MIN_PROP,
                },
            },
            {
                name: 'maxPropCount',
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [MAX_PROP_COUNT]: DATA.MAX_PROP,
                },
            },
        ],
    },
    {
        name: 'object_fail',
        data: { ...DATA.VALUE, moves: [] },
        fail: true,
        schemas: [
            {
                name: 'additional_property',
                ajv: {
                    type: DATA.TYPE,
                    properties: {
                        id: { type: 'number' },
                        name: { type: 'string' },
                        weight: { type: 'number' },
                        height: { type: 'number' },
                        types: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: { type: 'number' },
                                },
                            },
                        },
                    },
                },
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [SYM_SCHEMA_PROPERTIES]: {
                        id: { [TYPE]: 'number' },
                        name: { [TYPE]: 'string' },
                        weight: { [TYPE]: 'number' },
                        height: { [TYPE]: 'number' },
                        types: {
                            [TYPE]: 'array',
                            [SYM_SCHEMA_COLLECTION]: {
                                [TYPE]: 'object',
                                [SYM_SCHEMA_PROPERTIES]: {
                                    name: { [TYPE]: 'number' },
                                },
                            },
                        },
                    },
                },
                joi: Joi.object().keys({
                    id: Joi.number(),
                    name: Joi.string(),
                    weight: Joi.number(),
                    height: Joi.number(),
                    types: Joi.array().items(Joi.object().keys({
                        name: Joi.number(),
                    })),
                }),
                yup: Yup.object().shape({
                    id: Yup.number(),
                    name: Yup.string(),
                    weight: Yup.number(),
                    height: Yup.number(),
                    types: Yup.array().of(Yup.object().shape({
                        name: Yup.string(),
                    })),
                }),
            },
            {
                name: 'minKeyCount',
                ajv: {
                    type: DATA.TYPE,
                    minProperties: DATA.MAX_PROP << 2,
                },
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [MIN_KEY_COUNT]: DATA.MAX_PROP << 2,
                },
            },
            {
                name: 'maxKeyCount',
                ajv: {
                    type: DATA.TYPE,
                    maxProperties: DATA.MIN_PROP,
                },
                jbq: {
                    type: DATA.TYPE,
                    [MAX_KEY_COUNT]: DATA.MIN_PROP,
                },
            },
            {
                data: {
                    [Symbol('0')]: 0,
                },
                name: 'minPropCount',
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [MIN_PROP_COUNT]: 2,
                },
            },
            {
                data: {
                    [Symbol('0')]: 0,
                    [Symbol('1')]: 1,
                },
                name: 'maxPropCount',
                jbq: {
                    [TYPE]: DATA.TYPE,
                    [MAX_PROP_COUNT]: 1,
                },
            },
        ],
    },
];
