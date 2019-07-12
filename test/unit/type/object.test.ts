import { expect } from 'chai';
import { check, gen, property } from 'testcheck';
import {
    CONSTRUCTOR_NAME,
    INSTANCE_OF,
    KEY_COUNT,
    PROPERTIES,
    PROP_COUNT,
    TYPE,
    TYPE_OBJECT,
} from '../../../src/misc/constants';
import { TypeObject } from '../../../src/type/object';
import { isValidationError } from '../../utils';

describe(
    TYPE_OBJECT,
    (): void => {
        describe(
            TYPE,
            (): void => {
                const schemaValue = 'object';
                const { validator } = TypeObject.getKeyword(TYPE);

                it('valid value', (): void => {
                    check(
                        property(
                            gen.object({}),
                            (value): void => {
                                expect(validator(schemaValue, value)).to.be.equal(undefined);
                            },
                        ),
                    );
                });

                it('invalid value', (): void => {
                    const nonObject = gen.oneOf<unknown>([
                        gen.number,
                        gen.string,
                        gen.null,
                        gen.undefined,
                        gen.array(gen.int),
                    ]);
                    check(
                        property(
                            nonObject,
                            (value): void => {
                                isValidationError(validator(schemaValue, value));
                            },
                        ),
                    );
                });
            },
        );

        describe(
            INSTANCE_OF,
            (): void => {
                const schemaValue = Array;
                const { validator } = TypeObject.getKeyword(INSTANCE_OF);

                it('valid value', (): void => {
                    const value = [1];
                    expect(validator(schemaValue, value)).to.be.equal(undefined);
                });

                it('invalid value', (): void => {
                    const value = {};
                    isValidationError(validator(schemaValue, value));
                });
            },
        );

        describe(
            CONSTRUCTOR_NAME,
            (): void => {
                const base = 'Array';
                const { validator } = TypeObject.getKeyword(CONSTRUCTOR_NAME);

                it('valid value', (): void => {
                    const value = [1];
                    expect(validator(base, value)).to.be.equal(undefined);
                });

                it('invalid value', (): void => {
                    const value = {};
                    isValidationError(validator(base, value));
                });
            },
        );

        describe(
            PROPERTIES,
            (): void => {
                const base = ['0', '1'];
                const { validator } = TypeObject.getKeyword(PROPERTIES);

                it('valid value', (): void => {
                    const value = {
                        0: 1,
                        1: 'nice, second index!',
                    };
                    expect(validator(base, value)).to.be.equal(undefined);
                });

                it('invalid value', (): void => {
                    const value = {};
                    isValidationError(validator(base, value));
                });
            },
        );

        // TODO: Test macro.
        describe.skip(PROP_COUNT, (): void => {});
        describe.skip(KEY_COUNT, (): void => {});
    },
);
