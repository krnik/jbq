import ajv from 'ajv';
import Benchmark from 'benchmark';
import { Validator } from '../../core/Validator';
import { createTypes } from '../../types/index';
import { createData, schemas } from '../data/index';

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
const ajvschemas = {
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
    // tslint:disable-next-line:no-shadowed-variable
    vjs (schemaName, data) {
        const validator = new Validator(createTypes(), schemas, {});
        return validator[`${schemaName}Sync`].bind(null, data);
    },
    // tslint:disable-next-line:no-shadowed-variable
    ajv (schema, data) {
        const AJV = new ajv().compile(schema);
        return AJV.bind(null, data);
    },
};

new Benchmark.Suite()
    .add('vjs#Name', createTest.vjs('Name', data.Name))
    .add('ajv#Name', createTest.ajv(ajvschemas.Name, data.Name))
    .add('vjs#Email', createTest.vjs('Email', data.Email))
    .add('ajv#Email', createTest.ajv(ajvschemas.Email, data.Email))
    .add('vjs#Password', createTest.vjs('Password', data.Password))
    .add('ajv#Password', createTest.ajv(ajvschemas.Password, data.Password))
    .add('vjs#Date', createTest.vjs('Date', data.Date))
    .add('ajv#Date', createTest.ajv(ajvschemas.Date, data.Date))
    .add('vjs#Age', createTest.vjs('Age', data.Age))
    .add('ajv#Age', createTest.ajv(ajvschemas.Age, data.Age))
    .add('vjs#Address', createTest.vjs('Address', data.Address))
    .add('ajv#Address', createTest.ajv(ajvschemas.Address, data.Address))
    .add('vjs#User', createTest.vjs('User', data.User))
    .add('ajv#User', createTest.ajv(ajvschemas.User, data.User))
    .add('vjs#File', createTest.vjs('File', data.File))
    .add('ajv#File', createTest.ajv(ajvschemas.File, data.File))
    .add('vjs#Comment', createTest.vjs('Comment', data.Comment))
    .add('ajv#Comment', createTest.ajv(ajvschemas.Comment, data.Comment))
    .add('vjs#UserResources', createTest.vjs('UserResources', data.UserResources))
    .add('ajv#UserResources', createTest.ajv(ajvschemas.UserResources, data.UserResources))
    // tslint:disable-next-line:no-console
    .on('cycle', (event: any) => console.log(String(event.target)))
    .on('complete', function () {
    // tslint:disable-next-line:no-console
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run();
