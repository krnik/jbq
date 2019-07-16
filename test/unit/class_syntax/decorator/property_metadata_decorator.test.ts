import { expect } from 'chai';
import { withDefault, transform, path, collectionOf, shape } from '../../../../src/class_syntax';
import { ValidatorBuilder } from '../../../../src/class_syntax/validator_builder';

describe('Property Metadata Decorators', (): void => {
    it('@withDefault should add default callback to property meta', (): void => {
        const def = (): boolean => true;
        class Test {
            @withDefault(def)
            public prop!: string;
        }

        const meta = ValidatorBuilder.extract(Test).getPropertyMetadata('prop');
        expect(meta.defaultFn).to.be.equal(def);
    });

    it('@transform should add transform callback to property meta', (): void => {
        const transformCallback = (): boolean => true;
        class Test {
            @transform(transformCallback)
            public prop!: string;
        }

        const meta = ValidatorBuilder.extract(Test).getPropertyMetadata('prop');
        expect(meta.transformFn).to.be.equal(transformCallback);
    });

    it('@path should add dataPath property to meta', (): void => {
        class Test {
            @path('someProperty')
            public prop!: string;
        }
        const meta = ValidatorBuilder.extract(Test).getPropertyMetadata('prop');
        expect(meta.dataPropertyPath).to.be.equal('someProperty');
    });

    it('@collectionOf should add proper metadata', (): void => {
        class Item {}
        class Test {
            @collectionOf(Item)
            public prop!: string;
        }
        const meta = ValidatorBuilder.extract(Test).getPropertyMetadata('prop');
        expect(meta.Constructor).to.be.equal(Item);
        expect(meta.isConstructorForItems).to.be.equal(true);
    });

    it('@shape shoould add proper metadata', (): void => {
        class Sub {}
        class Test {
            @shape(Sub)
            public prop!: string;
        }
        const meta = ValidatorBuilder.extract(Test).getPropertyMetadata('prop');
        expect(meta.Constructor).to.be.equal(Sub);
    });
});
