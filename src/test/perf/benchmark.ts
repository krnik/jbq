import ajv from 'ajv';
import Benchmark from 'benchmark';
import { VJS } from '../../core/VJS';
import { createTypes } from '../../types/index';
import { createData, schemas } from '../data/index';

// AJV schemas
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

const data = createData(schemas.valid);
// tslint:disable-next-line: no-console
console.log(data);
const createTest = {
    vjs (schemaName: string) {
        const validator = new VJS(createTypes(), schemas.valid);
        return validator[schemaName].bind(undefined, data[schemaName]);
    },
    invalidvjs (schemaName: string) {
        const validator = new VJS(createTypes(), schemas.valid);
        const invalidKey = Object.keys(data).find((e) => e !== schemaName) as string;
        return validator[schemaName].bind(undefined, data[invalidKey]);
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

function passingTest (fn: any) {
    return () => {
        const res = fn();
        if (res === false || typeof res === 'string') {
            // tslint:disable-next-line: no-console
            console.log(res);
            throw Error('returned error');
        }
    };
}

function failingTest (fn: any) {
    return () => {
        const res = fn();
        if (res === true || res === undefined) {
            // tslint:disable-next-line: no-console
            console.log(res);
            throw Error('Test should return false result.');
        }
    };
}

new Benchmark.Suite()
    .add('vjs#String', passingTest(createTest.vjs('String')))
    .add('ajv#String', passingTest(createTest.ajv('String')))
    .add('vjs#invalid#String', failingTest(createTest.vjs('String')))
    .add('ajv#invalid#String', failingTest(createTest.ajv('String')))
    .add('vjs#Number', passingTest(createTest.vjs('Number')))
    .add('ajv#Number', passingTest(createTest.ajv('Number')))
    .add('vjs#invalid#Number', failingTest(createTest.vjs('Number')))
    .add('ajv#invalid#Number', failingTest(createTest.ajv('Number')))
    .add('vjs#Boolean', passingTest(createTest.vjs('Boolean')))
    .add('ajv#Boolean', passingTest(createTest.ajv('Boolean')))
    .add('vjs#invalid#Boolean', failingTest(createTest.vjs('Boolean')))
    .add('ajv#invalid#Boolean', failingTest(createTest.ajv('Boolean')))
    .add('vjs#Object', passingTest(createTest.vjs('Object')))
    .add('ajv#Object', passingTest(createTest.ajv('Object')))
    .add('vjs#invalid#Object', failingTest(createTest.vjs('Object')))
    .add('ajv#invalid#Object', failingTest(createTest.ajv('Object')))
    .add('vjs#Array', passingTest(createTest.vjs('Array')))
    .add('ajv#Array', passingTest(createTest.ajv('Array')))
    .add('vjs#invalid#Array', failingTest(createTest.vjs('Array')))
    .add('ajv#invalid#Array', failingTest(createTest.ajv('Array')))
    .add('vjs#Symbols', passingTest(createTest.vjs('Symbols')))
    .add('ajv#Symbols', passingTest(createTest.ajv('Symbols')))
    .add('vjs#invalid#Symbols', failingTest(createTest.vjs('Symbols')))
    .add('ajv#invalid#Symbols', failingTest(createTest.ajv('Symbols')))
    // tslint:disable-next-line: no-console
    .on('cycle', (event: any) => console.log(String(event.target)))
    .on('complete', function () {
        // @ts-ignore
        // tslint:disable-next-line: no-console
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ async: true });
