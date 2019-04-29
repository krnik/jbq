import { expect } from 'chai';
import { withDefault, transform } from '../../../src/class_syntax';
import { ClassValidatorBuilder } from '../../../src/class_syntax/class_validator_builder';

describe('Alteration Decorators', (): void => {
    describe('@withDefault', (): void => {
        it('it should add default callback to property meta', (): void => {
            const def = (): boolean => true;
            class Test {
                @withDefault(def)
                public prop!: string;
            }

            expect(
                ClassValidatorBuilder.extract(Test)
                    .getMeta()
                    .get('prop'),
            )
                .to.be.an('object')
                .that.have.property('default', def);
        });
    });

    describe('@transform', (): void => {
        it('it should add transform callback to property meta', (): void => {
            const transformCallback = (): boolean => true;
            class Test {
                @transform(transformCallback)
                public prop!: string;
            }

            expect(
                ClassValidatorBuilder.extract(Test)
                    .getMeta()
                    .get('prop'),
            )
                .to.be.an('object')
                .that.have.property('transform', transformCallback);
        });
    });
});
