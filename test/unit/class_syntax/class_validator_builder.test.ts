import { expect } from 'chai';
import 'mocha';
import { ClassValidatorBuilder } from '../../../src/class_syntax/class_validator_builder';

interface TestClass {
    (...args: unknown[]): unknown;
    [k: string]: unknown;
}

function createClass(): TestClass {
    return function Test(): void {};
}

describe.only('ClassValidatorBuilder', (): void => {
    describe('.extract', (): void => {
        it('it should append ClassValidatorBuilder to a constructor if not present', (): void => {
            const Test = createClass();

            expect(Object.getOwnPropertySymbols(Test))
                .to.be.an('array')
                .that.have.lengthOf(0);
            const builder = ClassValidatorBuilder.extract(Test);

            const symbols = Object.getOwnPropertySymbols(Test);
            expect(symbols)
                .to.be.an('array')
                .that.have.lengthOf(1);

            const schema = Test[(symbols[0] as unknown) as string];
            expect(builder).to.be.equal(schema);

            expect(builder).to.have.all.keys(['schema', 'properties', 'defaults', 'transforms']);
            expect(builder).to.be.instanceOf(ClassValidatorBuilder);
        });
    });
});
