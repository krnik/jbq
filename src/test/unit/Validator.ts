import { MIN_LEN, SYM_SCHEMA_COLLECTION, SYM_SCHEMA_FLAT, SYM_SCHEMA_OBJECT, TYPE } from '../../constants';
import { parser } from '../../core/Parser';
import { types, Validator } from '../../index';
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
        ] as [string, (string | boolean | number)][];
        for (const [type, value] of cases) {
            const schemas = { Primitive: { [TYPE]: type, ...pattern } };
            it(`it should validate ${type}`, () => {
                Validator.validateSync(parser(types, schemas, {}).Primitive, value);
                const res = new Validator(types, schemas, {}).PrimitiveSync(value);
                if (res[0]) throw 'Error should be undefined';
            });
            for (const value of (values.non as any)[type])
                it(`it should return error if value is not ${type}`, () => {
                    const res = new Validator(types, schemas, {}).PrimitiveSync(value);
                    res[0].should.be.an('object');
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
            const schemas = { Object: pattern };
            Validator.validateSync(parser(types, schemas, {}).Object, data);
            const res = new Validator(types, { Object: pattern }, {}).ObjectSync(data);
            if (res[0]) throw 'Error should be undefined';
        });
        it(`it should validate object with ${SYM_SCHEMA_OBJECT.toString()}`, () => {
            const data = createData(schemas);
            Validator.validateSync(parser(types, schemas, {}).Address, data.Address);
            const res = new Validator(types, schemas, {}).AddressSync(data.Address);
            if (res[0]) throw 'Error should be undefined';
        });
        it(`it should validate object with ${SYM_SCHEMA_COLLECTION.toString()}`, () => {
            const data = createData(schemas);
            Validator.validateSync(parser(types, schemas, {}).UserResources, data.UserResources);
            const res = new Validator(types, schemas, {}).UserResourcesSync(data.UserResources);
            if (res[0]) throw 'Error should be undefined';
        });
    });
    describe('Iterables', () => {
        it('it should validate iterable of primitives', () => {
            const data = createData(schemas);
            Validator.validateSync(parser(types, schemas, {}).User.files, data.User.files);
            const res = new Validator(types, schemas, {}).UserSync(data.UserSync);
            if (res[0]) throw 'Error should be undefined';
        });
        it('it should validate array of objects', () => {
            const data = createData(schemas);
            Validator.validateSync(parser(types, schemas, {}).UserResources.files, data.UserResources.files);
            const res = new Validator(types, schemas, {}).UserResourcesSync(data.UserResources);
            if (res[0]) throw 'Error should be undefined';
        });
    });
});
