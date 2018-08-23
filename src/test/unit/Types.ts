import { CONSTRUCTOR_NAME, EVERY, INCLUDES, INSTANCE_OF, LEN, MAX, MAX_LEN, MIN, MIN_LEN, PROPERTIES, REGEX, REQUIRED, SOME, SYM_TYPE_VALIDATE, TYPE, TYPE_NAME, VALUE } from '../../constants';
import { TypeAny } from '../../types/Any';
import { TypeArray } from '../../types/Array';
import { TypeBoolean } from '../../types/Boolean';
import { TypeNumber } from '../../types/Number';
import { TypeObject } from '../../types/Object';
import { TypeString } from '../../types/String';
import { TypeWrapper } from '../../types/Wrapper';
import { values } from '../data/index.js';

export default () => describe('Types', () => {
    describe(TYPE_NAME.ANY, () => {
        describe(TYPE, () => {
            const base = 'any';
            it('valid value', () => {
                TypeAny[TYPE]();
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                TypeArray[SYM_TYPE_VALIDATE][TYPE](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, (done) => {
                for (const value of values.non.string)
                    try {
                        TypeArray[SYM_TYPE_VALIDATE][TYPE](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                done();
            });
        });
        describe(REQUIRED, () => {
            const base = true;
            it('valid value', () => {
                const value = {};
                TypeAny[REQUIRED](base, value);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                TypeBoolean[SYM_TYPE_VALIDATE][VALUE](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, (done) => {
                for (const value of values.non.boolean)
                    try {
                        TypeBoolean[SYM_TYPE_VALIDATE][VALUE](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                done();
            });
        });
    });
    describe(TYPE_NAME.ARRAY, () => {
        describe(TYPE, () => {
            const base = 'array';
            it('valid value', () => {
                const data = [1, 2];
                if (TypeArray[TYPE](base, data) !== undefined)
                    throw Error('It should return undefined when validating valid value');
            });
            it('invalid value', () => {
                const value = {};
                if (TypeArray[TYPE](base, value) === undefined)
                    throw Error('It should return error message when validating invalid value.');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                TypeArray[SYM_TYPE_VALIDATE][TYPE](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, (done) => {
                for (const value of values.non.string)
                    try {
                        TypeArray[SYM_TYPE_VALIDATE][TYPE](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                done();
            });
        });
        describe(LEN, () => {
            const base = 2;
            it('valid value', () => {
                const value = [1, 2];
                if (TypeArray[LEN](base, value) !== undefined)
                    throw Error('It should return undefined when validating valid value.');
            });
            it('invalid value', () => {
                const value: any[] = [];
                if (TypeArray[LEN](base, value) === undefined)
                    throw Error('It should return error message when validating invalid value.');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                TypeArray[SYM_TYPE_VALIDATE][LEN](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, (done) => {
                for (const value of values.non.number)
                    try {
                        TypeArray[SYM_TYPE_VALIDATE][LEN](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                done();
            });
        });
        describe(MAX_LEN, () => {
            const base = 10;
            it('valid value', () => {
                const value = new Array(9);
                if (TypeArray[MAX_LEN](base, value) !== undefined)
                    throw Error('It should return undefined when validating valid value.');
            });
            it('invalid value', () => {
                const value = new Array(11);
                if (TypeArray[MAX_LEN](base, value) === undefined)
                    throw Error('It should return error message when validating invalid value.');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                TypeArray[SYM_TYPE_VALIDATE][MAX_LEN](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, (done) => {
                for (const value of values.non.number)
                    try {
                        TypeArray[SYM_TYPE_VALIDATE][MAX_LEN](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                done();
            });
        });
        describe(MIN_LEN, () => {
            const base = 2;
            it('valid value', () => {
                const value = new Array(4);
                if (TypeArray[MIN_LEN](base, value) !== undefined)
                    throw Error('It should return undefined when validating valid value.');
            });
            it('invalid value', () => {
                const value = new Array(1);
                if (TypeArray[MIN_LEN](base, value) === undefined)
                    throw Error('It should return error message when validating invalid value.');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                TypeArray[SYM_TYPE_VALIDATE][MIN_LEN](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, (done) => {
                for (const value of values.non.number)
                    try {
                        TypeArray[SYM_TYPE_VALIDATE][MIN_LEN](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                done();
            });
        });
        describe(INCLUDES, () => {
            const base = 10;
            it('valid value', () => {
                const value = [10, 20, 30];
                if (TypeArray[INCLUDES](base, value) !== undefined)
                    throw Error('It should return undefined when validating valid value.');
            });
            it('invalid value', () => {
                const value = [0, 20, 30];
                if (TypeArray[INCLUDES](base, value) === undefined)
                    throw Error('It should return error message when validating invalid value.');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                TypeArray[SYM_TYPE_VALIDATE][INCLUDES](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, (done) => {
                try {
                    TypeArray[SYM_TYPE_VALIDATE][INCLUDES](undefined);
                    done(`Should throw an error for ${undefined}`);
                } catch (err) {
                    err.should.have.property('message');
                }
                done();
            });
        });
        describe(EVERY, () => {
            const base = (el: number) => typeof el === 'number';
            it('valid value', () => {
                const value = [10, 20, 30];
                if (TypeArray[EVERY](base, value) !== undefined)
                    throw Error('It should return undefined when validating valid value.');
            });
            it('invalid value', () => {
                const value = [10, 20, '30'];
                if (TypeArray[EVERY](base, value) === undefined)
                    throw Error('It should return error message when validating invalid value.');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                TypeArray[SYM_TYPE_VALIDATE][EVERY](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, (done) => {
                for (const value of values.non.function)
                    try {
                        TypeArray[SYM_TYPE_VALIDATE][EVERY](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                done();
            });
        });
        describe(SOME, () => {
            const base = (el: number) => typeof el === 'number';
            it('valid value', () => {
                const value = [10, 20, 30];
                if (TypeArray[SOME](base, value) !== undefined)
                    throw Error('It should return undefined when validating valid value.');
            });
            it('invalid value', () => {
                const value = ['10', '20', '30'];
                if (TypeArray[SOME](base, value) === undefined)
                    throw Error('It should return error message when validating invalid value.');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                TypeArray[SYM_TYPE_VALIDATE][SOME](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, (done) => {
                for (const value of values.non.function)
                    try {
                        TypeArray[SYM_TYPE_VALIDATE][SOME](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                done();
            });
        });
    });
    describe(TYPE_NAME.BOOLEAN, () => {
        describe(TYPE, () => {
            const base = 'boolean';
            it('valid value', () => {
                const value = false;
                if (TypeBoolean[TYPE](base, value) !== undefined)
                    throw Error('It should return undefined when validating valid value');
            });
            it('invalid value', () => {
                const value = {};
                if (TypeBoolean[TYPE](base, value) === undefined)
                    throw Error('It should return error message when validating invalid value.');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                TypeBoolean[SYM_TYPE_VALIDATE][TYPE](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, (done) => {
                for (const value of values.non.string)
                    try {
                        TypeBoolean[SYM_TYPE_VALIDATE][TYPE](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                done();
            });
        });
        describe(VALUE, () => {
            const base = false;
            it('valid value', () => {
                const value = false;
                if (TypeBoolean[VALUE](base, value) !== undefined)
                    throw Error('It should return undefined when validating valid value.');
            });
            it('invalid value', () => {
                const value = true;
                if (TypeBoolean[VALUE](base, value) === undefined)
                    throw Error('It should return error message when validating invalid value.');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                TypeBoolean[SYM_TYPE_VALIDATE][VALUE](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, (done) => {
                for (const value of values.non.boolean)
                    try {
                        TypeBoolean[SYM_TYPE_VALIDATE][VALUE](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                done();
            });
        });
    });
    describe(TYPE_NAME.NUMBER, () => {
        describe(TYPE, () => {
            const base = 'number';
            it('valid value', () => {
                const value = 2;
                if (TypeNumber[TYPE](base, value) !== undefined)
                    throw Error('It should return undefined when validating valid value');
            });
            it('invalid value', () => {
                const value = {};
                if (TypeNumber[TYPE](base, value) === undefined)
                    throw Error('It should return error message when validating invalid value.');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                TypeNumber[SYM_TYPE_VALIDATE][TYPE](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, (done) => {
                for (const value of values.non.string)
                    try {
                        TypeNumber[SYM_TYPE_VALIDATE][TYPE](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                done();
            });
        });
        describe(MIN, () => {
            const base = 10;
            it('valid value', () => {
                const value = 100;
                if (TypeNumber[MIN](base, value) !== undefined)
                    throw Error('It should return undefined when validating valid value.');
            });
            it('invalid value', () => {
                const value = 0;
                if (TypeNumber[MIN](base, value) === undefined)
                    throw Error('It should return error message when validating invalid value.');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                TypeNumber[SYM_TYPE_VALIDATE][MIN](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, (done) => {
                for (const value of values.non.number)
                    try {
                        TypeNumber[SYM_TYPE_VALIDATE][MIN](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                done();
            });
        });
        describe(MAX, () => {
            const base = 10;
            it('valid value', () => {
                const value = 0;
                if (TypeNumber[MAX](base, value) !== undefined)
                    throw Error('It should return undefined when validating valid value.');
            });
            it('invalid value', () => {
                const value = 100;
                if (TypeNumber[MAX](base, value) === undefined)
                    throw Error('It should return error message when validating invalid value.');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                TypeNumber[SYM_TYPE_VALIDATE][MAX](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, (done) => {
                for (const value of values.non.number)
                    try {
                        TypeNumber[SYM_TYPE_VALIDATE][MAX](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                done();
            });
        });
    });
    describe(TYPE_NAME.STRING, () => {
        describe(TYPE, () => {
            const base = 'string';
            it('valid value', () => {
                const value = '[1, 2]';
                if (TypeString[TYPE](base, value) !== undefined)
                    throw Error('It should return undefined when validating valid value');
            });
            it('invalid value', () => {
                const value = {};
                if (TypeString[TYPE](base, value) === undefined)
                    throw Error('It should return error message when validating invalid value.');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                TypeString[SYM_TYPE_VALIDATE][TYPE](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, (done) => {
                for (const value of values.non.string)
                    try {
                        TypeString[SYM_TYPE_VALIDATE][TYPE](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                done();
            });
        });
        describe(MIN_LEN, () => {
            const base = 10;
            it('valid value', () => {
                const value = 'Long string with at least 10 characters.';
                if (TypeString[MIN_LEN](base, value) !== undefined)
                    throw Error('It should return undefined when validating valid value.');
            });
            it('invalid value', () => {
                const value = 'Short.';
                if (TypeString[MIN_LEN](base, value) === undefined)
                    throw Error('It should return error message when validating invalid value.');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                TypeString[SYM_TYPE_VALIDATE][MIN_LEN](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, (done) => {
                for (const value of values.non.number)
                    try {
                        TypeString[SYM_TYPE_VALIDATE][MIN_LEN](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                done();
            });
        });
        describe(MAX_LEN, () => {
            const base = 10;
            it('valid value', () => {
                const value = 'Short.';
                if (TypeString[MAX_LEN](base, value) !== undefined)
                    throw Error('It should return undefined when validating valid value.');
            });
            it('invalid value', () => {
                const value = 'Long string with at least 10 characters.';
                if (TypeString[MAX_LEN](base, value) === undefined)
                    throw Error('It should return error message when validating invalid value.');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                TypeString[SYM_TYPE_VALIDATE][MAX_LEN](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, (done) => {
                for (const value of values.non.number)
                    try {
                        TypeString[SYM_TYPE_VALIDATE][MAX_LEN](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                done();
            });
        });
        describe(REGEX, () => {
            const base = /^Sho/i;
            it('valid value', () => {
                const value = 'Short.';
                if (TypeString[REGEX](base, value) !== undefined)
                    throw Error('It should return undefined when validating valid value.');
            });
            it('invalid value', () => {
                const value = 'Long string with at least 10 characters.';
                if (TypeString[REGEX](base, value) === undefined)
                    throw Error('It should return error message when validating invalid value.');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                TypeString[SYM_TYPE_VALIDATE][REGEX](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, (done) => {
                for (const value of values.non.regex)
                    try {
                        TypeString[SYM_TYPE_VALIDATE][REGEX](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                done();
            });
        });
        describe(LEN, () => {
            const base = 10;
            it('valid value', () => {
                const value = 'Actually10';
                if (TypeString[LEN](base, value) !== undefined)
                    throw Error('It should return undefined when validating valid value.');
            });
            it('invalid value', () => {
                const value = 'Long string with at least 10 characters.';
                if (TypeString[LEN](base, value) === undefined)
                    throw Error('It should return error message when validating invalid value.');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                TypeString[SYM_TYPE_VALIDATE][LEN](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, (done) => {
                for (const value of values.non.number)
                    try {
                        TypeString[SYM_TYPE_VALIDATE][LEN](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                done();
            });
        });
    });
    describe(TYPE_NAME.OBJECT, () => {
        describe(TYPE, () => {
            const base = 'object';
            it('valid value', () => {
                const value = {};
                if (TypeObject[TYPE](base, value) !== undefined)
                throw Error('It should return undefined when validating valid value');
            });
            it('invalid value', () => {
                const value = true;
                if (TypeObject[TYPE](base, value) === undefined)
                    throw Error('It should return error message when validating invalid value.');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                TypeObject[SYM_TYPE_VALIDATE][TYPE](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, (done) => {
                for (const value of values.non.string)
                    try {
                        TypeObject[SYM_TYPE_VALIDATE][TYPE](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                done();
            });
        });
        describe(INSTANCE_OF, () => {
            const base = Array;
            it('valid value', () => {
                const value = [1];
                if (TypeObject[INSTANCE_OF](base, value) !== undefined)
                    throw Error('It should return undefined when validating valid value.');
            });
            it('invalid value', () => {
                const value = {};
                if (TypeObject[INSTANCE_OF](base, value) === undefined)
                    throw Error('It should return error message when validating invalid value.');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                TypeObject[SYM_TYPE_VALIDATE][INSTANCE_OF](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, (done) => {
                for (const value of values.non.function)
                    try {
                        TypeObject[SYM_TYPE_VALIDATE][INSTANCE_OF](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                done();
            });
        });
        describe(CONSTRUCTOR_NAME, () => {
            const base = 'Array';
            it('valid value', () => {
                const value = [1];
                if (TypeObject[CONSTRUCTOR_NAME](base, value) !== undefined)
                    throw Error('It should return undefined when validating valid value.');
            });
            it('invalid value', () => {
                const value = {};
                if (TypeObject[CONSTRUCTOR_NAME](base, value) === undefined)
                    throw Error('It should return error message when validating invalid value.');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                TypeObject[SYM_TYPE_VALIDATE][CONSTRUCTOR_NAME](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, (done) => {
                for (const value of values.non.string)
                    try {
                        TypeObject[SYM_TYPE_VALIDATE][CONSTRUCTOR_NAME](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                done();
            });
        });
        describe(PROPERTIES, () => {
            const base = ['0', '1'];
            it('valid value', () => {
                const value = [1, 'nice, second index!'];
                if (TypeObject[PROPERTIES](base, value) !== undefined)
                    throw Error('It should return undefined when validating valid value.');
            });
            it('invalid value', () => {
                const value = {};
                if (TypeObject[PROPERTIES](base, value) === undefined)
                    throw Error('It should return error message when validating invalid value.');
            });
            it(`${SYM_TYPE_VALIDATE.toString()} valid value`, () => {
                TypeObject[SYM_TYPE_VALIDATE][PROPERTIES](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} invalid value`, (done) => {
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
                    try {
                        TypeObject[SYM_TYPE_VALIDATE][PROPERTIES](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                done();
            });
        });
    });
    describe('Wrapper', () => {
        describe('.set()', () => {
            it('It should accept valid type', () => {
                new TypeWrapper().set(TYPE_NAME.ARRAY, TypeArray);
            });
            it('It should throw an error when adding if type is already declared', (done) => {
                try {
                    new TypeWrapper()
                        .set(TYPE_NAME.ARRAY, TypeArray)
                        .set(TYPE_NAME.ARRAY, TypeBoolean);
                    done('It should throw an error when adding if type is already declared');
                } catch (err) {
                    done();
                }
            });
            it('It should throw an error if type name to be set is not a string', (done) => {
                try {
                    new TypeWrapper().set(123 as any, TypeArray);
                    done('It should throw an error if type name to be set is not a string');
                } catch (err) {
                    done();
                }
            });
            it('It should reject type that lacks schema validation method', (done) => {
                const customType: any = { method () { return; } };
                try {
                    new TypeWrapper().set('customType', customType);
                    done('invalid value');
                } catch (err) {
                    done();
                }
            });
            it('It should throw an error when extending with non-existent type', (done) => {
                const customType = {
                    method () { return; },
                    [SYM_TYPE_VALIDATE]: {
                        method () { return; },
                    },
                };
                try {
                    new TypeWrapper()
                        .set(TYPE_NAME.ARRAY, TypeArray)
                        .set('customType', customType, TYPE_NAME.OBJECT);
                    done('It should throw an error when extending with non-existent type');
                } catch (err) {
                    done();
                }
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
                custom.should.be.an('object');
                custom.should.have.property('method');
                custom[SYM_TYPE_VALIDATE].method.should.be.an('function');
                for (const key of Object.keys(TypeArray)) {
                    custom[key].should.be.an('function');
                    custom[SYM_TYPE_VALIDATE][key].should.be.an('function');
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
                anotherCustom.should.be.an('object');
                anotherCustom.should.have.property('anotherMethod');
                anotherCustom[SYM_TYPE_VALIDATE].anotherMethod.should.be.an('function');
                for (const key of ['method', ...Object.keys(TypeArray)]) {
                    anotherCustom[key].should.be.an('function');
                    anotherCustom[SYM_TYPE_VALIDATE][key].should.be.an('function');
                }
            });
            it('It should throw an error if type does not have any methods', (done) => {
                try {
                    new TypeWrapper()
                        .set(TYPE_NAME.ARRAY, {} as any);
                    done('It should throw an error if type does not have any methods');
                } catch (err) {
                    done();
                }
            });
        });
        describe('.has()', () => {
            it('It should return boolean', () => {
                const types = new TypeWrapper();
                types.set(TYPE_NAME.ARRAY, TypeArray);
                types.has(TYPE_NAME.ARRAY).should.be.equal(true);
                types.has(TYPE_NAME.BOOLEAN).should.be.equal(false);
            });
        });
        describe('.get()', () => {
            it('It should return type if it exists', () => {
                const types = new TypeWrapper().set(TYPE_NAME.ARRAY, TypeArray);
                types.get(TYPE_NAME.ARRAY)!.should.be.equal(TypeArray);
            });
            it('It should return undefined if type does not exists', () => {
                const types = new TypeWrapper();
                if (types.get(TYPE_NAME.ARRAY) != null)
                    throw Error('It should return undefined if type does not exists');
            });
        });
    });
});
