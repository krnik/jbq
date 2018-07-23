import { SYM, TYPE_METHOD } from '../../constants';
import { types, Validator } from '../../index';
const { TYPE, MIN_LEN } = TYPE_METHOD;

export default () => describe('Validator', () => {
    describe('Primitive Values', () => {
        const pattern = {
            [SYM.FLAT]: true,
        };
        const cases = [
            ['string', 'A string value'],
            ['number', 1000],
            ['boolean', true],
        ];
        for (const [type, value] of cases)
            it(`it should validate ${type}`, () => {
                const v = new Validator(types, { Primitive: { [TYPE]: type, ...pattern } }, {});
                v.PrimitiveSync(value);
            });
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
            const v = new Validator(types, { Object: pattern }, {});
            v.ObjectSync({ firstname: 'my fistname', lastname: 'my lastname' });
        });
        // it(`it should validate object with ${SYM.OBJECT.toString()}`, () => {});
        // it(`it should validate object with ${SYM.COLLECTION.toString()}`, () => {});
        // it(`it should validate object with ${SYM.FLAT.toString()}`, () => {});
        // it(`it should validate object with ${SYM.FLAT.toString()} & ${SYM.OBJECT.toString()}`, () => {});
        // it(`it should validate object with ${SYM.FLAT.toString()} & ${SYM.COLLECTION.toString()}`, () => {});
    });
    describe('Iterables', () => {});
});
