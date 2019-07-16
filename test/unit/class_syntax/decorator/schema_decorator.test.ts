import { expect } from 'chai';
import {
    any,
    array,
    boolean,
    constructorName,
    every,
    includes,
    instanceOf,
    keyCount,
    len,
    multipleOf,
    number,
    object,
    oneOf,
    optional,
    propCount,
    properties,
    regex,
    some,
    string,
    type,
    value,
    schemaDecoratorFactory,
} from '../../../../src/class_syntax';
import { ValidatorBuilder } from '../../../../src/class_syntax/validator_builder';
import { Schema } from '../../../../src/core/compilation/compilation_typings';
import { SYM_PROPERTIES } from '../../../../src/lib';
import {
    TYPE,
    TYPE_ANY,
    TYPE_ARRAY,
    TYPE_BOOLEAN,
    TYPE_NUMBER,
    TYPE_OBJECT,
    TYPE_STRING,
} from '../../../../src/misc/constants';
import { Some } from '../../../../src/misc/typings';
import { check, property, gen } from 'testcheck';

describe('Schema Decorators', (): void => {
    const callback = (): true => true;
    const reg = /test/;
    const arr = [0];
    const props = ['id'];

    const testCases: [string, PropertyDecorator, string, unknown][] = [
        ['@type', type(TYPE_ANY), TYPE, TYPE_ANY],
        ['@any', any, TYPE, TYPE_ANY],
        ['@array', array, TYPE, TYPE_ARRAY],
        ['@boolean', boolean, TYPE, TYPE_BOOLEAN],
        ['@number', number, TYPE, TYPE_NUMBER],
        ['@object', object, TYPE, TYPE_OBJECT],
        ['@string', string, TYPE, TYPE_STRING],
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
        ['@properties', properties(props), 'properties', props],
    ];

    for (const [testName, decorator, schemaKey, schemaValue] of testCases) {
        it(`decorator ${testName} should assign propert schema keyword`, (): void => {
            class Test {
                @decorator
                public prop!: unknown;
            }

            const builder = ValidatorBuilder.extract(Test);
            const { schema } = builder.getMeta()[0];
            builder.buildSchema();

            expect(
                (schema[SYM_PROPERTIES] as Some<Schema[typeof SYM_PROPERTIES]>).prop[schemaKey],
            ).to.be.deep.equal(schemaValue);
        });
    }

    describe('schemaKeywordDecoratorFactory', (): void => {
        it('it should property set provided keywords to schema', (): void => {
            check(
                property(
                    gen.string,
                    gen.primitive,
                    (schemaKey: string, schemaValue: unknown): void => {
                        const decorator = schemaDecoratorFactory(schemaKey)(schemaValue);
                        class Test {
                            @decorator
                            public prop!: unknown;
                        }
                        const builder = ValidatorBuilder.extract(Test);
                        const { schema } = builder.getMeta()[0];
                        builder.buildSchema();

                        expect(
                            (schema[SYM_PROPERTIES] as Some<Schema[typeof SYM_PROPERTIES]>).prop[
                                schemaKey
                            ],
                        ).to.be.deep.equal(schemaValue);
                    },
                ),
            );
        });
    });
});
