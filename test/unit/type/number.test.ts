import { expect } from 'chai';
import { check, gen, property } from 'testcheck';
import { MULTIPLE_OF, ONE_OF, TYPE, TYPE_NUMBER, VALUE } from '../../../src/misc/constants';
import { TypeNumber } from '../../../src/type/number';
import { isValidationError } from '../../utils';

describe(
    TYPE_NUMBER,
    (): void => {
        describe(
            TYPE,
            (): void => {
                const schemaValue = 'number';
                const { validator } = TypeNumber.getKeyword(TYPE);

                it('valid value', (): void => {
                    check(
                        property(
                            gen.number,
                            (value): void => {
                                expect(validator(schemaValue, value)).to.be.equal(undefined);
                            },
                        ),
                    );
                });

                it('invalid value', (): void => {
                    const nonNumber = gen.oneOf<unknown>([
                        gen.NaN,
                        gen.string,
                        gen.null,
                        gen.undefined,
                        gen.boolean,
                        gen.array(gen.boolean),
                    ]);
                    check(
                        property(
                            nonNumber,
                            (value): void => {
                                isValidationError(validator(schemaValue, value));
                            },
                        ),
                    );
                });
            },
        );

        describe(
            MULTIPLE_OF,
            (): void => {
                const schemaValue = 10;
                const { validator } = TypeNumber.getKeyword(MULTIPLE_OF);

                it('valid value', (): void => {
                    const value = 20;
                    expect(validator(schemaValue, value)).to.be.equal(undefined);
                });

                it('invalid value', (): void => {
                    const value = 12;
                    isValidationError(validator(schemaValue, value));
                });
            },
        );

        describe(
            ONE_OF,
            (): void => {
                const schemaValue = [2, 4, 6, 8];
                const { validator } = TypeNumber.getKeyword(ONE_OF);

                it('valid value', (): void => {
                    expect(validator(schemaValue, 2)).to.be.equal(undefined);
                });

                it('invalid value', (): void => {
                    isValidationError(validator(schemaValue, 0));
                });
            },
        );

        // TODO: Test macro.
        describe.skip(VALUE, (): void => {});
    },
);
