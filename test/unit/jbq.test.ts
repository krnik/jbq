import { expect } from 'chai';
import 'mocha';
import { SYM_SCHEMA_COLLECTION, SYM_TYPE_VALIDATE, TOKEN_BREAK, TYPE } from '../../src/constants';
import { jbq } from '../../src/core/jbq';
import { jbqTypes } from '../../src/main';
import { createTypes } from '../../src/types/main';
import { createData } from '../data/main';
import { schemasAny } from '../data/schemas/Any.schemas';
import { schemasArray } from '../data/schemas/Array.schemas';
import { schemasBoolean } from '../data/schemas/Boolean.schemas';
import { schemasNumber } from '../data/schemas/Number.schemas';
import { schemasObject } from '../data/schemas/Object.schemas';
import { schemasString } from '../data/schemas/String.schemas';
import { isErrJSON } from '../utils';

const schemas = {
    Any: schemasAny,
    Array: schemasArray,
    Boolean: schemasBoolean,
    Number: schemasNumber,
    Object: schemasObject,
    String: schemasString,
};

describe('Validator', () => {
    for (const type of Object.keys(schemas)) {
        type key = keyof typeof schemas;
        describe(type, () => {
            for (const { name, valid, schema } of schemas[type as key]) {
                const { Test } = jbq(jbqTypes, { Test: schema });
                const data = createData(schema);
                if (valid)
                    it(`VALID: ${name}`, () => {
                        expect(Test(data)).to.be.equal(undefined);
                    });
                else
                    it(`INVALID: ${name}`, () => {
                        isErrJSON(Test(data));
                    });
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
                        value: { min: 0, max: 1},
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
