import Joi from 'joi';
import { SYM_SCHEMA_COLLECTION, SYM_SCHEMA_PROPERTIES, TYPE } from '../../../constants';

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
};

export const objectTests = [
  {
    name: 'object',
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
        joi: Joi.object(),
      },
      {
        type: 'properties',
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
        vjs: {
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
      },
    ],
  },
  {
    name: 'object_properties',
    data: { ...DATA.VALUE, moves: [] },
    fail: true,
    schemas: [
      {
        type: 'additional_property',
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
        vjs: {
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
      },
    ],
  },
];
