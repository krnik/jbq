import { createTypes } from '../../index';
import { TypeArray } from '../../types/Array';
import { TypeBoolean } from '../../types/Boolean';
import { values } from '../data/index';
import { TYPE_NAME, LEN, MAX_LEN, MIN_LEN, INCLUDES, EVERY, SOME, VALUE, SYM_TYPE_VALIDATE, MIN, MAX, REGEX, INSTANCE_OF, CONSTRUCTOR_NAME, TYPE } from '../../constants';
import { TypeNumber } from '../../types/Number';
import { TypeString } from '../../types/String';
import { TypeObject } from '../../types/Object';
import { TypeRoot } from '../../types/Root';

export default () => describe('Types', () => {
    describe(TYPE_NAME.ARRAY, () => {
        describe(LEN, () => {
            it('should pass', () => {
                const base = 2;
                const value = [1, 2];
                TypeArray[LEN](base, value);
            });
            it('should throw an error', (done) => {
                const base = 2;
                const value: any[] = [];
                try {
                    TypeArray[LEN](base, value);
                    done(`${LEN} - should throw an error`);
                } catch (err) {
                    err.should.have.all.keys('msg', 'args');
                    err.msg.should.be.a('string');
                    err.args.base.should.be.equal(base);
                    err.args.value.should.be.equal(value);
                    done();
                }
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should pass`, () => {
                const value = 10;
                TypeArray[SYM_TYPE_VALIDATE][LEN](value);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should throw an error`, (done) => {
                for (const value of values.non.number) {
                    try {
                        TypeArray[SYM_TYPE_VALIDATE][LEN](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                }
                done();
            });
            // TODO: SYM_TYPE_PARSE
        });
        describe(MAX_LEN, () => {
            it('should pass', () => {
                const base = 10;
                const value = new Array(9);
                TypeArray[MAX_LEN](base, value);
            });
            it('should throw an error', (done) => {
                const base = 10;
                const value = new Array(11);
                try {
                    TypeArray[MAX_LEN](base, value);
                    done(`${MAX_LEN} - should throw an error`);
                } catch (err) {
                    err.should.have.all.keys('msg', 'args');
                    err.msg.should.be.a('string');
                    err.args.base.should.be.equal(base);
                    err.args.value.should.be.equal(value);
                    done();
                }
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should pass`, () => {
                const value = 10;
                TypeArray[SYM_TYPE_VALIDATE][MAX_LEN](value);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should throw an error`, (done) => {
                for (const value of values.non.number) {
                    try {
                        TypeArray[SYM_TYPE_VALIDATE][MAX_LEN](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                }
                done();
            });
        });
        describe(MIN_LEN, () => {
            it('should pass', () => {
                const base = 2;
                const value = new Array(4);
                TypeArray[MIN_LEN](base, value);
            });
            it('should throw an error', (done) => {
                const base = 2;
                const value = new Array(1);
                try {
                    TypeArray[MIN_LEN](base, value);
                    done(`${MIN_LEN} - should throw an error`);
                } catch (err) {
                    err.should.have.all.keys('msg', 'args');
                    err.msg.should.be.a('string');
                    err.args.base.should.be.equal(base);
                    err.args.value.should.be.equal(value);
                    done();
                }
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should pass`, () => {
                const value = 10;
                TypeArray[SYM_TYPE_VALIDATE][MIN_LEN](value);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should throw an error`, (done) => {
                for (const value of values.non.number) {
                    try {
                        TypeArray[SYM_TYPE_VALIDATE][MIN_LEN](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                }
                done();
            });
        });
        describe(INCLUDES, () => {
            it('should pass', () => {
                const base = 10;
                const value = [10, 20, 30];
                TypeArray[INCLUDES](base, value);
            });
            it('should throw an error', (done) => {
                const base = 0;
                const value = [10, 20, 30];
                try {
                    TypeArray[INCLUDES](base, value);
                    done(`${INCLUDES} - should throw an error`);
                } catch (err) {
                    err.should.have.all.keys('msg', 'args');
                    err.msg.should.be.a('string');
                    err.args.base.should.be.equal(base);
                    err.args.value.should.be.equal(value);
                    done();
                }
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should pass`, () => {
                const value = 10;
                TypeArray[SYM_TYPE_VALIDATE][INCLUDES](value);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should throw an error`, (done) => {
                for (const value of values.null) {
                    try {
                        TypeArray[SYM_TYPE_VALIDATE][INCLUDES](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                }
                done();
            });
        });
        describe(EVERY, () => {
            const base = (el: number) => typeof(el) === 'number';
            it('should pass', () => {
                const value = [10, 20, 30];
                TypeArray[EVERY](base, value);
            });
            it('should throw an error', (done) => {
                const value = [10, 20, '30'];
                try {
                    TypeArray[EVERY](base, value);
                    done(`${EVERY} - should throw an error`);
                } catch (err) {
                    err.should.have.all.keys('msg', 'args');
                    err.msg.should.be.a('string');
                    err.args.base.should.be.equal(base);
                    err.args.value.should.be.equal(value);
                    done();
                }
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should pass`, () => {
                TypeArray[SYM_TYPE_VALIDATE][EVERY](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should throw an error`, (done) => {
                for (const value of values.non.function) {
                    try {
                        TypeArray[SYM_TYPE_VALIDATE][EVERY](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                }
                done();
            });
        });
        describe(SOME, () => {
            const base = (el: number) => typeof(el) === 'number';
            it('should pass', () => {
                const value = [10, 20, 30];
                TypeArray[SOME](base, value);
            });
            it('should throw an error', (done) => {
                const value = ['10', '20', '30'];
                try {
                    TypeArray[SOME](base, value);
                    done(`${SOME} - should throw an error`);
                } catch (err) {
                    err.should.have.all.keys('msg', 'args');
                    err.msg.should.be.a('string');
                    err.args.base.should.be.equal(base);
                    err.args.value.should.be.equal(value);
                    done();
                }
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should pass`, () => {
                TypeArray[SYM_TYPE_VALIDATE][SOME](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should throw an error`, (done) => {
                for (const value of values.non.function) {
                    try {
                        TypeArray[SYM_TYPE_VALIDATE][SOME](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                }
                done();
            });
        });
    });
    describe(TYPE_NAME.BOOLEAN, () => {
        describe(VALUE, () => {
            const base = false;
            it('should pass', () => {
                const value = false;
                TypeBoolean[VALUE](base, value);
            });
            it('should throw an error', (done) => {
                const value = true;
                try {
                    TypeBoolean[VALUE](base, value);
                    done(`${VALUE} - should throw an error`);
                } catch (err) {
                    err.should.have.all.keys('msg', 'args');
                    err.msg.should.be.a('string');
                    err.args.base.should.be.equal(base);
                    err.args.value.should.be.equal(value);
                    done();
                }
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should pass`, () => {
                TypeBoolean[SYM_TYPE_VALIDATE][VALUE](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should throw an error`, (done) => {
                for (const value of values.non.boolean) {
                    try {
                        TypeBoolean[SYM_TYPE_VALIDATE][VALUE](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                }
                done();
            });
        });
    });
    describe(TYPE_NAME.NUMBER, () => {
        describe(MIN, () => {
            const base = 10;
            it('should pass', () => {
                const value = 100;
                TypeNumber[MIN](base, value);
            });
            it('should throw an error', (done) => {
                const value = 0;
                try {
                    TypeNumber[MIN](base, value);
                    done(`${MIN} - should throw an error`);
                } catch (err) {
                    err.should.have.all.keys('msg', 'args');
                    err.msg.should.be.a('string');
                    err.args.base.should.be.equal(base);
                    err.args.value.should.be.equal(value);
                    done();
                }
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should pass`, () => {
                TypeNumber[SYM_TYPE_VALIDATE][MIN](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should throw an error`, (done) => {
                for (const value of values.non.number) {
                    try {
                        TypeNumber[SYM_TYPE_VALIDATE][MIN](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                }
                done();
            });
        });
        describe(MAX, () => {
            const base = 10;
            it('should pass', () => {
                const value = 0;
                TypeNumber[MAX](base, value);
            });
            it('should throw an error', (done) => {
                const value = 100;
                try {
                    TypeNumber[MAX](base, value);
                    done(`${MAX} - should throw an error`);
                } catch (err) {
                    err.should.have.all.keys('msg', 'args');
                    err.msg.should.be.a('string');
                    err.args.base.should.be.equal(base);
                    err.args.value.should.be.equal(value);
                    done();
                }
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should pass`, () => {
                TypeNumber[SYM_TYPE_VALIDATE][MAX](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should throw an error`, (done) => {
                for (const value of values.non.number) {
                    try {
                        TypeNumber[SYM_TYPE_VALIDATE][MAX](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                }
                done();
            });
        });
    });
    describe(TYPE_NAME.STRING, () => {
        describe(MIN_LEN, () => {
            const base = 10;
            it('should pass', () => {
                const value = 'Long string with at least 10 characters.';
                TypeString[MIN_LEN](base, value);
            });
            it('should throw an error', (done) => {
                const value = 'Short.';
                try {
                    TypeString[MIN_LEN](base, value);
                    done(`${MIN_LEN} - should throw an error`);
                } catch (err) {
                    err.should.have.all.keys('msg', 'args');
                    err.msg.should.be.a('string');
                    err.args.base.should.be.equal(base);
                    err.args.value.should.be.equal(value);
                    done();
                }
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should pass`, () => {
                TypeString[SYM_TYPE_VALIDATE][MIN_LEN](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should throw an error`, (done) => {
                for (const value of values.non.number) {
                    try {
                        TypeString[SYM_TYPE_VALIDATE][MIN_LEN](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                }
                done();
            });
        });
        describe(MAX_LEN, () => {
            const base = 10;
            it('should pass', () => {
                const value = 'Short.';
                TypeString[MAX_LEN](base, value);
            });
            it('should throw an error', (done) => {
                const value = 'Long string with at least 10 characters.';
                try {
                    TypeString[MAX_LEN](base, value);
                    done(`${MAX_LEN} - should throw an error`);
                } catch (err) {
                    err.should.have.all.keys('msg', 'args');
                    err.msg.should.be.a('string');
                    err.args.base.should.be.equal(base);
                    err.args.value.should.be.equal(value);
                    done();
                }
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should pass`, () => {
                TypeString[SYM_TYPE_VALIDATE][MAX_LEN](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should throw an error`, (done) => {
                for (const value of values.non.number) {
                    try {
                        TypeString[SYM_TYPE_VALIDATE][MAX_LEN](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                }
                done();
            });
        });
        describe(REGEX, () => {
            const base = /^Sho/i;
            it('should pass', () => {
                const value = 'Short.';
                TypeString[REGEX](base, value);
            });
            it('should throw an error', (done) => {
                const value = 'Long string with at least 10 characters.';
                try {
                    TypeString[REGEX](base, value);
                    done(`${REGEX} - should throw an error`);
                } catch (err) {
                    err.should.have.all.keys('msg', 'args');
                    err.msg.should.be.a('string');
                    err.args.base.should.be.equal(base);
                    err.args.value.should.be.equal(value);
                    done();
                }
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should pass`, () => {
                TypeString[SYM_TYPE_VALIDATE][REGEX](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should throw an error`, (done) => {
                for (const value of values.non.regex) {
                    try {
                        TypeString[SYM_TYPE_VALIDATE][REGEX](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                }
                done();
            });
        });
        describe(LEN, () => {
            const base = 10;
            it('should pass', () => {
                const value = 'Actually10';
                TypeString[LEN](base, value);
            });
            it('should throw an error', (done) => {
                const value = 'Long string with at least 10 characters.';
                try {
                    TypeString[LEN](base, value);
                    done(`${LEN} - should throw an error`);
                } catch (err) {
                    err.should.have.all.keys('msg', 'args');
                    err.msg.should.be.a('string');
                    err.args.base.should.be.equal(base);
                    err.args.value.should.be.equal(value);
                    done();
                }
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should pass`, () => {
                TypeString[SYM_TYPE_VALIDATE][LEN](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should throw an error`, (done) => {
                for (const value of values.non.number) {
                    try {
                        TypeString[SYM_TYPE_VALIDATE][LEN](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                }
                done();
            });
        });
    });
    describe(TYPE_NAME.OBJECT, () => {
        describe(INSTANCE_OF, () => {
            const base = Array;
            it('should pass', () => {
                const value = [1];
                TypeObject[INSTANCE_OF](base, value);
            });
            it('should throw an error', (done) => {
                const value = {};
                try {
                    TypeObject[INSTANCE_OF](base, value);
                    done(`${INSTANCE_OF} - should throw an error`);
                } catch (err) {
                    err.should.have.all.keys('msg', 'args');
                    err.msg.should.be.a('string');
                    err.args.base.should.be.equal(base);
                    err.args.value.should.be.equal(value);
                    done();
                }
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should pass`, () => {
                TypeObject[SYM_TYPE_VALIDATE][INSTANCE_OF](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should throw an error`, (done) => {
                for (const value of values.non.function) {
                    try {
                        TypeObject[SYM_TYPE_VALIDATE][INSTANCE_OF](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                }
                done();
            });
        });
        describe(CONSTRUCTOR_NAME, () => {
            const base = 'Array';
            it('should pass', () => {
                const value = [1];
                TypeObject[CONSTRUCTOR_NAME](base, value);
            });
            it('should throw an error', (done) => {
                const value = {};
                try {
                    TypeObject[CONSTRUCTOR_NAME](base, value);
                    done(`${CONSTRUCTOR_NAME} - should throw an error`);
                } catch (err) {
                    err.should.have.all.keys('msg', 'args');
                    err.msg.should.be.a('string');
                    err.args.base.should.be.equal(base);
                    err.args.value.should.be.equal(value);
                    done();
                }
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should pass`, () => {
                TypeObject[SYM_TYPE_VALIDATE][CONSTRUCTOR_NAME](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should throw an error`, (done) => {
                for (const value of values.non.string) {
                    try {
                        TypeObject[SYM_TYPE_VALIDATE][CONSTRUCTOR_NAME](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                }
                done();
            });
        });
    });
    describe(TYPE_NAME.ROOT.toString(), () => {
        describe(TYPE, () => {
            // TODO: Add tests for all base types: string, number, boolean, object, array
            const base = 'string';
            it('should pass', () => {
                const value = 'A string.';
                TypeRoot[TYPE](base, value);
            });
            it('should throw an error', (done) => {
                const value = {};
                try {
                    TypeRoot[TYPE](base, value);
                    done(`${TYPE} - should throw an error`);
                } catch (err) {
                    err.should.have.all.keys('msg', 'args');
                    err.msg.should.be.a('string');
                    err.args.base.should.be.equal(base);
                    err.args.value.should.be.equal(value);
                    done();
                }
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should pass`, () => {
                TypeRoot[SYM_TYPE_VALIDATE][TYPE](base);
            });
            it(`${SYM_TYPE_VALIDATE.toString()} should throw an error`, (done) => {
                for (const value of values.non.string) {
                    try {
                        TypeRoot[SYM_TYPE_VALIDATE][TYPE](value);
                        done(`Should throw an error for ${JSON.stringify(value)}`);
                    } catch (err) {
                        err.should.have.property('message');
                    }
                }
                done();
            });
        });
    });
    describe('Wrapper', () => {});
});
