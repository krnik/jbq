import { SYM_TYPE_VALIDATE, TOKEN_BREAK, TYPE, SYM_SCHEMA_COLLECTION } from '../../src/constants';
import { jbq } from '../../src/core/jbq';
import { createTypes } from '../../src/types/main';
import { createData, schemas } from '../data/main';

interface IValidator {
    [k: string]: (x: any) => string | undefined;
}

export default () => describe('Validator', () => {
    const testData = {
        valid: createData(schemas.valid),
        invalid: createData(schemas.invalid),
    };
    for (const key of Object.keys(testData.valid))
        it(`valid value ${key}`, () => {
            const validator = jbq(createTypes(), schemas.valid);
            const res = (validator as IValidator)[key](testData.valid[key]);
            if (res) throw Error('it should not return error message');
        });
    for (const key of Object.keys(testData.invalid))
        it(`invalid value ${key}`, () => {
            const validator = jbq(createTypes(), schemas.invalid);
            const res = (validator as IValidator)[key](testData.invalid[key]);
            if (!res) throw Error('it should return error message');
        });

    describe(TOKEN_BREAK, () => {
        it('simple', () => {
            const stringNullable = {
                [TYPE] (_base: string, data: any) {
                    if (data === null) {
                        //{break}
                    }
                    if (typeof data !== 'string')
                        return 'Expected string type!';
                },
                [SYM_TYPE_VALIDATE]: {
                    [TYPE] (value: any) {
                        if (typeof value !== 'string')
                            throw new TypeError();
                    },
                },
            };
            const types = createTypes();
            types.set('stringNullable', stringNullable, { type: 'any' });
            const validator = jbq(types, {
                OptionalName: {
                    [TYPE]: 'stringNullable',
                },
            });
            if (validator.OptionalName(null)) throw new Error('Expected undefined');
            if (validator.OptionalName('Andrew')) throw new Error('Expected undefined');
            // @ts-ignore
            const expectUndef = validator.OptionalName();
            if (expectUndef === undefined) throw new Error('Expected to return error message');
        });
        it('collection', () => {
            const numericOrString = {
                // @ts-ignore
                [TYPE] (base: string, data: any) {
                    if (typeof data !== 'number') {
                        if (typeof data !== 'string')
                            return 'Expected numeric at: #{schemaPath}.';
                        //{break}
                    }
                },
                [SYM_TYPE_VALIDATE]: {
                    [TYPE] (value: any) {
                        if (typeof value !== 'string')
                            throw new TypeError();
                    },
                },
            };
            const types = createTypes();
            types.set('numeric', numericOrString, { type: 'number' });
            const validator = jbq(types, {
                ArrayOfNumerics: {
                    type: 'array',
                    [SYM_SCHEMA_COLLECTION]: {
                        type: 'numeric',
                        min: 0,
                        max: 1,
                    },
                },
            });
            const validValues = [
                [1, 0, '0', '1', '3', 'Yo'],
                [1, 0, '0', '1000'],
                [],
            ];
            const invalidValues = [
                [2, 0],
                ['1', true],
            ];
            for (const val of validValues)
                if (validator.ArrayOfNumerics(val))
                    throw new Error('Expected to pass');
            for (const val of invalidValues)
                if (validator.ArrayOfNumerics(val) === undefined)
                    throw new Error('Expected to return error message');
        });
    });
});
