import ajv from 'ajv';
import Benchmark from 'benchmark';
import { VJS } from '../../core/VJS';
import { createTypes } from '../../types/index';
import { createData, schemas } from '../data/index';

/**
 * AJV SCHEMAS
 */
const name = {
    type: 'string',
    minLength: 2,
    maxLength: 64,
};
const email = {
    type: 'string',
    minLength: 4,
    pattern: '@',
};
const password = {
    type: 'string',
    minLength: 4,
};
const date = {
    type: 'string',
    pattern: '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d{3}Z',
};
const age = {
    type: 'number',
    minimum: 18,
    maximum: 120,
};
const id = {
    type: 'number',
    minimum: 1,
    maximum: 10000,
};
const content = {
    type: 'string',
    minLength: 1,
};
const ajvschemas: { [k: string]: any } = {
    Name: name,
    Email: email,
    Password: password,
    Date: date,
    Age: age,
    Address: {
        properties: {
            street: {
                type: 'string',
                minLength: 8,
                maxLength: 8,
            },
            zipCode: {
                type: 'string',
                pattern: '\\d{2}-\\d{3}',
            },
        },
    },
    User: {
        properties: {
            age,
            email,
            password,
            joined: date,
            firstName: name,
            lastName: name,
            files: {
                type: 'array',
                items: id,
            },
            comments: {
                type: 'array',
                items: id,
            },
        },
    },
    File: {
        properties: {
            date,
            content,
            user: id,
            title: name,
        },
    },
    Comment: {
        properties: {
            date,
            content,
            user: id,
        },
    },
    UserResources: {
        properties: {
            files: {
                type: 'array',
                items: [{
                    properties: {
                        date,
                        content,
                        user: id,
                        title: name,
                    },
                }],
            },
            comments: {
                type: 'array',
                items: [{
                    properties: {
                        date,
                        content,
                        user: id,
                    },
                }],
            },
        },
    },
};

const data = createData(schemas);
const createTest = {
    vjs (schemaName: string) {
        const validator = new VJS(createTypes(), schemas, {});
        return validator[schemaName].validSync.bind(null, data[schemaName]);
    },
    ajv (schemaName: string) {
        const AJV = new ajv().compile(ajvschemas[schemaName]);
        return AJV.bind(null, data[schemaName]);
    },
};

new Benchmark.Suite()
    .add('vjs#Name', createTest.vjs('Name'))
    .add('ajv#Name', createTest.ajv('Name'))
    .add('vjs#Email', createTest.vjs('Email'))
    .add('ajv#Email', createTest.ajv('Email'))
    .add('vjs#Password', createTest.vjs('Password'))
    .add('ajv#Password', createTest.ajv('Password'))
    .add('vjs#Date', createTest.vjs('Date'))
    .add('ajv#Date', createTest.ajv('Date'))
    .add('vjs#Age', createTest.vjs('Age'))
    .add('ajv#Age', createTest.ajv('Age'))
    .add('vjs#Address', createTest.vjs('Address'))
    .add('ajv#Address', createTest.ajv('Address'))
    .add('vjs#User', createTest.vjs('User'))
    .add('ajv#User', createTest.ajv('User'))
    .add('vjs#File', createTest.vjs('File'))
    .add('ajv#File', createTest.ajv('File'))
    .add('vjs#Comment', createTest.vjs('Comment'))
    .add('ajv#Comment', createTest.ajv('Comment'))
    .add('vjs#UserResources', createTest.vjs('UserResources'))
    .add('ajv#UserResources', createTest.ajv('UserResources'))
    .on('cycle', (event: any) => console.log(String(event.target)))
    .on('complete', function () {
        // @ts-ignore
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run();
