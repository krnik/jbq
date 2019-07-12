import { REQUIRED, TYPE, TYPE_ANY } from '../../../src/misc/constants';

describe(
    TYPE_ANY,
    (): void => {
        describe.skip(
            TYPE,
            (): void => {
                it('valid value', (): void => {
                    // check(
                    //     property(
                    //         gen.JSONPrimitive,
                    //         (value): void => {
                    //             expect(validator(value)).to.be.equal(undefined);
                    //         },
                    //     ),
                    // );
                });
            },
        );
        describe.skip(
            REQUIRED,
            (): void => {
                it('valid value', (): void => {
                    // const value: ParseValues = ({ schemaValue: true } as unknown) as ParseValues;
                    // const onTrue = TypeAny[REQUIRED](value);
                    // value.schemaValue = false;
                    // const onFalse = TypeAny[REQUIRED](value);
                    // expect(onTrue).to.be.a('string');
                    // expect(onFalse).to.be.a('string');
                    // expect(onTrue).to.not.be.equal(onFalse);
                });
                it('invalid value', (): void => {
                    // const value = undefined;
                    // expect(
                    //     (): string => TypeAny[REQUIRED]((value as unknown) as ParseValues),
                    // ).to.throw();
                });
            },
        );
    },
);
