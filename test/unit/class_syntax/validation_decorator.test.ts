import { expect } from 'chai';
import {
    type,
    any,
    array,
    boolean,
    number,
    object,
    string,
    optional,
    every,
    some,
    includes,
    len,
    value,
    multipleOf,
    regex,
    oneOf,
    keyCount,
    propCount,
    instanceOf,
    constructorName,
    schema,
    decoratorFactory,
} from '../../../src/class_syntax';
import { ClassValidatorBuilder } from '../../../src/class_syntax/class_validator_builder';
import { check, property, gen } from 'testcheck';
import { TYPE, TYPE_NAME } from '../../../src/misc/constants';

describe('Validation Decorators', (): void => {
    const callback = (): true => true;
    const reg = /test/;
    const arr = [0];
    const testCases: [string, PropertyDecorator & ClassDecorator, string, unknown][] = [
        ['@type', type(TYPE_NAME.ANY), TYPE, TYPE_NAME.ANY],
        ['@any', any, TYPE, TYPE_NAME.ANY],
        ['@array', array, TYPE, TYPE_NAME.ARRAY],
        ['@boolean', boolean, TYPE, TYPE_NAME.BOOLEAN],
        ['@number', number, TYPE, TYPE_NAME.NUMBER],
        ['@object', object, TYPE, TYPE_NAME.OBJECT],
        ['@string', string, TYPE, TYPE_NAME.STRING],
        ['@optional', optional, 'required', false],
        ['@every', every(callback), 'every', callback],
        ['@some', some(callback), 'some', callback],
        ['@includes', includes(0), 'includes', 0],
        ['@len', len(0), 'len', 0],
        ['@value', value(0), 'value', 0],
        ['@multipleOf', multipleOf(0), 'multipleOf', 0],
        ['@regex', regex(reg), 'regex', reg],
        ['@oneOf', oneOf(arr), 'oneOf', arr],
        ['@keyCount', keyCount(0), 'keyCount', 0],
        ['@propCount', propCount(0), 'propCount', 0],
        ['@instanceOf', instanceOf(Array), 'instanceOf', Array],
        ['@constructorName', constructorName('Array'), 'constructorName', 'Array'],
    ];

    for (const [name, decor, key, value] of testCases) {
        it(
            name,
            (): void => {
                @decor
                class Test {
                    @decor
                    public prop!: unknown;
                }

                const builder = ClassValidatorBuilder.extract(Test);
                expect(builder.getSchema()).to.have.property(key, value);
                expect(builder['getSubSchemas']()['prop']).to.have.property(key, value);
            },
        );
    }

    it('decoratorFactory', (): void => {
        check(
            property(
                gen.string,
                gen.primitive,
                (key, value): void => {
                    const decor = decoratorFactory(key)(value);

                    @decor
                    class Test {
                        @decor
                        public prop!: unknown;
                    }

                    const builder = ClassValidatorBuilder.extract(Test);
                    expect(builder.getSchema()).to.have.property(key, value);
                    expect(builder['getSubSchemas']()['prop']).to.have.property(key, value);
                },
            ),
        );
    });

    describe('@schema', (): void => {
        const def = { type: 'string', len: 10, [Symbol.for('test')]: true };
        it('as class validator it should append to the root', (): void => {
            @schema(def)
            class Test {}

            const root = ClassValidatorBuilder.extract(Test).getSchema();
            for (const [key, value] of Object.entries(def))
                expect(root).to.have.property(key, value);
        });

        it('as property decorator it should append to the property', (): void => {
            class Test {
                @schema(def)
                public name!: string;
            }

            const root = ClassValidatorBuilder.extract(Test)['getSubSchemas']()['name'];
            for (const [key, value] of Object.entries(def))
                expect(root).to.have.property(key, value);
        });
    });

    describe.skip('@shape', (): void => {});

    describe.skip('@collection', (): void => {});
});
