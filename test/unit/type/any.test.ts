import { expect } from 'chai';
import { REQUIRED, TYPE, TYPE_NAME } from '../../../src/misc/constants';
import { TypeAny } from '../../../src/type/any';
import { ParseValues } from '../../../src/misc/typings';
import { check, property, gen } from 'testcheck';

describe(
    TYPE_NAME.ANY,
    (): void => {
        describe(
            TYPE,
            (): void => {
                it('valid value', (): void => {
                    check(
                        property(
                            gen.JSONPrimitive,
                            (value): void => {
                                expect(TypeAny[TYPE]('any', value)).to.be.equal(undefined);
                            },
                        ),
                    );
                });
            },
        );
        describe(
            REQUIRED,
            (): void => {
                it('valid value', (): void => {
                    const value: ParseValues = ({ schemaValue: true } as unknown) as ParseValues;
                    const onTrue = TypeAny[REQUIRED](value);
                    value.schemaValue = false;
                    const onFalse = TypeAny[REQUIRED](value);
                    expect(onTrue).to.be.a('string');
                    expect(onFalse).to.be.a('string');
                    expect(onTrue).to.not.be.equal(onFalse);
                });
                it('invalid value', (): void => {
                    const value = undefined;
                    expect(
                        (): string => TypeAny[REQUIRED]((value as unknown) as ParseValues),
                    ).to.throw();
                });
            },
        );
    },
);
