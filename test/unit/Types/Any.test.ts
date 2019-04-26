import { expect } from 'chai';
import 'mocha';
import { REQUIRED, TYPE, TYPE_NAME } from '../../../src/constants';
import { TypeAny } from '../../../src/types/any';
import { ParseValues } from '../../../src/typings';

describe(
    TYPE_NAME.ANY,
    (): void => {
        describe(
            TYPE,
            (): void => {
                it('valid value', (): void => {
                    expect(TypeAny[TYPE]('', '')).to.be.equal(undefined);
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
