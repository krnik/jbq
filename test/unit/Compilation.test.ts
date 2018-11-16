import { expect } from 'chai';
import { MAX, MAX_LEN, MIN, MIN_LEN, SYM_SCHEMA_CONFIG, SYM_SCHEMA_PROPERTIES, SYM_TYPE_EXTERNAL, SYM_TYPE_VALIDATE, TOKEN_EXPR_REGEX, TYPE } from '../../src/constants';
import { Compilation } from '../../src/core/Compilation';
import { createTypes } from '../../src/types/index';
import { schemas } from '../data/main';

export default () => describe('Compilation', () => {
    it('it should parse schemas', () => {
        for (const key of Object.getOwnPropertyNames(schemas.valid)) {
            new Compilation(
                createTypes(),
                key,
                schemas.valid[key as keyof typeof schemas.valid]!,
                false,
            ).exec();
        }
        for (const key of Object.getOwnPropertyNames(schemas.invalid)) {
            new Compilation(
                createTypes(),
                key,
                schemas.invalid[key as keyof typeof schemas.invalid]!,
                false,
            ).exec();
        }
    });
    describe('passing default schema config', () => {
        it(`${SYM_SCHEMA_CONFIG.toString()} - schemas root`, () => {
            const testSchemas = {
                Test0: {
                    [SYM_SCHEMA_CONFIG]: {
                        [TYPE]: 'string',
                    },
                    [MIN_LEN]: 2,
                },
                Test1: {
                    [SYM_SCHEMA_CONFIG]: {
                        [TYPE]: 'string',
                    },
                    [MAX_LEN]: 2,
                },
            };
            {
                const source = new Compilation(createTypes(), 'Test0', testSchemas.Test0, false).exec();
                const validator = new Function([...source.parameters, source.dataParameter].join(), source.code);
                const bound = validator.bind(undefined, ...source.arguments);
                expect(bound('1')).to.be.a('string');
            }
            {
                const source = new Compilation(createTypes(), 'Test1', testSchemas.Test1, false).exec();
                const validator = new Function([...source.parameters, source.dataParameter].join(), source.code);
                const bound = validator.bind(undefined, ...source.arguments);
                expect(bound('123')).to.be.a('string');
            }
        });
        it(`${SYM_SCHEMA_CONFIG.toString()} - schema`, () => {
            const testSchemas = {
                Test: {
                    [SYM_SCHEMA_CONFIG]: {
                        [TYPE]: 'string',
                    },
                    [TYPE]: 'object',
                    [SYM_SCHEMA_PROPERTIES]: {
                        prop1: { [MIN_LEN]: 2 },
                        prop2: { [MAX_LEN]: 4 },
                    },
                },
            };
            {
                const source = new Compilation(createTypes(), 'Test', testSchemas.Test, false).exec();
                const validator = new Function([...source.parameters, source.dataParameter].join(), source.code);
                const bound = validator.bind(undefined, ...source.arguments);
                expect(bound({ prop1: '1234' })).to.be.a('string');
                expect(bound({ prop2: '1234' })).to.be.a('string');
                expect(bound({ prop1: '1', prop2: '12345' })).to.be.a('string');
            }
        });
        it(`${SYM_SCHEMA_CONFIG.toString()} - should be omited in ${SYM_SCHEMA_PROPERTIES.toString()}`, () => {
            const testSchemas = {
                Test: {
                    [TYPE]: 'object',
                    [SYM_SCHEMA_PROPERTIES]: {
                        [SYM_SCHEMA_CONFIG]: {
                            [TYPE]: 'string',
                        },
                        prop1: { [MIN_LEN]: 4 },
                    },
                },
            };
            try {
                new Compilation(createTypes(), 'Test', testSchemas.Test, false).exec();
            } catch (err) {
                expect(err).to.have.property('message');
                expect(err.message.includes('Schema must have')).to.be.equal(true);
            }
        });
    });
    describe('resolve dataPath', () => {
        it('it should resolve simple object paths', () => {
            const schema = {
                [TYPE]: 'object',
                [SYM_SCHEMA_CONFIG]: { [TYPE]: 'number' },
                [SYM_SCHEMA_PROPERTIES]: {
                    smallest: {
                        [MIN]: 0,
                        [MAX]: 10,
                    },
                    middle: {
                        [MIN]: { $dataPath: 'smallest' },
                        [MAX]: { $dataPath: 'biggest' },
                    },
                },
            };
            const types = createTypes();
            const source = new Compilation(types, 'Test', schema, false).exec();
            const validator = new Function([...source.parameters, source.dataParameter].join(), source.code);
            const bound = validator.bind(undefined, ...source.arguments);
            expect(bound({ smallest: 5, middle: 10, biggest: 15 })).to.be.equal(undefined);
            expect(bound({ smallest: 10, middle: 10, biggest: 9 })).to.be.a('string');
        });
        it('it should succesfully resolve data path including external methods', () => {
            const type = {
                [TYPE] (schemaValue: string, data: any) {
                    if (typeof data !== 'string' && typeof data !== 'number')
                        return `It should be a numeric ${schemaValue}. Got ${typeof data}.`;
                },
                [MIN] (schemaValue: number, data: any) {
                    if (schemaValue > data)
                        return `Data expected to be at least #{schemaValue}. Got ${data}.`;
                },
                [SYM_TYPE_EXTERNAL]: [MIN],
                [SYM_TYPE_VALIDATE]: {
                    [TYPE] (schemaValue: any) {
                        if (typeof schemaValue !== 'string') throw new Error();
                    },
                },
            };
            const schema = {
                [TYPE]: 'object',
                [SYM_SCHEMA_PROPERTIES]: {
                    min: {
                        [TYPE]: 'numeric',
                        [MIN]: { $dataPath: 'age' },
                    },
                    age: {
                        [TYPE]: 'number',
                        [MAX]: { $dataPath: ['eq'] },
                    },
                    eq: {
                        [TYPE]: 'number',
                        [MAX]: { $dataPath: 'min' },
                    },
                },
            };
            const types = createTypes().set('numeric', type, 'number');
            const source = new Compilation(types, 'Test', schema, false).exec();
            const validator = new Function([...source.parameters, source.dataParameter].join(), source.code);
            const bound = validator.bind(undefined, ...source.arguments);
            expect(bound({ min: 11, age: 11, eq: 11 })).to.be.equal(undefined);
            expect(bound({ min: 10, age: 20, eq: 12 })).to.be.a('string');
        });
    });
    describe(`eval '#{}' expressions`, () => {
        it('it should interpolate schemaValue or path expressions', () => {
            const str = '#{schemaValue} @ #{schemaPath}';
            // @ts-ignore
            const res = Compilation.prototype.evalExpressions(str, { schemaPath: '#/minLen' }, 1999);
            expect(res).to.be.equal(`1999 @ #/minLen`);
        });
        it(`it should omit any expression that does not match ${TOKEN_EXPR_REGEX.toString()} pattern`, () => {
            const str = `#{maze}`;
            // @ts-ignore
            const res = Compilation.prototype.evalExpressions(str, true, '');
            expect(res).to.be.equal(str);
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
            // @ts-ignore
            const entries = Compilation.prototype.sortByKey(obj, keyOrder);
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
});
