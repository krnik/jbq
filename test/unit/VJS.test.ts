import { ATTR_BREAK, ATTR_PATH, SYM_SCHEMA_COLLECTION, SYM_TYPE_EXTERNAL, SYM_TYPE_VALIDATE, TYPE } from '../../src/constants';
import { VJS } from '../../src/core/VJS';
import { createTypes } from '../../src/types';
import { createData, schemas } from '../data/main';

interface IValidator {
    [k: string]: (x: any) => string | undefined;
}

export default () => describe('Validator', () => {
    const data = {
        valid: createData(schemas.valid),
        invalid: createData(schemas.invalid),
    };
    for (const key of Object.keys(data.valid))
        it(`valid value ${key}`, () => {
            const validator = VJS(createTypes(), schemas.valid);
            const res = (validator as IValidator)[key](data.valid[key]);
            if (res) throw Error('it should not return error message');
        });
    for (const key of Object.keys(data.invalid))
        it(`invalid value ${key}`, () => {
            const validator = VJS(createTypes(), schemas.invalid);
            const res = (validator as IValidator)[key](data.invalid[key]);
            if (!res) throw Error('it should return error message');
        });

    describe(ATTR_BREAK, () => {
        it('simple', () => {
            const stringNullable = {
                // @ts-ignore
                [TYPE] (base: string, data: any) {
                    if (data === null) {
                        //[break]
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
            types.set('stringNullable', stringNullable, 'any');
            const validator = VJS(types, {
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
                            return 'Expected numeric at: //[path].';
                        //[break]
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
            types.set('numeric', numericOrString, 'number');
            const validator = VJS(types, {
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

    describe(ATTR_PATH, () => {
        it('path interpolation', () => {
            const numeric = {
                // @ts-ignore
                [TYPE] (base: string, data: any) {
                    if (isNaN(parseInt(data, 10))) {
                        return '//[path]';
                    }
                },
                [SYM_TYPE_VALIDATE]: {
                    [TYPE] (value: any) {
                        if (typeof value !== 'string')
                            throw new Error('Expected string');
                    },
                },
            };
            const types = createTypes();
            types.set('numeric', numeric, 'any');
            const validator = VJS(types, {
                Numeric: {
                    [TYPE]: 'numeric',
                },
            });
            const path = validator.Numeric('sfalse');
            if (path !== 'NUMERIC#type') throw new Error('Expected NUMERIC#type');
        });
        it('pass path as a parameter to external method', () => {
            const numeric = {
                // @ts-ignore
                [TYPE] (base: string, path: string, data: any) {
                    if (isNaN(parseInt(data, 10))) {
                        return path;
                    }
                },
                [SYM_TYPE_EXTERNAL]: [TYPE],
                [SYM_TYPE_VALIDATE]: {
                    [TYPE] (value: any) {
                        if (typeof value !== 'string')
                            throw new Error('Expected string');
                    },
                },
            };
            const types = createTypes();
            types.set('numeric', numeric, 'any');
            const validator = VJS(types, {
                Numeric: {
                    [TYPE]: 'numeric',
                },
            });
            const path = validator.Numeric('sfalse');
            if (path !== 'NUMERIC#type') throw new Error('Expected NUMERIC#type');
        });
    });
});
