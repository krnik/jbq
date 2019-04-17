import { expect } from 'chai';
import 'mocha';
import { REQUIRED, TYPE, TYPE_NAME } from '../../../src/constants';
import { TypeAny } from '../../../src/types/Any';
import { ParseValues } from '../../../src/typings';

describe(TYPE_NAME.ANY, () => {
    describe(TYPE, () => {
        it('valid value', () => {
            expect(TypeAny[TYPE]('', '')).to.be.equal(undefined);
        });
    });
    describe(REQUIRED, () => {
        it('valid value', () => {
            const value = { schemaValue: true } as ParseValues;
            const onTrue = TypeAny[REQUIRED](value);
            value.schemaValue = false;
            const onFalse = TypeAny[REQUIRED](value);
            expect(onTrue).to.be.a('string');
            expect(onFalse).to.be.a('string');
            expect(onTrue).to.not.be.equal(onFalse);
        });
        it('invalid value', () => {
            const value = undefined;
            // @ts-ignore
            expect(() => TypeAny[REQUIRED](value)).to.throw();
        });
    });
});
