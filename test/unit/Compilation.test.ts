import { expect } from 'chai';
import 'mocha';
import { LEN, PROP_DATA_PATH, SYM_METHOD_CLOSURE, SYM_SCHEMA_PROPERTIES, SYM_TYPE_KEY_ORDER, SYM_TYPE_VALIDATE, TYPE, TYPE_NAME, VALUE } from '../../src/constants';
import { Compilation } from '../../src/core/Compilation';
import { createTypes } from '../../src/types/main';
import { IParseValues } from '../../src/typings';
import { schemasAny } from '../data/schemas/Any.schemas';
import { schemasArray } from '../data/schemas/Array.schemas';
import { schemasBoolean } from '../data/schemas/Boolean.schemas';
import { schemasNumber } from '../data/schemas/Number.schemas';
import { schemasObject } from '../data/schemas/Object.schemas';
import { schemasString } from '../data/schemas/String.schemas';

describe('Compilation', () => {
    it('Compiling test schemas', () => {
        const suites = [
            ...schemasAny,
            ...schemasArray,
            ...schemasBoolean,
            ...schemasNumber,
            ...schemasObject,
            ...schemasString,
        ];
        for (const { schema, name } of suites)
            new Compilation(createTypes(), schema, name).execSync();
    });
    describe('Compilation.prototype.evalExpressions', () => {
        it('it should interpolate values', () => {
            const str = '{{schemaValue}} @ {{schemaPath}}';
            // @ts-ignore
            const res = Compilation.prototype.evalExpressions(str, {
                schemaPath: '#/minLen',
                schemaValue: 1999,
            });
            expect(res).to.be.equal(`1999 @ #/minLen`);
        });
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
                // @ts-ignore
                const res = Compilation.prototype.evalExpressions(expr, val);
                expect(res).to.be.equal(expected);
            }
        });
    });
    describe('Compilation.prototype.sortByKey', () => {
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
            // @ts-ignore
            const entries = Compilation.prototype.sortEntries(obj, type);
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
                const Simple = {
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
                const source = new Compilation(createTypes(), Simple, 'Simple').execSync();
                const validator = new Function(source.argsParam, source.dataParam, source.code)
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
                const Nested = {
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
                const source = new Compilation(createTypes(), Nested, 'Nested').execSync();
                const validator = new Function(source.argsParam, source.dataParam, source.code)
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
        // tslint:disable-next-line:no-empty
        it.skip(`it should skip checks if ${PROP_DATA_PATH} resolves to undefined`, () => { });
        // tslint:disable-next-line:no-empty
        it.skip(`it should parse ${PROP_DATA_PATH} schema`, () => { });
        // tslint:disable-next-line:no-empty
        it.skip(`it should not resolve ${PROP_DATA_PATH} with new variable if there is already one defined for target property`, () => { });
    });
    describe(`functions with closures`, () => {
        it(`it should resolve ${PROP_DATA_PATH} in closure methods`, () => {
            const types = createTypes();
            const nullabeStringType = {
                [TYPE] (_schemaValue: IParseValues, path: string, $DATA: any) {
                    if ($DATA !== null && typeof $DATA !== 'string')
                        return `{"message": "${$DATA}", "path": "${path}"}`;
                },
                logValue (_schemaValue: null | string, _path: string, _$DATA: any) {
                    // tslint:disable-next-line:no-console
                    // console.log({ schemaValue, path, $DATA });
                },
                [SYM_TYPE_VALIDATE]: {
                    [TYPE] (value: any) {
                        if (typeof value !== 'string')
                            throw new Error('expected string as type schema value');
                    },
                    // tslint:disable-next-line:no-empty
                    logValue (_value: any) { },
                },
            };
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
            Object.defineProperty(nullabeStringType[TYPE], SYM_METHOD_CLOSURE, { value: true });
            Object.defineProperty(nullabeStringType.logValue, SYM_METHOD_CLOSURE, { value: true });
            types.set('nullableString', nullabeStringType, { type: 'string' });
            {
                const schema = testSchemas.Closure;
                const source = new Compilation(types, schema, 'Closure').execSync();
                const validator = new Function(source.argsParam, source.dataParam, source.code)
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
                const validator = new Function(source.argsParam, source.dataParam, source.code)
                    .bind(undefined, source.arguments);
                const validData = [{ mailing: null, enlistedOn: null }, { mailing: 'enabled', enlistedOn: 'all' }];
                for (const data of validData)
                    expect(validator(data)).to.be.equal(undefined);
                const invalidData = [{}, { mailing: null, enlistedOn: true }];
                for (const data of invalidData)
                    expect(validator(data)).to.be.a('string');
            }
        });
    });
    describe(`${PROP_DATA_PATH} - with macros`, () => {
        it(`it should resolve ${PROP_DATA_PATH} for macro methods`, () => {
            const testSchemas = {
                UserName: {
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
                },
            };
            {
                const schema = testSchemas.UserName;
                const source = new Compilation(createTypes(), schema, 'UserName').execSync();
                const validator = new Function(source.argsParam, source.dataParam, source.code)
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
                ];
                for (const data of invalidData)
                    expect(validator(data)).to.be.a('string');
            }
        });
    });
});
