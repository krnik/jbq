import { expect } from 'chai';
import { check, gen, property } from 'testcheck';
import {
    any,
    array,
    boolean,
    constructorName,
    decoratorFactory,
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
    regex,
    schema,
    shape,
    some,
    string,
    type,
    value,
    collection,
    properties,
} from '../../../src/class_syntax/decorator/validation_decorator';
import { ClassValidatorBuilder } from '../../../src/class_syntax/class_validator_builder';
import {
    TYPE,
    TYPE_NAME,
    SYM_SCHEMA_PROPERTIES,
    SYM_SCHEMA_COLLECTION,
} from '../../../src/misc/constants';
import { instantiate } from '../../../src/class_syntax/decorator/class_decorator';
import { Shape } from '../../../src/class_syntax';

describe('Validation Decorators', (): void => {
    const callback = (): true => true;
    const reg = /test/;
    const arr = [0];
    const props = ['id'];
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
        ['@properties', properties(props), 'properties', props],
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

    describe('@shape', (): void => {
        describe('Class Decorator', (): void => {
            it('it should extend root schema', (): void => {
                class BaseA {
                    @string public propA!: string;
                    public siema(): void {}
                }

                @instantiate
                class BaseB {
                    @number public propB!: number;
                }

                @shape(BaseA)
                @shape(BaseB)
                class Extended implements Shape<BaseA>, Shape<BaseB> {
                    public propA!: string;
                    public propB!: number;
                }

                const builder = ClassValidatorBuilder.extract(Extended);
                const schema = builder.getSchema();
                expect(schema[TYPE]).to.be.equal(TYPE_NAME.OBJECT);

                const schemaProperties = builder['getSubSchemas']();
                expect(schemaProperties)
                    .to.be.an('object')
                    .that.has.all.keys(['propA', 'propB']);

                expect(schemaProperties.propA)
                    .to.be.an('object')
                    .that.have.property(TYPE, TYPE_NAME.STRING);
                expect(schemaProperties.propA).to.be.equal(
                    ClassValidatorBuilder.extract(BaseA)['getSubSchemas']()['propA'],
                );

                expect(schemaProperties.propB)
                    .to.be.an('object')
                    .that.have.property(TYPE, TYPE_NAME.NUMBER);
                expect(schemaProperties.propB).to.be.equal(
                    ClassValidatorBuilder.extract(BaseB)['getSubSchemas']()['propB'],
                );
            });

            it('it should throw if shapes have the same properties', (): void => {
                expect(
                    (): void => {
                        class BaseA {
                            @string public property!: string;
                        }
                        class BaseB {
                            @string public property!: string;
                        }

                        @shape(BaseA)
                        @shape(BaseB)
                        class Extended {}
                        Extended;
                    },
                ).to.throw();
            });

            it('it should throw if shapes have the same properties and one of them is @instantiate', (): void => {
                expect(
                    (): void => {
                        class BaseA {
                            @string public property!: string;
                        }
                        @instantiate
                        class BaseB {
                            @string public property!: string;
                        }

                        @shape(BaseA)
                        @shape(BaseB)
                        class Extended implements Shape<BaseA>, Shape<BaseB> {
                            @string public property!: string;
                        }
                        Extended;
                    },
                ).to.throw();
            });
        });

        describe('Property Decorator', (): void => {
            it('it should extend subproperty schema', (): void => {
                class BaseA {
                    @string public property!: string;
                }
                class Extended {
                    @shape(BaseA) public ext!: Shape<BaseA>;
                }

                const builder = ClassValidatorBuilder.extract(Extended);
                expect(builder.getMeta().get('ext'))
                    .to.be.an('object')
                    .that.have.property('Constructor', undefined);

                const extSubProp = builder['getSubSchemas']()['ext'];
                expect(extSubProp).to.be.an('object');
                expect(builder['getSubSchemas']()['ext'][SYM_SCHEMA_PROPERTIES]).to.be.deep.equal(
                    ClassValidatorBuilder.extract(BaseA)['getSubSchemas'](),
                );
            });

            it('it should not extend subproperty schema out of @instantiate class', (): void => {
                @instantiate
                class BaseA {
                    @string public property!: string;
                }

                class Extended {
                    @shape(BaseA) public ext!: BaseA;
                }

                const builder = ClassValidatorBuilder.extract(Extended);
                expect(builder.getMeta().get('ext'))
                    .to.be.an('object')
                    .that.have.property('Constructor', BaseA);

                expect(builder['getSubSchemas']())
                    .to.be.an('object')
                    .that.does.not.have.property('ext');
            });

            it('it should throw if @shape is used twice on the same property with @instantiate class', (): void => {
                expect(
                    (): void => {
                        @instantiate
                        class BaseA {
                            @string public property!: string;
                        }
                        class Extended {
                            @shape(BaseA) @shape(BaseA) public ext!: BaseA;
                        }
                        Extended;
                    },
                ).to.throw();
            });
        });
    });

    describe('@collection', (): void => {
        describe('Class Decorator', (): void => {
            it('it should extend root schema with collection property', (): void => {
                @string
                class BaseA {}

                @collection(BaseA)
                class Extended {}

                const builder = ClassValidatorBuilder.extract(Extended);
                const collSchema = builder.getSchema()[SYM_SCHEMA_COLLECTION];
                expect(collSchema).to.not.be.equal(undefined);
                expect(collSchema).to.be.equal(ClassValidatorBuilder.extract(BaseA).getSchema());
            });

            it('it should throw on attempt to assign twice collection property', (): void => {
                expect(
                    (): void => {
                        @string
                        class BaseA {}

                        @collection(BaseA)
                        @collection(BaseA)
                        class Extended {}
                        Extended;
                    },
                ).to.throw();

                expect(
                    (): void => {
                        @string
                        class BaseA {}

                        @collection(BaseA)
                        @schema({ [SYM_SCHEMA_COLLECTION]: {} })
                        class Extended {}
                        Extended;
                    },
                ).to.throw();

                expect(
                    (): void => {
                        @string
                        class BaseA {}

                        @schema({ [SYM_SCHEMA_COLLECTION]: {} })
                        @collection(BaseA)
                        class Extended {}
                        Extended;
                    },
                ).to.not.throw();
            });
        });

        describe('Property Decorator', (): void => {
            it('it should extend collection property of root subproperty', (): void => {
                @string
                class BaseA {}

                class Extended {
                    @collection(BaseA)
                    public ext!: Shape<BaseA>[];
                }

                const builder = ClassValidatorBuilder.extract(Extended);
                expect(builder['getSubSchemas']()['ext'][SYM_SCHEMA_COLLECTION]).to.be.equal(
                    ClassValidatorBuilder.extract(BaseA).getSchema(),
                );
            });

            it('it should throw on attempt to assign collection property twice', (): void => {
                expect(
                    (): void => {
                        @string
                        class BaseA {}

                        class Extended {
                            @collection(BaseA)
                            @collection(BaseA)
                            public ext!: Shape<BaseA>[];
                        }
                        Extended;
                    },
                ).to.throw();
            });

            it('it should accept @instantiate class', (): void => {
                @instantiate
                class BaseA {}

                class Extended {
                    @collection(BaseA)
                    public ext!: Shape<BaseA>[];
                }

                const builder = ClassValidatorBuilder.extract(Extended);
                expect(builder.getSchema().hasOwnProperty(SYM_SCHEMA_PROPERTIES)).to.be.equal(
                    false,
                );
                expect(builder.getMeta().get('ext'))
                    .to.be.an('object')
                    .that.have.property('Constructor', BaseA);
                expect(builder.getMeta().get('ext'))
                    .to.be.an('object')
                    .that.have.property('iterateOverData', true);
            });

            it('it should throw if @shape and @collection are used with @instantiate classes', (): void => {
                expect(
                    (): void => {
                        @instantiate
                        class BaseA {}

                        class Extended {
                            @collection(BaseA)
                            @collection(BaseA)
                            public ext!: Shape<BaseA>[];
                        }
                        Extended;
                    },
                ).to.throw();
            });
        });
    });
});
