import { expect } from 'chai';
import 'mocha';
import { LEN, PathResolutionStrategy, PROP_DATA_PATH, REQUIRED, SYM_METHOD_CLOSURE, SYM_SCHEMA_PROPERTIES, SYM_TYPE_KEY_ORDER, SYM_TYPE_VALIDATE, TYPE, TYPE_NAME, VALUE } from '../../src/constants';
import { Compilation } from '../../src/core/compilation/compilation';
import { CompilationOptions } from '../../src/core/compilation/interface/compilation_options.interface';
import { TypeDefinition } from '../../src/core/type_wrapper/interface/type_definition.interface';
import { createTypes } from '../../src/types/mod';
import { schemaValidate } from '../../src/types/schemaValidate';
import { JBQOptions, ParseValues } from '../../src/typings';
import { suitesAny } from '../data/suites/Any.suites';
import { suitesArray } from '../data/suites/Array.suites';
import { suitesBoolean } from '../data/suites/Boolean.suites';
import { suitesNumber } from '../data/suites/Number.suites';
import { suitesObject } from '../data/suites/Object.suites';
import { suitesString } from '../data/suites/String.suites';

describe('Compilation', () => {
    it('Compiling test schemas', () => {
        const suites = [
            ...suitesAny,
            ...suitesArray,
            ...suitesBoolean,
            ...suitesNumber,
            ...suitesObject,
            ...suitesString,
        ];
        for (const { schema, name } of suites) {
            new Compilation(createTypes(), schema, name).execSync();
            new Compilation(createTypes(), schema, name, { async: true }).execSync();
        }
    });
    describe('Compilation.prototype.evaluateExpressions', () => {
        it('it should eval expressions', () => {
            const tests = [
                {
                    expr: '{{100 + schemaValue}}',
                    val: { schemaValue: 100 },
                    expected: '200',
                },
                {
                    expr: '{{schemaValue / 10}}',
                    val: { schemaValue: 100 },
                    expected: '10',
                },
                {
                    expr: '{{schemaValue.fill(0)}}',
                    val: { schemaValue: new Array(10) },
                    expected: new Array(10).fill(0).toString(),
                },
                {
                    expr: '{{"[]"}}',
                    val: { schemaValue: new Array(10) },
                    expected: '[]',
                },
            ];
            for (const { expr, val, expected } of tests) {
                const res = Compilation.prototype['evaluateExpressions'](expr, val as ParseValues);
                expect(res).to.be.equal(expected);
            }
        });
    });
    describe('Compilation.prototype.sortSchemaEntries', () => {
        it('it should sort object entries by given order', () => {
            const obj = {
                first: 1,
                second: 2,
                third: 3,
                fourth: 4,
                fifth: 5,
                last: 10,
            };
            const keyOrder = ['first', 'third', 'last'];
            const type = {
                [SYM_TYPE_KEY_ORDER]: ['first', 'third', 'last'],
            };

            const entries = Compilation.prototype['sortSchemaEntries'](obj, type as TypeDefinition);
            expect(entries[0][0]).to.be.equal(keyOrder[0]);
            expect(entries[0][1]).to.be.equal(obj.first);
            expect(entries[1][0]).to.be.equal(keyOrder[1]);
            expect(entries[1][1]).to.be.equal(obj.third);
            expect(entries[2][0]).to.be.equal(keyOrder[2]);
            expect(entries[2][1]).to.be.equal(obj.last);
            expect(entries[3][0]).to.be.equal('second');
            expect(entries[3][1]).to.be.equal(obj.second);
        });
    });
    describe(`${PROP_DATA_PATH} - with regular methods`, () => {
        it(`it should correctly resolve ${PROP_DATA_PATH}`, () => {
            {
                const Schema = {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        verified: {
                            [TYPE]: TYPE_NAME.BOOLEAN,
                        },
                        active: {
                            [TYPE]: TYPE_NAME.BOOLEAN,
                            [VALUE]: {
                                [PROP_DATA_PATH]: 'verified',
                            },
                        },
                    },
                };
                const source = new Compilation(createTypes(), Schema, 'Simple')
                    .execSync();
                const validator = new Function(source.argsParameter, source.dataParameter, source.code)
                    .bind(undefined, source.arguments);
                const validData = [
                    { verified: false, active: false },
                    { verified: true, active: true },
                ];
                for (const data of validData)
                    expect(validator(data)).to.be.equal(undefined);
                const invalidData = [
                    { verified: true, active: false },
                    { verified: false, active: true },
                ];
                for (const data of invalidData)
                    expect(validator(data)).be.a('string');
            }
            {
                const Schema = {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        received: {
                            [TYPE]: TYPE_NAME.OBJECT,
                            [SYM_SCHEMA_PROPERTIES]: {
                                age: {
                                    [TYPE]: TYPE_NAME.NUMBER,
                                    [VALUE]: {
                                        min: { [PROP_DATA_PATH]: 'valid/minimum' },
                                        max: { [PROP_DATA_PATH]: 'valid/maximum' },
                                    },
                                },
                            },
                        },
                        valid: {
                            [TYPE]: TYPE_NAME.OBJECT,
                            [SYM_SCHEMA_PROPERTIES]: {
                                minimum: {
                                    [TYPE]: TYPE_NAME.NUMBER,
                                },
                                maximum: {
                                    [TYPE]: TYPE_NAME.NUMBER,
                                },
                            },
                        },
                    },
                };
                const source = new Compilation(createTypes(), Schema, 'Nested')
                    .execSync();
                const validator = new Function(source.argsParameter, source.dataParameter, source.code)
                    .bind(undefined, source.arguments);
                const validData = [
                    { received: { age: 20 }, valid: { minimum: 15, maximum: 25 } },
                    { received: { age: 0 }, valid: { minimum: -15, maximum: 25 } },
                ];
                for (const data of validData)
                    expect(validator(data)).to.be.equal(undefined);
                const invalidData = [
                    { received: { age: 20 }, valid: { minimum: 15, maximum: 19 } },
                    { received: { age: 0 }, valid: { minimum: 5, maximum: 25 } },
                ];
                for (const data of invalidData)
                    expect(validator(data)).to.be.a('string');
            }
        });
        it(`it should skip checks if ${PROP_DATA_PATH} resolves to undefined`, () => {
            const options: CompilationOptions = { handleResolvedPaths: PathResolutionStrategy.Skip };
            {
                const Schema = {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        verified: {
                            [TYPE]: TYPE_NAME.BOOLEAN,
                        },
                        active: {
                            [TYPE]: TYPE_NAME.BOOLEAN,
                            [VALUE]: {
                                [PROP_DATA_PATH]: 'missing',
                            },
                        },
                    },
                };
                const source = new Compilation(createTypes(), Schema, 'Simple', options)
                    .execSync();
                const validator = new Function(source.argsParameter, source.dataParameter, source.code).bind(undefined, source.arguments);

                const validData = [
                    { verified: false, active: false },
                    { verified: true, active: false },
                    { verified: false, active: true },
                    { verified: true, active: true },
                ];
                for (const data of validData)
                    expect(validator(data)).to.be.equal(undefined);

                const invalidData = [
                    { verified: true, active: false, missing: true },
                    { verified: false, active: true, missing: false },
                ];
                for (const data of invalidData)
                    expect(validator(data)).be.a('string');
            }
            {
                const Schema = {
                    [TYPE]: TYPE_NAME.BOOLEAN,
                    [VALUE]: {
                        [PROP_DATA_PATH]: 'missing',
                    },
                };
                const source = new Compilation(createTypes(), Schema, 'Simple', options)
                    .execSync();
                const validator = new Function(source.argsParameter, source.dataParameter, source.code)
                    .bind(undefined, source.arguments);
                const validData = [true, false];
                for (const data of validData)
                    expect(validator(data)).be.equal(undefined);
            }
        });
        it(`it should parse ${PROP_DATA_PATH} schema`, () => {
            const options: JBQOptions = { handleResolvedPaths: PathResolutionStrategy.Schema };
            {
                const Schema = {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        active: {
                            [TYPE]: TYPE_NAME.BOOLEAN,
                            [VALUE]: {
                                [PROP_DATA_PATH]: 'verified',
                                [TYPE]: TYPE_NAME.BOOLEAN,
                            },
                        },
                    },
                };
                const source = new Compilation(createTypes(), Schema, 'Simple', options)
                    .execSync();
                const validator = new Function(source.argsParameter, source.dataParameter, source.code)
                    .bind(undefined, source.arguments);
                const validData = [
                    { verified: false, active: false },
                    { verified: true, active: true },
                ];
                for (const data of validData)
                    expect(validator(data)).to.be.equal(undefined);
                const invalidData = [
                    { verified: true, active: false },
                    { verified: false, active: true },
                    { active: true },
                    { verified: 1, active: true },
                ];
                for (const data of invalidData)
                    expect(validator(data)).be.a('string');
            }
            {
                const Schema = {
                    [TYPE]: TYPE_NAME.BOOLEAN,
                    [VALUE]: {
                        [PROP_DATA_PATH]: 'missing',
                    },
                };
                const source = new Compilation(createTypes(), Schema, 'Simple', options)
                    .execSync();
                const validator = new Function(source.argsParameter, source.dataParameter, source.code)
                    .bind(undefined, source.arguments);
                const invalidData = [true, false];
                for (const data of invalidData)
                    expect(validator(data)).be.a('string');
            }
        });
        it(`it should return message if ${PROP_DATA_PATH} resolves to undefined`, () => {
            const options: JBQOptions = { handleResolvedPaths: PathResolutionStrategy.Return };
            {
                const Schema = {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        verified: {
                            [TYPE]: TYPE_NAME.BOOLEAN,
                        },
                        active: {
                            [TYPE]: TYPE_NAME.BOOLEAN,
                            [VALUE]: {
                                [PROP_DATA_PATH]: 'missing',
                            },
                        },
                    },
                };
                const source = new Compilation(createTypes(), Schema, 'Simple', options)
                    .execSync();
                const validator = new Function(source.argsParameter, source.dataParameter, source.code)
                    .bind(undefined, source.arguments);
                const validData = [
                    { verified: false, active: false, missing: false },
                    { verified: true, active: false, missing: false },
                    { verified: false, active: true, missing: true },
                    { verified: true, active: true, missing: true },
                ];
                for (const data of validData)
                    expect(validator(data)).to.be.equal(undefined);
                const invalidData = [
                    { verified: true, active: false },
                    { verified: false, active: true },
                    { verified: true, active: false, missing: true },
                    { verified: false, active: true, missing: false },
                ];
                for (const data of invalidData)
                    expect(validator(data)).be.a('string');
            }
            {
                const Schema = {
                    [TYPE]: TYPE_NAME.BOOLEAN,
                    [VALUE]: {
                        [PROP_DATA_PATH]: 'missing',
                    },
                };
                const source = new Compilation(createTypes(), Schema, 'Simple', options)
                    .execSync();
                const validator = new Function(source.argsParameter, source.dataParameter, source.code)
                    .bind(undefined, source.arguments);
                const invalidData = [true, false];
                for (const data of invalidData)
                    expect(validator(data)).be.a('string');
            }
        });
    });
    describe(`functions with closures`, () => {
        const nullabeStringType = {
            [TYPE] (_schemaValue: ParseValues, path: string, $DATA: any) {
                if ($DATA !== null && typeof $DATA !== 'string')
                    return `{"message": "${$DATA}", "path": "${path}"}`;
            },
            logValue (_schemaValue: any, _path: string, _$DATA: null | string) {
                // console.log({ schemaValue, path, $DATA });
            },
            value (schemaValue: any, path: string, $DATA: any) {
                if (schemaValue !== $DATA)
                    return `{"message": "Data expected to be equal ${schemaValue}, got ${$DATA}", "path": "${path}"}`;
            },
            [SYM_TYPE_VALIDATE]: {
                [TYPE] (value: any) {
                    if (typeof value !== 'string')
                        throw new Error('expected string as type schema value');
                },
                logValue (_value: any) {
                    return;
                },
                value (value: any) {
                    if (value !== null && typeof value !== 'string' && !schemaValidate.dataPath(value))
                        throw new Error('expected string, datapath or null');
                },
            },
        };
        const types = createTypes();
        Object.defineProperty(nullabeStringType[TYPE], SYM_METHOD_CLOSURE, { value: true });
        Object.defineProperty(nullabeStringType.logValue, SYM_METHOD_CLOSURE, { value: true });
        Object.defineProperty(nullabeStringType.value, SYM_METHOD_CLOSURE, { value: true });
        types.set('nullableString', nullabeStringType, { type: 'string' });

        it(`it should resolve ${PROP_DATA_PATH} in closure methods`, () => {
            const testSchemas = {
                Closure: {
                    [TYPE]: 'nullableString',
                },
                WithPath: {
                    [TYPE]: TYPE_NAME.OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        mailing: { [TYPE]: TYPE_NAME.ANY },
                        enlistedOn: { [TYPE]: 'nullableString', logValue: { $dataPath: 'mailing' } },
                    },
                },
            };
            {
                const schema = testSchemas.Closure;
                const source = new Compilation(types, schema, 'Closure').execSync();
                const validator = new Function(source.argsParameter, source.dataParameter, source.code)
                    .bind(undefined, source.arguments);
                const validData = ['A String', null];
                for (const data of validData)
                    expect(validator(data)).to.be.equal(undefined);
                const invalidData = [{}, [], true, 1, undefined];
                for (const data of invalidData)
                    expect(validator(data)).to.be.a('string');
            }
            {
                const schema = testSchemas.WithPath;
                const source = new Compilation(types, schema, 'WithPath').execSync();
                const validator = new Function(source.argsParameter, source.dataParameter, source.code)
                    .bind(undefined, source.arguments);
                const validData = [
                    { mailing: null, enlistedOn: null },
                    { mailing: 'enabled', enlistedOn: 'all' },
                ];
                for (const data of validData)
                    expect(validator(data)).to.be.equal(undefined);
                const invalidData = [{}, { mailing: null, enlistedOn: true }];
                for (const data of invalidData)
                    expect(validator(data)).to.be.a('string');
            }
        });
        it(`it should skip checks if ${PROP_DATA_PATH} resolves to undefined`, () => {
            const options: JBQOptions = { handleResolvedPaths: PathResolutionStrategy.Skip };
            const Schema = {
                [TYPE]: TYPE_NAME.OBJECT,
                [SYM_SCHEMA_PROPERTIES]: {
                    compare: {
                        [TYPE]: TYPE_NAME.ANY,
                    },
                    val: {
                        [TYPE]: 'nullableString',
                        value: {
                            [PROP_DATA_PATH]: 'compare',
                        },
                    },
                },
            };
            const source = new Compilation(types, Schema, 'Simple', options)
                .execSync();
            const validator = new Function(source.argsParameter, source.dataParameter, source.code)
                .bind(undefined, source.arguments);
            const validData = [
                { compare: null, val: null },
                { compare: '0', val: '0' },
                { val: null },
                { val: '1' },
            ];
            for (const data of validData)
                expect(validator(data)).to.be.equal(undefined);
            const invalidData = [
                { compare: null, val: '0' },
                { compare: '0', val: null },
                { val: 1 },
            ];
            for (const data of invalidData)
                expect(validator(data)).be.a('string');
        });
        it(`it should parse ${PROP_DATA_PATH} schema`, () => {
            const options: JBQOptions = { handleResolvedPaths: PathResolutionStrategy.Schema };
            const Schema = {
                [TYPE]: TYPE_NAME.OBJECT,
                [SYM_SCHEMA_PROPERTIES]: {
                    val: {
                        [TYPE]: 'nullableString',
                        value: {
                            [PROP_DATA_PATH]: 'compare',
                            [TYPE]: TYPE_NAME.ANY,
                            [REQUIRED]: true,
                        },
                    },
                },
            };
            const source = new Compilation(types, Schema, 'Simple', options)
                .execSync();
            const validator = new Function(source.argsParameter, source.dataParameter, source.code)
                .bind(undefined, source.arguments);
            const validData = [
                { compare: null, val: null },
                { compare: '0', val: '0' },
            ];
            for (const data of validData)
                expect(validator(data)).to.be.equal(undefined);
            const invalidData = [
                { compare: null, val: '0' },
                { compare: '0', val: null },
                { val: null },
                { val: '1' },
                { val: 1 },
            ];
            for (const data of invalidData)
                expect(validator(data)).be.a('string');
        });
        it(`it should return message if ${PROP_DATA_PATH} resolves to undefined`, () => {
            const options: JBQOptions = { handleResolvedPaths: PathResolutionStrategy.Return };
            const Schema = {
                [TYPE]: TYPE_NAME.OBJECT,
                [SYM_SCHEMA_PROPERTIES]: {
                    val: {
                        [TYPE]: 'nullableString',
                        value: {
                            [PROP_DATA_PATH]: 'compare',
                        },
                    },
                },
            };
            const source = new Compilation(types, Schema, 'Simple', options)
                .execSync();
            const validator = new Function(source.argsParameter, source.dataParameter, source.code)
                .bind(undefined, source.arguments);
            const validData = [
                { compare: null, val: null },
                { compare: '0', val: '0' },
            ];
            for (const data of validData)
                expect(validator(data)).to.be.equal(undefined);
            const invalidData = [
                { compare: null, val: '0' },
                { compare: '0', val: null },
                { val: null },
                { val: '1' },
                { val: 1 },
            ];
            for (const data of invalidData)
                expect(validator(data)).be.a('string');
        });
    });
    describe(`${PROP_DATA_PATH} - with macros`, () => {
        it(`it should resolve ${PROP_DATA_PATH} for macro methods`, () => {
            const Schema = {
                [TYPE]: TYPE_NAME.OBJECT,
                [SYM_SCHEMA_PROPERTIES]: {
                    range: {
                        [TYPE]: TYPE_NAME.OBJECT,
                        [SYM_SCHEMA_PROPERTIES]: {
                            min: {
                                [TYPE]: TYPE_NAME.NUMBER,
                                [VALUE]: {
                                    min: 0,
                                    max: { [PROP_DATA_PATH]: 'range/max' },
                                },
                            },
                            max: {
                                [TYPE]: TYPE_NAME.NUMBER,
                                [VALUE]: {
                                    min: { [PROP_DATA_PATH]: 'range/min' },
                                },
                            },
                        },
                    },
                    username: {
                        [TYPE]: TYPE_NAME.STRING,
                        [LEN]: {
                            min: { [PROP_DATA_PATH]: 'range/min' },
                            max: { [PROP_DATA_PATH]: 'range/max' },
                        },
                    },
                },
            };
            const source = new Compilation(createTypes(), Schema, 'UserName').execSync();
            const validator = new Function(source.argsParameter, source.dataParameter, source.code)
                .bind(undefined, source.arguments);
            const validData = [
                {
                    range: { min: 6, max: 12 },
                    username: 'SuperUser',
                },
                {
                    range: { min: 3, max: 3 },
                    username: 'Max',
                },
            ];
            for (const data of validData)
                expect(validator(data)).to.be.equal(undefined);
            const invalidData = [
                {
                    range: { min: 5, max: 4 },
                    username: '12345',
                },
                {
                    range: { min: 5, max: 7 },
                    username: 'SuperUser',
                },
                {
                    range: { min: 10, max: 5 },
                    username: '12345',
                },
            ];
            for (const data of invalidData)
                expect(validator(data)).to.be.a('string');
        });
        it(`it should skip checks if ${PROP_DATA_PATH} resolves to undefined`, () => {
            const options: JBQOptions = { handleResolvedPaths: PathResolutionStrategy.Skip };
            const Schema = {
                [TYPE]: TYPE_NAME.OBJECT,
                [SYM_SCHEMA_PROPERTIES]: {
                    username: {
                        [TYPE]: TYPE_NAME.STRING,
                        [LEN]: {
                            min: { [PROP_DATA_PATH]: 'range/min' },
                            max: { [PROP_DATA_PATH]: 'range/max' },
                        },
                    },
                },
            };
            const source = new Compilation(createTypes(), Schema, 'UserName', options)
                .execSync();
            const validator = new Function(source.argsParameter, source.dataParameter, source.code)
                .bind(undefined, source.arguments);
            const validData = [
                {
                    range: { max: 12 },
                    username: 'SuperUser',
                },
                {
                    range: { min: 3 },
                    username: 'Max',
                },
                {
                    username: 'Max',
                },
            ];
            for (const data of validData)
                expect(validator(data)).to.be.equal(undefined);
            const invalidData = [
                {
                    range: { min: 5, max: 4 },
                    username: '12345',
                },
                {
                    range: { min: 5, max: 7 },
                    username: 'SuperUser',
                },
                {
                    range: { min: 10, max: 5 },
                    username: '12345',
                },
            ];
            for (const data of invalidData)
                expect(validator(data)).to.be.a('string');
        });
        it(`it should parse ${PROP_DATA_PATH} schema`, () => {
            const options: JBQOptions = { handleResolvedPaths: PathResolutionStrategy.Schema };
            const Schema = {
                [TYPE]: TYPE_NAME.OBJECT,
                [SYM_SCHEMA_PROPERTIES]: {
                    username: {
                        [TYPE]: TYPE_NAME.STRING,
                        [LEN]: {
                            min: {
                                [PROP_DATA_PATH]: 'range/min',
                                [TYPE]: TYPE_NAME.NUMBER,
                                [VALUE]: {
                                    min: 0,
                                    max: { [PROP_DATA_PATH]: 'range/max' },
                                },
                            },
                            max: {
                                [PROP_DATA_PATH]: 'range/max',
                                [TYPE]: TYPE_NAME.NUMBER,
                                [VALUE]: {
                                    min: { [PROP_DATA_PATH]: 'range/min' },
                                },
                            },
                        },
                    },
                },
            };
            const source = new Compilation(createTypes(), Schema, 'UserName', options)
                .execSync();
            const validator = new Function(source.argsParameter, source.dataParameter, source.code)
                .bind(undefined, source.arguments);
            const validData = [
                {
                    range: { min: 6, max: 12 },
                    username: 'SuperUser',
                },
                {
                    range: { min: 3, max: 3 },
                    username: 'Max',
                },
            ];
            for (const data of validData)
                expect(validator(data)).to.be.equal(undefined);
            const invalidData = [
                {
                    range: { min: 5, max: 4 },
                    username: '12345',
                },
                {
                    range: { min: 5, max: 7 },
                    username: 'SuperUser',
                },
                {
                    range: { min: 10, max: 5 },
                    username: '12345',
                },
            ];
            for (const data of invalidData)
                expect(validator(data)).to.be.a('string');
        });
        it(`it should return message if ${PROP_DATA_PATH} resolves to undefined`, () => {
            const options: JBQOptions = { handleResolvedPaths: PathResolutionStrategy.Return };
            const Schema = {
                [TYPE]: TYPE_NAME.OBJECT,
                [SYM_SCHEMA_PROPERTIES]: {
                    username: {
                        [TYPE]: TYPE_NAME.STRING,
                        [LEN]: {
                            min: {
                                [PROP_DATA_PATH]: 'range/min',
                            },
                            max: {
                                [PROP_DATA_PATH]: 'range/max',
                            },
                        },
                    },
                },
            };
            const source = new Compilation(createTypes(), Schema, 'UserName', options)
                .execSync();
            const validator = new Function(source.argsParameter, source.dataParameter, source.code)
                .bind(undefined, source.arguments);
            const validData = [
                {
                    range: { min: 6, max: 12 },
                    username: 'SuperUser',
                },
                {
                    range: { min: 3, max: 3 },
                    username: 'Max',
                },
            ];
            for (const data of validData)
                expect(validator(data)).to.be.equal(undefined);
            const invalidData = [
                {
                    range: { min: 5 },
                    username: '12345',
                },
                {
                    range: { max: 7 },
                    username: 'SuperUser',
                },
                {
                    username: '12345',
                },
                {
                    username: '123123',
                    range: { min: 10, max: 3 },
                },
            ];
            for (const data of invalidData)
                expect(validator(data)).to.be.a('string');
        });
    });
});
