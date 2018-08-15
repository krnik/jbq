import ajv from 'ajv';
import Benchmark from 'benchmark';
import { VJS } from '../../core/VJS';
import { createTypes } from '../../types/index';
import { createData, schemas } from '../data/index';

/**
 * AJV SCHEMAS
 */
const ajvschemas: { [k: string]: any } = {
    String: {
        type: 'string',
        minLength: 2,
        maxLength: 64,
        pattern: '@',
    },
    Boolean: {
        type: 'boolean',
    },
    Number: {
        type: 'number',
        minimum: 18,
        maximum: 120,
    },
    Object: {
        type: 'object',
        properties: {
            0: {},
        },
    },
    Array: {
        type: 'array',
        minItems: 4,
        maxItems: 16,
        contains: { type: 'number' },
    },
    Symbols: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                string: {
                    type: 'string',
                    minLength: 2,
                    maxLength: 64,
                    pattern: '@',
                },
                number: {
                    type: 'number',
                    minimum: 18,
                    maximum: 120,
                },
                boolean: { type: 'boolean' },
                array: {
                    type: 'array',
                    minItems: 4,
                    maxItems: 16,
                    contains: { type: 'number' },
                },
            },
        },
    },
};

const data = createData(schemas);
const createTest = {
    vjs (schemaName: string) {
        const validator = new VJS(createTypes(), schemas.valid, {});
        return validator[schemaName].validSync.bind(undefined, data[schemaName]);
    },
    invalidvjs (schemaName: string) {
        const validator = new VJS(createTypes(), schemas.valid, {});
        const invalidKey = Object.keys(data).find((e) => e !== schemaName) as string;
        return validator[schemaName].validSync.bind(undefined, data[invalidKey]);
    },
    ajv (schemaName: string) {
        const AJV = new ajv().compile(ajvschemas[schemaName]);
        return AJV.bind(undefined, data[schemaName]);
    },
    invalidajv (schemaName: string) {
        const AJV = new ajv().compile(ajvschemas[schemaName]);
        const invalidKey = Object.keys(data).find((e) => e !== schemaName) as string;
        return AJV.bind(undefined, data[invalidKey]);
    },
};

new Benchmark.Suite()
    .add('vjs#String', createTest.vjs('String'))
    .add('ajv#String', createTest.ajv('String'))
    .add('vjs#invalid#String', createTest.vjs('String'))
    .add('ajv#invalid#String', createTest.ajv('String'))
    .add('vjs#Number', createTest.vjs('Number'))
    .add('ajv#Number', createTest.ajv('Number'))
    .add('vjs#invalid#Number', createTest.vjs('Number'))
    .add('ajv#invalid#Number', createTest.ajv('Number'))
    .add('vjs#Boolean', createTest.vjs('Boolean'))
    .add('ajv#Boolean', createTest.ajv('Boolean'))
    .add('vjs#invalid#Boolean', createTest.vjs('Boolean'))
    .add('ajv#invalid#Boolean', createTest.ajv('Boolean'))
    .add('vjs#Object', createTest.vjs('Object'))
    .add('ajv#Object', createTest.ajv('Object'))
    .add('vjs#invalid#Object', createTest.vjs('Object'))
    .add('ajv#invalid#Object', createTest.ajv('Object'))
    .add('vjs#Array', createTest.vjs('Array'))
    .add('ajv#Array', createTest.ajv('Array'))
    .add('vjs#invalid#Array', createTest.vjs('Array'))
    .add('ajv#invalid#Array', createTest.ajv('Array'))
    .add('vjs#Symbols', createTest.vjs('Symbols'))
    .add('ajv#Symbols', createTest.ajv('Symbols'))
    .add('vjs#invalid#Symbols', createTest.vjs('Symbols'))
    .add('ajv#invalid#Symbols', createTest.ajv('Symbols'))
    .on('cycle', (event: any) => console.log(String(event.target)))
    .on('complete', function () {
        // @ts-ignore
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ async: true });
