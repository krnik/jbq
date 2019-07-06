import { expect } from 'chai';
import { SYM_SCHEMA_COLLECTION, TOKEN_BREAK, TYPE } from '../../../src/misc/constants';
import { jbq } from '../../../src/core/jbq';
import { createTypes, types } from '../../../src/type/mod';
import { createData } from '../../data/mod';
import { suitesAny } from '../../data/suites/any_suite';
import { suitesArray } from '../../data/suites/array_suite';
import { suitesBoolean } from '../../data/suites/boolean_suite';
import { suitesNumber } from '../../data/suites/number_suite';
import { suitesObject } from '../../data/suites/object_suite';
import { suitesString } from '../../data/suites/string_suite';
import { isValidationError } from '../../utils';
import { TypeInstance } from '../../../src/core/type_store/type_instance';

const suites = {
    Any: suitesAny,
    Array: suitesArray,
    Boolean: suitesBoolean,
    Number: suitesNumber,
    Object: suitesObject,
    String: suitesString,
};

describe('Validator', (): void => {
    for (const type of Object.keys(suites)) {
        type key = keyof typeof suites;
        describe(
            type,
            (): void => {
                for (const { name, valid, schema } of suites[type as key]) {
                    const { Test } = jbq(types, { Test: schema });
                    const { TestAsync } = jbq(types, { TestAsync: schema }, { async: true });
                    const data = createData(schema);
                    if (valid) {
                        it(`VALID: ${name}`, (): void => {
                            expect(Test(data)).to.be.equal(undefined);
                        });
                        it(`VALID: ${name} - async`, async (): Promise<void> => {
                            expect(await TestAsync(data)).to.be.equal(undefined);
                        });
                    } else {
                        it(`INVALID: ${name}`, (): void => {
                            isValidationError(Test(data));
                        });
                        it(`INVALID: ${name} - async`, async (): Promise<void> => {
                            isValidationError(await TestAsync(data));
                        });
                    }
                }
            },
        );
    }
    describe(
        TOKEN_BREAK,
        (): void => {
            it('simple', (): void => {
                const nullableString = new TypeInstance('NullableString').setKeyword(TYPE, {
                    schemaValidator(value: unknown): void {
                        if (typeof value !== 'string') throw new TypeError();
                    },
                    validator(_base: string, $DATA: unknown): undefined | string {
                        if ($DATA === null) {
                            //{break}
                        }
                        if (typeof $DATA !== 'string') return 'Expected string type!';
                    },
                });

                const typeStore = createTypes().addType(nullableString);
                const validator = jbq(typeStore, {
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

            it('collection', (): void => {
                const numericOrString = new TypeInstance('NumericOrString').setKeyword(TYPE, {
                    schemaValidator(value: unknown): void {
                        if (typeof value !== 'string') throw new TypeError();
                    },
                    validator(_base: string, $DATA: unknown): undefined | string {
                        if (typeof $DATA !== 'number') {
                            if (typeof $DATA !== 'string')
                                return 'Expected numeric at: {{schemaPath}}.';
                            //{break}
                        }
                    },
                });

                const typeStore = createTypes().addType(numericOrString);

                const validator = jbq(typeStore, {
                    ArrayOfNumerics: {
                        type: 'array',
                        [SYM_SCHEMA_COLLECTION]: {
                            type: 'numeric',
                            value: { min: 0, max: 1 },
                        },
                    },
                });

                const validValues = [[1, 0, '0', '1', '3', 'Yo'], [1, 0, '0', '1000'], []];
                const invalidValues = [[2, 0], ['1', true]];

                for (const val of validValues)
                    if (validator.ArrayOfNumerics(val)) throw new Error('Expected to pass');

                for (const val of invalidValues)
                    if (validator.ArrayOfNumerics(val) === undefined)
                        throw new Error('Expected to return error message');
            });
        },
    );
});
