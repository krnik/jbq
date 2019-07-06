import { expect } from 'chai';
import { check, gen, property } from 'testcheck';
import { PROP_DATA_PATH } from '../../../src/misc/constants';
import { schemaValidate } from '../../../src/type/schema_validator';

describe('schemaValidator', (): void => {
    const tName = 'schemaValidator test';
    const mName = tName;

    describe('any', (): void => {
        const validateFn = schemaValidate.any(tName, mName);

        it('it should throw if argument is not provided', (): void => {
            expect((): void => validateFn(undefined)).to.throw();
        });

        it('it should return undefined on any value', (): void => {
            check(
                property(
                    gen.JSONPrimitive,
                    (value): void => {
                        expect(validateFn(value)).to.be.equal(undefined);
                    },
                ),
            );
        });
    });

    describe('arrayOf', (): void => {
        const validateFn = schemaValidate.arrayOf(tName, mName, 'string');

        it('it should throw if argument is not provided', (): void => {
            expect((): void => validateFn(undefined)).to.throw();
        });

        it('it should throw on non-array value', (): void => {
            check(
                property(
                    gen.JSONPrimitive,
                    (value): void => {
                        expect((): void => validateFn(value)).to.throw();
                    },
                ),
            );
        });

        it('it should throw if array is empty', (): void => {
            expect((): void => validateFn([])).to.throw();
        });

        it('it should throw if array elements are not of type', (): void => {
            const boundFn = schemaValidate.arrayOf.bind(undefined, tName, mName);
            const throwFns = [
                (): void => boundFn('array')([false]),
                (): void => boundFn('boolean')([1]),
                (): void => boundFn('number')([true]),
                (): void => boundFn('object')([false]),
                (): void => boundFn('string')([false]),
                (): void => boundFn('symbol')([false]),
            ];
            for (const fn of throwFns) expect(fn).to.throw();
        });

        it('it should return undefined on valid value', (): void => {
            const boundFn = schemaValidate.arrayOf.bind(undefined, tName, mName);
            const results = [
                boundFn('array')([[true]]),
                boundFn('boolean')([true]),
                boundFn('number')([1]),
                boundFn('object')([{}]),
                boundFn('string')(['false']),
                boundFn('symbol')([Symbol()]),
            ];
            for (const res of results) expect(res).to.be.equal(undefined);
        });
    });

    describe('dataPath', (): void => {
        it('it should return false if value is not a data path object', (): void => {
            const invalidValues = [true, {}, { $dataPath: true }, { $dataPath: [false] }];
            // @ts-ignore
            for (const val of invalidValues)
                expect(schemaValidate.dataPath(val)).to.be.equal(false);
        });

        it('it should return true if value is a data path object', (): void => {
            const validValues = [{ $dataPath: 'length' }, { $dataPath: ['length', 'raw'] }];
            for (const val of validValues) expect(schemaValidate.dataPath(val)).to.be.equal(true);
        });
    });

    describe('primitive', (): void => {
        const boundFn = schemaValidate.primitive.bind(undefined, tName, mName);

        it('it should throw if value does not match type', (): void => {
            const functions = [
                (): void => boundFn('boolean')(1),
                (): void => boundFn('number')(false),
                (): void => boundFn('string')(true),
                (): void => boundFn('symbol')(''),
            ];
            for (const fn of functions) expect(fn).to.throw();
        });

        it('it should return undefined if type matches', (): void => {
            const results = [
                boundFn('boolean')(true),
                boundFn('number')(1),
                boundFn('string')('false'),
                boundFn('symbol')(Symbol()),
            ];
            for (const res of results) expect(res).to.be.equal(undefined);
        });

        it('throw with acceptDataPath', (): void => {
            expect((): void => boundFn('string', true)({ [PROP_DATA_PATH]: false })).to.throw();
        });

        it('valid value with acceptDataPath', (): void => {
            expect(boundFn('string', true)({ [PROP_DATA_PATH]: 'path' })).to.be.equal(undefined);
        });
    });

    describe('isInstance', (): void => {
        const fn = schemaValidate.isInstance(tName, mName, Array);

        it('it should throw on invalid values', (): void => {
            expect((): void => fn({})).to.throw();
        });

        it('it should return undefined on matching values', (): void => {
            expect(fn([])).to.be.equal(undefined);
        });
    });

    describe('minMaxOrNumber', (): void => {
        const min = { min: 1 };
        const max = { max: 2 };
        const minMax = { min: 1, max: 2 };
        const path = { [PROP_DATA_PATH]: 'path/to/value' };
        const fn = schemaValidate.minMaxOrNumber.bind(undefined, tName, mName);

        it('valid number or dataPath', (): void => {
            expect(fn(true)(1)).to.be.equal(undefined);
            expect(fn(true)(path)).to.be.equal(undefined);
        });

        it('min max object', (): void => {
            expect(fn(true)(min)).to.be.equal(undefined);
            expect(fn(true)({ min: path })).to.be.equal(undefined);
            expect(fn(true)(max)).to.be.equal(undefined);
            expect(fn(true)({ max: path })).to.be.equal(undefined);
            expect(fn(true)(minMax)).to.be.equal(undefined);
            expect(fn(true)({ min: path, max: path })).to.be.equal(undefined);
            expect(fn(true)({ ...min, max: path })).to.be.equal(undefined);
            expect(fn(true)({ ...max, min: path })).to.be.equal(undefined);
        });

        it('invalid values', (): void => {
            const throwingFunctions = [
                (): void => fn(false)(path),
                (): void => fn(true)(''),
                (): void => fn(true)({}),
                (): void => fn(true)({ min: true }),
                (): void => fn(true)({ max: false }),
                (): void => fn(true)({ min: 10, max: false }),
                (): void => fn(false)({ min: 10, max: path }),
            ];
            for (const throws of throwingFunctions) expect(throws).to.throw();
        });
    });

    describe('arrayOfPropertyNames', (): void => {
        const fn = schemaValidate.arrayOfPropertyNames(tName, mName);
        it('it should throw on non-array or empty array', (): void => {
            const nonArray = gen.oneOf<unknown>([
                gen.JSONPrimitive,
                gen.null,
                gen.undefined,
                gen.object({}),
            ]);
            check(
                property(
                    nonArray,
                    (value): void => {
                        expect((): void => fn(value)).to.throw();
                    },
                ),
            );
            expect((): void => fn([])).to.throw();
        });
        it('it should throw on invalid array element types', (): void => {
            const arr = [{}];
            expect((): void => fn(arr)).to.throw();
        });
        it('it should return undefined on valid value', (): void => {
            expect(fn(['key'])).to.be.equal(undefined);
        });
    });
});
