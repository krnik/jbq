import { expect } from 'chai';
import { instantiate } from '../../../src/class_syntax';
import { ClassValidatorBuilder } from '../../../src/class_syntax/class_validator_builder';

describe('Class Decorator', (): void => {
    describe('@instantiate', (): void => {
        it('it should mark class with ClassValidatorBuilder.shouldInstantiate', (): void => {
            @instantiate
            class Test {}

            expect(ClassValidatorBuilder.extract(Test).shouldCreateInstance()).to.be.equal(true);
        });
    });
});
