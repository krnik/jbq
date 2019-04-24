import { expect } from 'chai';
import 'mocha';
import { PROP_DATA_PATH } from '../../../src/constants';
import { schemaValidate } from '../../../src/types/schemaValidate';
import { values } from '../../data/mod';

describe('schemaValidate', () => {
    const tName = 'schemaValidate test';
    const mName = tName;
    describe('any', () => {
        const validateFn = schemaValidate.any(tName, mName);
        it('it should throw if argument is not provided', () => {
            expect(() => validateFn()).to.throw();
        });
        it('it should return undefined on any value', () => {
            for (const val of [1, true, '', {}, null, Symbol()])
                expect(validateFn(val)).to.be.equal(undefined);
        });
    });
    describe('arrayOf', () => {
        const validateFn = schemaValidate.arrayOf(tName, mName, 'string');
        it('it should throw if argument is not provided', () => {
            expect(() => validateFn()).to.throw();
        });
        it('it should throw on non-array value', () => {
            for (const val of values.non.array)
                expect(() => validateFn(val)).to.throw();
        });
        it('it should throw if array is empty', () => {
            expect(() => validateFn([])).to.throw();
        });
        it('it should throw if array elements are not of type', () => {
            const boundFn = schemaValidate.arrayOf.bind(undefined, tName, mName);
            const throwFns = [
                () => boundFn('array')([false]),
                () => boundFn('boolean')([1]),
                () => boundFn('number')([true]),
                () => boundFn('object')([false]),
                () => boundFn('string')([false]),
                () => boundFn('symbol')([false]),
            ];
            for (const fn of throwFns)
                expect(fn).to.throw();
        });
        it('it should return undefined on valid value', () => {
            const boundFn = schemaValidate.arrayOf.bind(undefined, tName, mName);
            const results = [
                boundFn('array')([[true]]),
                boundFn('boolean')([true]),
                boundFn('number')([1]),
                boundFn('object')([{}]),
                boundFn('string')(['false']),
                boundFn('symbol')([Symbol()]),
            ];
            for (const res of results)
                expect(res).to.be.equal(undefined);
        });
    });
    describe('dataPath', () => {
        it('it should return false if value is not a data path object', () => {
            const invalidValues = [
                true,
                {},
                { $dataPath: true },
                { $dataPath: [false] },
            ];
            for (const val of invalidValues)
                // @ts-ignore
                expect(schemaValidate.dataPath(val)).to.be.equal(false);
        });
        it('it should return true if value is a data path object', () => {
            const validValues = [
                { $dataPath: 'length' },
                { $dataPath: ['length', 'raw'] },
            ];
            for (const val of validValues)
                expect(schemaValidate.dataPath(val)).to.be.equal(true);
        });
    });
    describe('primitive', () => {
        const boundFn = schemaValidate.primitive.bind(undefined, tName, mName);
        it('it should throw if value does not match type', () => {
            const functions = [
                () => boundFn('boolean')(1),
                () => boundFn('number')(false),
                () => boundFn('string')(true),
                () => boundFn('symbol')(''),
            ];
            for (const fn of functions)
                expect(fn).to.throw();
        });
        it('it should return undefined if type matches', () => {
            const results = [
                boundFn('boolean')(true),
                boundFn('number')(1),
                boundFn('string')('false'),
                boundFn('symbol')(Symbol()),
            ];
            for (const res of results)
                expect(res).to.be.equal(undefined);
        });
        it('throw with acceptDataPath', () => {
            expect(() => boundFn('string', true)({ [PROP_DATA_PATH]: false })).to.throw();
        });
        it('valid value with acceptDataPath', () => {
            expect(boundFn('string', true)({ [PROP_DATA_PATH]: 'path' })).to.be.equal(undefined);
        });
    });
    describe('isInstance', () => {
        const fn = schemaValidate.isInstance(tName, mName, Array);
        it('it should throw on invalid values', () => {
            expect(() => fn({})).to.throw();
        });
        it('it should return undefined on matching values', () => {
            expect(fn([])).to.be.equal(undefined);
        });
    });
    describe('minMaxOrNumber', () => {
        const min = { min: 1 };
        const max = { max: 2 };
        const minMax = { min: 1, max: 2 };
        const path = { [PROP_DATA_PATH]: 'path/to/value' };
        const fn = schemaValidate.minMaxOrNumber.bind(undefined, tName, mName);
        it('valid number or dataPath', () => {
            expect(fn(true)(1)).to.be.equal(undefined);
            expect(fn(true)(path)).to.be.equal(undefined);
        });
        it('min max object', () => {
            expect(fn(true)(min)).to.be.equal(undefined);
            expect(fn(true)({ min: path })).to.be.equal(undefined);
            expect(fn(true)(max)).to.be.equal(undefined);
            expect(fn(true)({ max: path })).to.be.equal(undefined);
            expect(fn(true)(minMax)).to.be.equal(undefined);
            expect(fn(true)({ min: path, max: path })).to.be.equal(undefined);
            expect(fn(true)({ ...min, max: path })).to.be.equal(undefined);
            expect(fn(true)({ ...max, min: path })).to.be.equal(undefined);
        });
        it('invalid values', () => {
            const throwingFunctions = [
                () => fn(false)(path),
                () => fn(true)(''),
                () => fn(true)({}),
                () => fn(true)({ min: true }),
                () => fn(true)({ max: false }),
                () => fn(true)({ min: 10, max: false }),
                () => fn(false)({ min: 10, max: path }),
            ];
            for (const throws of throwingFunctions)
                expect(throws).to.throw();
        });
    });
    describe('arrayOfPropertyNames', () => {
        const fn = schemaValidate.arrayOfPropertyNames(tName, mName);
        it('it should throw on non-array or empty array', () => {
            for (const val of values.non.array)
                expect(() => fn(val)).to.throw();
            expect(() => fn([])).to.throw();
        });
        it('it should throw on invalid array element types', () => {
            const arr = [{}];
            expect(() => fn(arr)).to.throw();
        });
        it('it should return undefined on valid value', () => {
            expect(fn(['key'])).to.be.equal(undefined);
        });
    });
});
