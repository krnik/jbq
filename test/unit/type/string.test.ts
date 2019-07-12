import { expect } from 'chai';
import { check, gen, property } from 'testcheck';
import { LEN, ONE_OF, REGEX, TYPE, TYPE_STRING } from '../../../src/misc/constants';
import { TypeString } from '../../../src/type/string';
import { isValidationError } from '../../utils';

describe(
    TYPE_STRING,
    (): void => {
        describe(
            TYPE,
            (): void => {
                const schemaValue = 'string';
                const { validator } = TypeString.getKeyword(TYPE);

                it('valid value', (): void => {
                    check(
                        property(
                            gen.string,
                            (value): void => {
                                expect(validator(schemaValue, value)).to.be.equal(undefined);
                            },
                        ),
                    );
                });

                it('invalid value', (): void => {
                    const nonString = gen.oneOf<unknown>([
                        gen.number,
                        gen.null,
                        gen.undefined,
                        gen.object,
                        gen.array,
                    ]);
                    check(
                        property(
                            nonString,
                            (value): void => {
                                isValidationError(validator(schemaValue, value));
                            },
                        ),
                    );
                });
            },
        );

        describe(
            REGEX,
            (): void => {
                const schemaValue = /^Sho/i;
                const { validator } = TypeString.getKeyword(REGEX);

                it('valid value', (): void => {
                    const value = 'Short.';
                    expect(validator(schemaValue, value)).to.be.equal(undefined);
                });

                it('invalid value', (): void => {
                    const value = 'Long string with at least 10 characters.';
                    isValidationError(validator(schemaValue, value));
                });
            },
        );

        describe(
            ONE_OF,
            (): void => {
                const schemaValue = ['Admin', 'Manager', 'User', 'Guest'];
                const { validator } = TypeString.getKeyword(ONE_OF);

                it('valid value', (): void => {
                    expect(validator(schemaValue, 'Admin')).to.be.equal(undefined);
                });

                it('invalid value', (): void => {
                    isValidationError(validator(schemaValue, ''));
                });
            },
        );

        // TODO: Test macro.
        describe.skip(LEN, (): void => {});
    },
);
