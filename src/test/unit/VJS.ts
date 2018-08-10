import { MIN_LEN, SYM_SCHEMA_COLLECTION, SYM_SCHEMA_FLAT, SYM_SCHEMA_OBJECT, TYPE } from '../../constants';
import { parser } from '../../core/Parser';
import { VJS } from '../../core/VJS';
import { createTypes } from '../../types';
import { createData, schemas, values } from '../data';

export default () => describe('Validator', () => {
    describe('Primitive Values', () => {
        const pattern = {
            [SYM_SCHEMA_FLAT]: true,
        };
        const cases = [
            ['string', 'A string value'],
            ['number', 1000],
            ['boolean', true],
        ] as Array<[string, (string | boolean | number)]>;
        for (const [type, value] of cases) {
            const primitiveSchema = { Primitive: { [TYPE]: type, ...pattern } };
            it(`it should validate ${type}`, () => {
                VJS.validateSync(parser(createTypes(), primitiveSchema, {}).Primitive, value);
                const res = new VJS(createTypes(), primitiveSchema, {}).Primitive.validSync(value);
                if (res) throw Error('It should return undefined when validating valid value');
            });
            for (const failValue of (values.non as any)[type])
                it(`it should return error message if value is not ${type}`, () => {
                    const res = new VJS(createTypes(), primitiveSchema, {}).Primitive.validSync(failValue);
                    if (res === undefined)
                        throw Error('It should return error message when validating invalid value.');
                });
        }
    });
    describe('Objects', () => {
        it('it should validate an object', () => {
            const pattern = {
                firstname: {
                    [TYPE]: 'string',
                    [MIN_LEN]: 0,
                },
                lastname: {
                    [TYPE]: 'string',
                    [MIN_LEN]: 1,
                },
            };
            const data = { firstname: 'my fistname', lastname: 'my lastname' };
            VJS.validateSync(parser(createTypes(), { Object: pattern }, {}).Object, data);
            const res = new VJS(createTypes(), { Object: pattern }, {}).Object.validSync(data);
            if (res) throw Error('It should return undefined when validating valid value');
        });
        it(`it should validate object with ${SYM_SCHEMA_OBJECT.toString()}`, () => {
            const data = createData(schemas);
            VJS.validateSync(parser(createTypes(), schemas, {}).Address, data.Address);
            const res = new VJS(createTypes(), schemas, {}).Address.validSync(data.Address);
            if (res) throw Error('It should return undefined when validating valid value');
        });
        it(`it should validate object with ${SYM_SCHEMA_COLLECTION.toString()}`, () => {
            const data = createData(schemas);
            VJS.validateSync(parser(createTypes(), schemas, {}).UserResources, data.UserResources);
            const res = new VJS(createTypes(), schemas, {}).UserResources.validSync(data.UserResources);
            if (res) throw Error('It should return undefined when validating valid value');
        });
    });
    describe('Iterables', () => {
        it('it should validate iterable of primitives', () => {
            const data = createData(schemas);
            VJS.validateSync(parser(createTypes(), schemas, {}).User.files, data.User.files);
            const res = new VJS(createTypes(), schemas, {}).User.validSync(data.UserSync);
            if (res) throw Error('It should return undefined when validating valid value');
        });
        it('it should validate array of objects', () => {
            const data = createData(schemas);
            VJS.validateSync(parser(createTypes(), schemas, {}).UserResources.files, data.UserResources.files);
            const res = new VJS(createTypes(), schemas, {}).UserResources.validSync(data.UserResources);
            if (res) throw Error('It should return undefined when validating valid value');
        });
    });
});
