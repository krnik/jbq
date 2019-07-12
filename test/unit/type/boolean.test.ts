import { expect } from 'chai';
import { check, gen, property } from 'testcheck';
import { TYPE, VALUE, TYPE_BOOLEAN } from '../../../src/misc/constants';
import { TypeBoolean } from '../../../src/type/boolean';
import { isValidationError } from '../../utils';

describe(
    TYPE_BOOLEAN,
    (): void => {
        describe(
            TYPE,
            (): void => {
                const schemaValue = 'boolean';
                const { validator } = TypeBoolean.getKeyword(TYPE);

                it('valid value', (): void => {
                    check(
                        property(
                            gen.boolean,
                            (value): void => {
                                expect(validator(schemaValue, value)).to.be.equal(undefined);
                            },
                        ),
                    );
                });

                it('invalid value', (): void => {
                    const nonBool = gen.oneOf<unknown>([
                        gen.number,
                        gen.string,
                        gen.null,
                        gen.undefined,
                        gen.object({ x: gen.boolean }),
                        gen.array(gen.boolean),
                    ]);
                    check(
                        property(
                            nonBool,
                            (value): void => {
                                isValidationError(validator(schemaValue, value));
                            },
                        ),
                    );
                });
            },
        );

        describe(
            VALUE,
            (): void => {
                const schemaValue = false;
                const { validator } = TypeBoolean.getKeyword(VALUE);

                it('valid value', (): void => {
                    const value = false;
                    expect(validator(schemaValue, value)).to.be.equal(undefined);
                });

                it('invalid value', (): void => {
                    const value = true;
                    isValidationError(validator(schemaValue, value));
                });
            },
        );
    },
);
