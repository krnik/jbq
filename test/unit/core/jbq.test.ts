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
import { ValidationResult } from '../../../src/core/jbq/jbq_typings';

const suites = {
    Any: suitesAny,
    Array: suitesArray,
    Boolean: suitesBoolean,
    Number: suitesNumber,
    Object: suitesObject,
    String: suitesString,
};

describe('JBQ', (): void => {
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
                const nullableString = new TypeInstance('nullable-string').setKeyword(TYPE, {
                    schemaValidator(value: unknown): void {
                        if (typeof value !== 'string') throw new TypeError();
                    },
                    validator(_base: string, $DATA: unknown): ValidationResult {
                        if ($DATA === null) {
                            //{break}
                        }
                        if (typeof $DATA !== 'string')
                            return {
                                message: 'Expected string type!',
                                path: '{{schemaPath}}',
                            };
                    },
                });

                const typeStore = createTypes().addType(nullableString);
                const validator = jbq(typeStore, {
                    OptionalName: {
                        [TYPE]: 'nullable-string',
                    },
                });

                expect(validator.OptionalName(null)).to.be.equal(undefined);
                expect(validator.OptionalName('Andrew')).to.be.equal(undefined);
                // @ts-ignore
                isValidationError(validator.OptionalName());
            });

            it('collection', (): void => {
                const numeric = new TypeInstance('numeric').setKeyword(TYPE, {
                    schemaValidator(value: unknown): void {
                        if (typeof value !== 'string') throw new TypeError();
                    },
                    validator(_base: string, $DATA: unknown): ValidationResult {
                        if (typeof $DATA !== 'number') {
                            if (typeof $DATA !== 'string')
                                return {
                                    message: 'Expected numeric at: {{schemaPath}}.',
                                    path: '{{schemaPath}}',
                                };
                            if (!/^\d+$/.test($DATA)) {
                                return {
                                    message: 'Value can contain only digits!',
                                    path: '{{schemaPath}}',
                                };
                            }
                            //{break}
                        }
                        if ($DATA !== $DATA)
                            return {
                                message: 'NaN is not valid numeric!',
                                path: '{{schemaPath}}',
                            };
                    },
                });

                const typeStore = createTypes().addType(numeric);

                const validator = jbq(typeStore, {
                    ArrayOfNumerics: {
                        type: 'array',
                        [SYM_SCHEMA_COLLECTION]: {
                            type: 'numeric',
                        },
                    },
                });

                const validValues = [
                    [1, 0, '0', '1', '3', '100'],
                    [1, 0, '0', '1000'],
                    ['100000000'],
                ];
                const invalidValues = [[2, 0, NaN], ['1', true]];

                for (const val of validValues)
                    expect(validator.ArrayOfNumerics(val)).to.be.equal(undefined);

                for (const val of invalidValues) isValidationError(validator.ArrayOfNumerics(val));
            });
        },
    );
});
