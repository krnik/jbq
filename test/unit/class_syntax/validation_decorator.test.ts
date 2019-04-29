import { expect } from 'chai';
import 'mocha';
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
} from '../../../src/class_syntax';
import { ClassValidatorBuilder } from '../../../src/class_syntax/class_validator_builder';

describe.only('Validation Decorators', (): void => {
    const callback = (): true => true;
    const reg = /test/;
    const arr = [0];
    const testCases: [string, PropertyDecorator & ClassDecorator, string, unknown][] = [
        ['type', type('any'), 'type', 'any'],
        ['any', any, 'type', 'any'],
        ['array', array, 'type', 'array'],
        ['boolean', boolean, 'type', 'boolean'],
        ['number', number, 'type', 'number'],
        ['object', object, 'type', 'object'],
        ['string', string, 'type', 'string'],
        ['optional', optional, 'required', false],
        ['every', every(callback), 'every', callback],
        ['some', some(callback), 'some', callback],
        ['includes', includes(0), 'includes', 0],
        ['len', len(0), 'len', 0],
        ['value', value(0), 'value', 0],
        ['multipleOf', multipleOf(0), 'multipleOf', 0],
        ['regex', regex(reg), 'regex', reg],
        ['oneOf', oneOf(arr), 'oneOf', arr],
        ['keyCount', keyCount(0), 'keyCount', 0],
        ['propCount', propCount(0), 'propCount', 0],
        ['instanceOf', instanceOf(Array), 'instanceOf', Array],
        ['constructorName', constructorName('Array'), 'constructorName', 'Array'],
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

    it('schema', (): void => {});

    it('decoratorFactory', (): void => {});

    it('decoratorSubSchemaFactory', (): void => {});

    describe('shape', (): void => {});

    describe('collection', (): void => {});
});
