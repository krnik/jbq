import { expect } from 'chai';
import 'mocha';
import { SYM_SCHEMA_COLLECTION, SYM_TYPE_VALIDATE, TOKEN_BREAK, TYPE } from '../../src/constants';
import { jbq } from '../../src/core/jbq';
import { jbqTypes } from '../../src/main';
import { createTypes } from '../../src/types/mod';
import { createData } from '../data/mod';
import { suitesAny } from '../data/suites/Any.suites';
import { suitesArray } from '../data/suites/Array.suites';
import { suitesBoolean } from '../data/suites/Boolean.suites';
import { suitesNumber } from '../data/suites/Number.suites';
import { suitesObject } from '../data/suites/Object.suites';
import { suitesString } from '../data/suites/String.suites';
import { isErrJSON } from '../utils';

const suites = {
    Any: suitesAny,
    Array: suitesArray,
    Boolean: suitesBoolean,
    Number: suitesNumber,
    Object: suitesObject,
    String: suitesString,
};

describe('Validator', () => {
    for (const type of Object.keys(suites)) {
        type key = keyof typeof suites;
        describe(type, () => {
            for (const { name, valid, schema } of suites[type as key]) {
                const { Test } = jbq(jbqTypes, { Test: schema });
                const { TestAsync } = jbq(jbqTypes, { TestAsync: schema }, { async: true });
                const data = createData(schema);
                if (valid) {
                    it(`VALID: ${name}`, () => {
                        expect(Test(data)).to.be.equal(undefined);
                    });
                    it(`VALID: ${name} - async`, async () => {
                        expect(await TestAsync(data)).to.be.equal(undefined);
                    });
                } else {
                    it(`INVALID: ${name}`, () => {
                        isErrJSON(Test(data));
                    });
                    it(`INVALID: ${name} - async`, async () => {
                        isErrJSON(await TestAsync(data));
                    });
                }
            }
        });
    }
    describe(TOKEN_BREAK, () => {
        it('simple', () => {
            const stringNullable = {
                [TYPE] (_base: string, $DATA: any) {
                    if ($DATA === null) {
                        //{break}
                    }
                    if (typeof $DATA !== 'string')
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
                [TYPE] (_base: string, $DATA: any) {
                    // tslint:disable-next-line:curly
                    if (typeof $DATA !== 'number') {
                        if (typeof $DATA !== 'string')
                            return 'Expected numeric at: {{schemaPath}}.';
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
                        value: { min: 0, max: 1 },
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
