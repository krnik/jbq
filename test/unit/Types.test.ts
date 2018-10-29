import { expect } from 'chai';
import { CONSTRUCTOR_NAME, EVERY, INCLUDES, INSTANCE_OF, LEN, MAX, MAX_LEN, MIN, MIN_LEN, PROPERTIES, REGEX, REQUIRED, SOME, SYM_TYPE_VALIDATE, TYPE, TYPE_NAME, VALUE, MULTIPLY_OF } from '../../src/constants';
import { TypeAny } from '../../src/types/Any';
import { TypeArray } from '../../src/types/Array';
import { TypeBoolean } from '../../src/types/Boolean';
import { TypeNumber } from '../../src/types/Number';
import { TypeObject } from '../../src/types/Object';
import { TypeString } from '../../src/types/String';
import { TypeWrapper } from '../../src/types/Wrapper';
import { values } from '../data/main';

export default () => describe('Types', () => {
    describe(TYPE_NAME.ANY, () => {
        describe(TYPE, () => {
            const base = 'any';
            it('valid value', () => {
                expect(TypeAny[TYPE]()).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                expect(TypeArray[SYM_TYPE_VALIDATE][TYPE](base)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
                for (const value of values.non.string)
                    expect(() => TypeAny[SYM_TYPE_VALIDATE][TYPE](value)).to.throw();
            });
        });
        describe(REQUIRED, () => {
            const base = true;
            it('valid value', () => {
                const value = {};
                expect(TypeAny[REQUIRED](base, value)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                expect(TypeBoolean[SYM_TYPE_VALIDATE][VALUE](base)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
                for (const value of values.non.boolean)
                    expect(() => TypeBoolean[SYM_TYPE_VALIDATE][VALUE](value)).to.throw();
            });
        });
    });
    describe(TYPE_NAME.ARRAY, () => {
        describe(TYPE, () => {
            const base = 'array';
            it('valid value', () => {
                const data = [1, 2];
                expect(TypeArray[TYPE](base, data)).to.be.equal(undefined);
            });
            it('invalid value', () => {
                const value = {};
                expect(TypeArray[TYPE](base, value)).to.be.a('string');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                expect(TypeArray[SYM_TYPE_VALIDATE][TYPE](base)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
                for (const value of values.non.string)
                    expect(() => TypeArray[SYM_TYPE_VALIDATE][TYPE](value)).to.throw();
            });
        });
        describe(LEN, () => {
            const base = 2;
            it('valid value', () => {
                const value = [1, 2];
                expect(TypeArray[LEN](base, value)).to.be.equal(undefined);
            });
            it('invalid value', () => {
                const value: any[] = [];
                expect(TypeArray[LEN](base, value)).to.be.a('string');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                expect(TypeArray[SYM_TYPE_VALIDATE][LEN](base)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
                for (const value of values.non.number)
                    expect(() => TypeArray[SYM_TYPE_VALIDATE][LEN](value)).to.throw();
            });
        });
        describe(MAX_LEN, () => {
            const base = 10;
            it('valid value', () => {
                const value = new Array(9);
                expect(TypeArray[MAX_LEN](base, value)).to.be.equal(undefined);
            });
            it('invalid value', () => {
                const value = new Array(11);
                expect(TypeArray[MAX_LEN](base, value)).to.be.a('string');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                expect(TypeArray[SYM_TYPE_VALIDATE][MAX_LEN](base)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
                for (const value of values.non.number)
                expect(() => TypeArray[SYM_TYPE_VALIDATE][MAX_LEN](value)).to.throw();
            });
        });
        describe(MIN_LEN, () => {
            const base = 2;
            it('valid value', () => {
                const value = new Array(4);
                expect(TypeArray[MIN_LEN](base, value)).to.be.equal(undefined);
            });
            it('invalid value', () => {
                const value = new Array(1);
                expect(TypeArray[MIN_LEN](base, value)).to.be.a('string');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                expect(TypeArray[SYM_TYPE_VALIDATE][MIN_LEN](base)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
                for (const value of values.non.number)
                    expect(() => TypeArray[SYM_TYPE_VALIDATE][MIN_LEN](value)).to.throw();
            });
        });
        describe(INCLUDES, () => {
            const base = 10;
            it('valid value', () => {
                const value = [10, 20, 30];
                expect(TypeArray[INCLUDES](base, value)).to.be.equal(undefined);
            });
            it('invalid value', () => {
                const value = [0, 20, 30];
                expect(TypeArray[INCLUDES](base, value)).to.be.a('string');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                expect(TypeArray[SYM_TYPE_VALIDATE][INCLUDES](base)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
                expect(() => TypeArray[SYM_TYPE_VALIDATE][INCLUDES](undefined)).to.throw();
            });
        });
        describe(EVERY, () => {
            const base = (el: number) => typeof el === 'number';
            it('valid value', () => {
                const value = [10, 20, 30];
                expect(TypeArray[EVERY](base, value)).to.be.equal(undefined);
            });
            it('invalid value', () => {
                const value = [10, 20, '30'];
                expect(TypeArray[EVERY](base, value)).to.be.a('string');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                expect(TypeArray[SYM_TYPE_VALIDATE][EVERY](base)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
                for (const value of values.non.function)
                    expect(() => TypeArray[SYM_TYPE_VALIDATE][EVERY](value)).to.throw();
            });
        });
        describe(SOME, () => {
            const base = (el: number) => typeof el === 'number';
            it('valid value', () => {
                const value = [10, 20, 30];
                expect(TypeArray[SOME](base, value)).to.be.equal(undefined);
            });
            it('invalid value', () => {
                const value = ['10', '20', '30'];
                expect(TypeArray[SOME](base, value)).to.be.a('string');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                expect(TypeArray[SYM_TYPE_VALIDATE][SOME](base)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
                for (const value of values.non.function)
                    expect(() => TypeArray[SYM_TYPE_VALIDATE][SOME](value)).to.throw();
            });
        });
    });
    describe(TYPE_NAME.BOOLEAN, () => {
        describe(TYPE, () => {
            const base = 'boolean';
            it('valid value', () => {
                const value = false;
                expect(TypeBoolean[TYPE](base, value)).to.be.equal(undefined);
            });
            it('invalid value', () => {
                const value = {};
                expect(TypeBoolean[TYPE](base, value)).to.be.a('string');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                expect(TypeBoolean[SYM_TYPE_VALIDATE][TYPE](base)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
                for (const value of values.non.string)
                    expect(() => TypeBoolean[SYM_TYPE_VALIDATE][TYPE](value)).to.throw();
            });
        });
        describe(VALUE, () => {
            const base = false;
            it('valid value', () => {
                const value = false;
                expect(TypeBoolean[VALUE](base, value)).to.be.equal(undefined);
            });
            it('invalid value', () => {
                const value = true;
                expect(TypeBoolean[VALUE](base, value)).to.be.a('string');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                expect(TypeBoolean[SYM_TYPE_VALIDATE][VALUE](base)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
                for (const value of values.non.boolean)
                    expect(() => TypeBoolean[SYM_TYPE_VALIDATE][VALUE](value)).to.throw();
            });
        });
    });
    describe(TYPE_NAME.NUMBER, () => {
        describe(TYPE, () => {
            const base = 'number';
            it('valid value', () => {
                const value = 2;
                expect(TypeNumber[TYPE](base, value)).to.be.equal(undefined);
            });
            it('invalid value', () => {
                const value = NaN;
                expect(TypeNumber[TYPE](base, value)).to.be.a('string');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                expect(TypeNumber[SYM_TYPE_VALIDATE][TYPE](base)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
                for (const value of values.non.string)
                    expect(() => TypeNumber[SYM_TYPE_VALIDATE][TYPE](value)).to.throw();
            });
        });
        describe(MIN, () => {
            const base = 10;
            it('valid value', () => {
                const value = 100;
                expect(TypeNumber[MIN](base, value)).to.be.equal(undefined);
            });
            it('invalid value', () => {
                const value = 0;
                expect(TypeNumber[MIN](base, value)).to.be.a('string');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                expect(TypeNumber[SYM_TYPE_VALIDATE][MIN](base)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
                for (const value of values.non.number)
                    expect(() => TypeNumber[SYM_TYPE_VALIDATE][MIN](value)).to.throw();
            });
        });
        describe(MAX, () => {
            const base = 10;
            it('valid value', () => {
                const value = 0;
                expect(TypeNumber[MAX](base, value)).to.be.equal(undefined);
            });
            it('invalid value', () => {
                const value = 100;
                expect(TypeNumber[MAX](base, value)).to.be.a('string');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                expect(TypeNumber[SYM_TYPE_VALIDATE][MAX](base)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
                for (const value of values.non.number)
                    expect(() => TypeNumber[SYM_TYPE_VALIDATE][MAX](value)).to.throw();
            });
        });
        describe(MULTIPLY_OF, () => {
            const base = 10;
            it('valid value', () => {
                const value = 20;
                expect(TypeNumber[MULTIPLY_OF](base, value)).to.be.equal(undefined);
            });
            it('invalid value', () => {
                const value = 12;
                expect(TypeNumber[MULTIPLY_OF](base, value)).to.be.a('string');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                expect(TypeNumber[SYM_TYPE_VALIDATE][MULTIPLY_OF](base)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
                for (const value of values.non.number)
                    expect(() => TypeNumber[SYM_TYPE_VALIDATE][MULTIPLY_OF](value)).to.throw();
            });
        });
    });
    describe(TYPE_NAME.STRING, () => {
        describe(TYPE, () => {
            const base = 'string';
            it('valid value', () => {
                const value = '[1, 2]';
                expect(TypeString[TYPE](base, value)).to.be.equal(undefined);
            });
            it('invalid value', () => {
                const value = {};
                expect(TypeString[TYPE](base, value)).to.be.a('string');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                expect(TypeString[SYM_TYPE_VALIDATE][TYPE](base)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
                for (const value of values.non.string)
                    expect(() => TypeString[SYM_TYPE_VALIDATE][TYPE](value)).to.throw();
            });
        });
        describe(MIN_LEN, () => {
            const base = 10;
            it('valid value', () => {
                const value = 'Long string with at least 10 characters.';
                expect(TypeString[MIN_LEN](base, value)).to.be.equal(undefined);
            });
            it('invalid value', () => {
                const value = 'Short.';
                expect(TypeString[MIN_LEN](base, value)).to.be.a('string');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                expect(TypeString[SYM_TYPE_VALIDATE][MIN_LEN](base)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
                for (const value of values.non.number)
                    expect(() => TypeString[SYM_TYPE_VALIDATE][MIN_LEN](value)).to.throw();
            });
        });
        describe(MAX_LEN, () => {
            const base = 10;
            it('valid value', () => {
                const value = 'Short.';
                expect(TypeString[MAX_LEN](base, value)).to.be.equal(undefined);
            });
            it('invalid value', () => {
                const value = 'Long string with at least 10 characters.';
                expect(TypeString[MAX_LEN](base, value)).to.be.a('string');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                expect(TypeString[SYM_TYPE_VALIDATE][MAX_LEN](base)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
                for (const value of values.non.number)
                    expect(() => TypeString[SYM_TYPE_VALIDATE][MAX_LEN](value)).to.throw();
            });
        });
        describe(REGEX, () => {
            const base = /^Sho/i;
            it('valid value', () => {
                const value = 'Short.';
                expect(TypeString[REGEX](base, value)).to.be.equal(undefined);
            });
            it('invalid value', () => {
                const value = 'Long string with at least 10 characters.';
                expect(TypeString[REGEX](base, value)).to.be.a('string');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                expect(TypeString[SYM_TYPE_VALIDATE][REGEX](base)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
                for (const value of values.non.regex)
                    expect(() => TypeString[SYM_TYPE_VALIDATE][REGEX](value)).to.throw();
            });
        });
        describe(LEN, () => {
            const base = 10;
            it('valid value', () => {
                const value = 'Actually10';
                expect(TypeString[LEN](base, value)).to.be.equal(undefined);
            });
            it('invalid value', () => {
                const value = 'Long string with at least 10 characters.';
                expect(TypeString[LEN](base, value)).to.be.a('string');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                expect(TypeString[SYM_TYPE_VALIDATE][LEN](base)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
                for (const value of values.non.number)
                    expect(() => TypeString[SYM_TYPE_VALIDATE][LEN](value)).to.throw();
            });
        });
    });
    describe(TYPE_NAME.OBJECT, () => {
        describe(TYPE, () => {
            const base = 'object';
            it('valid value', () => {
                const value = {};
                expect(TypeObject[TYPE](base, value)).to.be.equal(undefined);
            });
            it('invalid value', () => {
                const value = true;
                expect(TypeObject[TYPE](base, value)).to.be.a('string');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                expect(TypeObject[SYM_TYPE_VALIDATE][TYPE](base)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
                for (const value of values.non.string)
                    expect(() => TypeObject[SYM_TYPE_VALIDATE][TYPE](value)).to.throw();
            });
        });
        describe(INSTANCE_OF, () => {
            const base = Array;
            it('valid value', () => {
                const value = [1];
                expect(TypeObject[INSTANCE_OF](base, value)).to.be.equal(undefined);
            });
            it('invalid value', () => {
                const value = {};
                expect(TypeObject[INSTANCE_OF](base, value)).to.be.a('string');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                expect(TypeObject[SYM_TYPE_VALIDATE][INSTANCE_OF](base)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
                for (const value of values.non.function)
                    expect(() => TypeObject[SYM_TYPE_VALIDATE][INSTANCE_OF](value)).to.throw();
            });
        });
        describe(CONSTRUCTOR_NAME, () => {
            const base = 'Array';
            it('valid value', () => {
                const value = [1];
                expect(TypeObject[CONSTRUCTOR_NAME](base, value)).to.be.equal(undefined);
            });
            it('invalid value', () => {
                const value = {};
                expect(TypeObject[CONSTRUCTOR_NAME](base, value)).to.be.a('string');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                expect(TypeObject[SYM_TYPE_VALIDATE][CONSTRUCTOR_NAME](base)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
                for (const value of values.non.string)
                    expect(() => TypeObject[SYM_TYPE_VALIDATE][CONSTRUCTOR_NAME](value)).to.throw();
            });
        });
        describe(PROPERTIES, () => {
            const base = ['0', '1'];
            it('valid value', () => {
                const value = {
                    0: 1,
                    1 : 'nice, second index!',
                };
                expect(TypeObject[PROPERTIES](base, value)).to.be.equal(undefined);
            });
            it('invalid value', () => {
                const value = {};
                expect(TypeObject[PROPERTIES](base, value)).to.be.a('string');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                expect(TypeObject[SYM_TYPE_VALIDATE][PROPERTIES](base)).to.be.equal(undefined);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, () => {
                const nonKeyValues = values.non.string.filter((e) => {
                    switch (typeof e) {
                    case 'string':
                    case 'number':
                    case 'symbol':
                        return true;
                    default:
                        return false;
                    }
                });
                for (const value of nonKeyValues)
                    expect(() => TypeObject[SYM_TYPE_VALIDATE][PROPERTIES](value)).to.throw();
            });
        });
    });
    describe('Wrapper', () => {
        describe('.set()', () => {
            it('It should accept valid type', () => {
                new TypeWrapper().set(TYPE_NAME.ARRAY, TypeArray);
            });
            it('It should throw an error when adding if type is already declared', () => {
                expect(() => {
                    new TypeWrapper()
                        .set(TYPE_NAME.ARRAY, TypeArray)
                        .set(TYPE_NAME.ARRAY, TypeBoolean);
                }).to.throw();
            });
            it('It should throw an error if type name to be set is not a string', () => {
                expect(() => new TypeWrapper().set(123 as any, TypeArray)).to.throw();
            });
            it('It should reject type that lacks schema validation method', () => {
                const customType: any = { method () { return; } };
                expect(() => new TypeWrapper().set('customType', customType)).to.throw();
            });
            it('It should throw an error when extending with non-existent type', () => {
                const customType = {
                    method () { return; },
                    [SYM_TYPE_VALIDATE]: {
                        method () { return; },
                    },
                };
                expect(() => {
                    new TypeWrapper()
                        .set(TYPE_NAME.ARRAY, TypeArray)
                        .set('customType', customType, TYPE_NAME.OBJECT);
                }).to.throw();
            });
            it('It should extend custom type with existing one', () => {
                const customType = {
                    method () { return; },
                    [SYM_TYPE_VALIDATE]: {
                        method () { return; },
                    },
                };
                const types = new TypeWrapper()
                    .set(TYPE_NAME.ARRAY, TypeArray)
                    .set('customType', customType, TYPE_NAME.ARRAY);
                const custom = types.get('customType')!;
                expect(custom).to.be.an('object');
                expect(custom).to.have.property('method');
                expect(custom[SYM_TYPE_VALIDATE].method).to.be.a('function');
                for (const key of Object.keys(TypeArray)) {
                    expect(custom[key]).to.be.an('function');
                    expect(custom[SYM_TYPE_VALIDATE][key]).to.be.an('function');
                }
            });
            it('It should extend types multiple times', () => {
                const customType = {
                    method () { return; },
                    [SYM_TYPE_VALIDATE]: {
                        method () { return; },
                    },
                };
                const anotherCustomType = {
                    anotherMethod () { return; },
                    [SYM_TYPE_VALIDATE]: {
                        anotherMethod () { return; },
                    },
                };
                const types = new TypeWrapper()
                    .set(TYPE_NAME.ARRAY, TypeArray)
                    .set('customType', customType, TYPE_NAME.ARRAY)
                    .set('anotherCustomType', anotherCustomType, 'customType');
                const anotherCustom = types.get('anotherCustomType')!;
                expect(anotherCustom).to.be.an('object');
                expect(anotherCustom).to.have.property('anotherMethod');
                expect(anotherCustom[SYM_TYPE_VALIDATE].anotherMethod).to.be.an('function');
                for (const key of ['method', ...Object.keys(TypeArray)]) {
                    expect(anotherCustom[key]).to.be.an('function');
                    expect(anotherCustom[SYM_TYPE_VALIDATE][key]).to.be.an('function');
                }
            });
        });
        describe('.has()', () => {
            it('It should return boolean', () => {
                const types = new TypeWrapper();
                types.set(TYPE_NAME.ARRAY, TypeArray);
                expect(types.has(TYPE_NAME.ARRAY)).to.be.equal(true);
                expect(types.has(TYPE_NAME.BOOLEAN)).to.be.equal(false);
            });
        });
        describe('.get()', () => {
            it('It should return type if it exists', () => {
                const types = new TypeWrapper().set(TYPE_NAME.ARRAY, TypeArray);
                expect(types.get(TYPE_NAME.ARRAY)).to.be.equal(TypeArray);
            });
            it('It should return undefined if type does not exists', () => {
                const types = new TypeWrapper();
                expect(types.get(TYPE_NAME.ARRAY)).to.be.equal(undefined);
            });
        });
    });
});
