import { expect } from 'chai';
import { check, gen, property } from 'testcheck';
import { ClassValidatorBuilder } from '../../../src/class_syntax/class_validator_builder';
import {
    SYM_SCHEMA_COLLECTION,
    SYM_SCHEMA_PROPERTIES,
    TYPE,
    TYPE_NAME,
} from '../../../src/misc/constants';
import { Constructor } from '../../../src/misc/typings';
import { Schema } from '../../../src/core/compilation/interface/schema.interface';

interface TestClass extends Constructor {
    [k: string]: unknown;
}

function createClass(): TestClass {
    return class Test {} as TestClass;
}

describe('ClassValidatorBuilder', (): void => {
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

            expect(builder).to.have.all.keys(['schema', 'constr', 'propertyMeta']);
            expect(builder).to.be.instanceOf(ClassValidatorBuilder);
        });
    });

    describe('.shouldInstantiate', (): void => {
        it('it should append [CREATE_INSTANCE] symbol to the constructor', (): void => {
            const Test = createClass();
            ClassValidatorBuilder.shouldInstantiate(Test);
            const [sym] = Object.getOwnPropertySymbols(Test);
            expect(Test[(sym as unknown) as string]).to.be.equal(true);
        });
    });

    describe('.shouldCreateInstance', (): void => {
        it('it should return true if class was marked with .shouldInstantiate', (): void => {
            const Test = createClass();
            ClassValidatorBuilder.shouldInstantiate(Test);
            expect(ClassValidatorBuilder.extract(Test).shouldCreateInstance()).to.be.equal(true);
        });
    });

    describe('.getSchema', (): void => {
        it('it should return builder schema', (): void => {
            expect(ClassValidatorBuilder.extract(createClass()).getSchema()).to.have.property(
                TYPE,
                TYPE_NAME.OBJECT,
            );
        });
    });

    describe('.getMeta', (): void => {
        it('it should return properties meta map', (): void => {
            expect(ClassValidatorBuilder.extract(createClass()).getMeta()).to.be.instanceOf(Map);
        });
    });

    describe('.updateMeta', (): void => {
        it('it should create default meta propery', (): void => {
            const builder = ClassValidatorBuilder.extract(createClass());
            const meta = builder.getMeta();
            expect(meta.size).to.be.equal(0);

            const prop = 'Test';
            builder['updateMeta'](prop);
            expect(meta.size).to.be.equal(1);
            expect(meta.has(prop)).to.be.equal(true);
            expect(meta.get(prop))
                .to.be.an('object')
                .that.have.all.keys(['default', 'transform', 'Constructor', 'iterateOverData']);
        });

        it('it should update existing meta property', (): void => {
            const builder = ClassValidatorBuilder.extract(createClass());
            const meta = builder.getMeta();
            expect(meta.size).to.be.equal(0);

            const prop = 'Test';
            builder['updateMeta'](prop);
            expect(meta.size).to.be.equal(1);
            expect(meta.has(prop)).to.be.equal(true);
            expect(meta.get(prop))
                .to.be.an('object')
                .that.have.all.keys(['default', 'transform', 'Constructor', 'iterateOverData']);

            const callback = (): boolean => true;
            builder['updateMeta'](prop, 'default', callback);
            expect(meta.size).to.be.equal(1);
            expect(meta.has(prop)).to.be.equal(true);
            expect(meta.get(prop)).to.have.property('default', callback);
        });
    });

    describe('.append', (): void => {
        it('it should append property to the schema', (): void => {
            const builder = ClassValidatorBuilder.extract(createClass());

            check(
                property(
                    gen.string,
                    gen.primitive,
                    (k, v): void => {
                        expect(builder.append(k, v).getSchema()).to.have.property(k, v);
                    },
                ),
            );
        });
    });

    describe('.appendToSubSchema', (): void => {
        it('it should append property to schema subProperties', (): void => {
            const builder = ClassValidatorBuilder.extract(createClass());

            check(
                property(
                    gen.string,
                    gen.primitive,
                    gen.string,
                    (k, v, p): void => {
                        const schemas = builder.appendToSubSchema(k, v, p)['getSubSchemas']();
                        expect(schemas).to.have.property(p);
                        expect(schemas[p]).to.have.property(k, v);
                        expect(builder.getSchema()[SYM_SCHEMA_PROPERTIES]).to.have.property(p);
                    },
                ),
            );
        });
    });

    describe('.ensureProperty', (): void => {
        it('it should ensure that property exists', (): void => {
            const key = 'Test';
            const obj: Schema = {};
            const builder = ClassValidatorBuilder.extract(createClass());
            builder['ensureProperty'](obj, key);
            expect(obj[key]).to.be.an('object');
            expect(Object.keys(obj[key] as object))
                .to.be.an('array')
                .that.have.lengthOf(0);
        });
    });

    describe('.setSymbolSchemaProperty', (): void => {
        describe(
            SYM_SCHEMA_PROPERTIES.toString(),
            (): void => {
                it('it should append source properties to the root schema as ClassDecorator', (): void => {
                    const builder = ClassValidatorBuilder.extract(createClass());
                    const otherClass = createClass();
                    const other = ClassValidatorBuilder.extract(otherClass);
                    other.appendToSubSchema(TYPE, TYPE_NAME.BOOLEAN, 'isBool');

                    builder.setSymbolSchemaProperty(SYM_SCHEMA_PROPERTIES, otherClass);
                    expect(builder['getSubSchemas']()['isBool']).to.be.deep.eq(
                        other['getSubSchemas']()['isBool'],
                    );
                    expect(builder.getMeta().size).to.be.equal(0);
                });

                it('it should append source properties to the root subproperty as PropertyDecorator', (): void => {
                    const builder = ClassValidatorBuilder.extract(createClass());
                    const otherClass = createClass();
                    const other = ClassValidatorBuilder.extract(otherClass);
                    other.appendToSubSchema(TYPE, TYPE_NAME.BOOLEAN, 'isBool');

                    builder.setSymbolSchemaProperty(SYM_SCHEMA_PROPERTIES, otherClass, 'prop');
                    expect(builder['getSubSchemas']()['prop'][SYM_SCHEMA_PROPERTIES]).to.be.deep.eq(
                        other['getSubSchemas'](),
                    );
                    expect(builder.getMeta().get('prop')).to.be.an('object');
                });

                it('it should throw is source is undefined and source is not decorated with @instantiate', (): void => {
                    const builder = ClassValidatorBuilder.extract(createClass());
                    const otherClass = createClass();
                    expect(
                        (): unknown =>
                            builder.setSymbolSchemaProperty(SYM_SCHEMA_PROPERTIES, otherClass),
                    ).to.throw();
                });

                describe('source marked with .shouldInstantiate', (): void => {
                    it('it should append source properties to the root schema as ClassDecorator', (): void => {
                        const builder = ClassValidatorBuilder.extract(createClass());
                        const otherClass = createClass();
                        const other = ClassValidatorBuilder.extract(otherClass);
                        ClassValidatorBuilder.shouldInstantiate(otherClass);
                        expect(other.shouldCreateInstance()).to.be.equal(true);
                        other.appendToSubSchema(TYPE, TYPE_NAME.BOOLEAN, 'isBool');

                        builder.setSymbolSchemaProperty(SYM_SCHEMA_PROPERTIES, otherClass);
                        expect(builder['getSubSchemas']()['isBool']).to.be.deep.eq(
                            other['getSubSchemas']()['isBool'],
                        );
                        expect(builder.getMeta().size).to.be.equal(0);
                    });

                    it('it should not append source properties to the root subproperty as PropertyDecorator', (): void => {
                        const builder = ClassValidatorBuilder.extract(createClass());
                        const otherClass = createClass();
                        const other = ClassValidatorBuilder.extract(otherClass);
                        other.appendToSubSchema(TYPE, TYPE_NAME.BOOLEAN, 'isBool');
                        ClassValidatorBuilder.shouldInstantiate(otherClass);
                        expect(other.shouldCreateInstance()).to.be.equal(true);

                        builder.setSymbolSchemaProperty(SYM_SCHEMA_PROPERTIES, otherClass, 'prop');
                        expect(builder['getSubSchemas']()).to.be.deep.eq({});
                        expect(builder.getMeta().get('prop'))
                            .to.be.an('object')
                            .that.has.property('Constructor', otherClass);
                    });
                });
            },
        );

        describe(
            SYM_SCHEMA_COLLECTION.toString(),
            (): void => {
                it('it should append source schema to the root schema as ClassDecorator', (): void => {
                    const builder = ClassValidatorBuilder.extract(createClass());
                    const otherClass = createClass();
                    const other = ClassValidatorBuilder.extract(otherClass);
                    other.append(TYPE, TYPE_NAME.ANY);

                    builder.setSymbolSchemaProperty(SYM_SCHEMA_COLLECTION, otherClass);
                    expect(builder.getSchema()[SYM_SCHEMA_COLLECTION]).to.be.equal(
                        other.getSchema(),
                    );
                });

                it('it should append source schema to the subproperty as PropertyDecorator', (): void => {
                    const builder = ClassValidatorBuilder.extract(createClass());
                    const otherClass = createClass();
                    const other = ClassValidatorBuilder.extract(otherClass);
                    other.append(TYPE, TYPE_NAME.ANY);

                    builder.setSymbolSchemaProperty(SYM_SCHEMA_COLLECTION, otherClass, 'prop');
                    expect(builder['getSubSchemas']()['prop'][SYM_SCHEMA_COLLECTION]).to.be.equal(
                        other.getSchema(),
                    );
                });

                describe('source marked with .shouldInstantiate', (): void => {
                    it('it should append source schema as ClassDecorator', (): void => {
                        const builder = ClassValidatorBuilder.extract(createClass());
                        const otherClass = createClass();
                        const other = ClassValidatorBuilder.extract(otherClass);
                        ClassValidatorBuilder.shouldInstantiate(otherClass);
                        other.append(TYPE, TYPE_NAME.ANY);

                        builder.setSymbolSchemaProperty(SYM_SCHEMA_COLLECTION, otherClass);
                        expect(builder.getSchema()[SYM_SCHEMA_COLLECTION]).to.be.equal(
                            other.getSchema(),
                        );
                    });

                    it('it should not append source schema as PropertyDecorator', (): void => {
                        const builder = ClassValidatorBuilder.extract(createClass());
                        const otherClass = createClass();
                        const other = ClassValidatorBuilder.extract(otherClass);
                        ClassValidatorBuilder.shouldInstantiate(otherClass);
                        other.append(TYPE, TYPE_NAME.ANY);

                        builder.setSymbolSchemaProperty(SYM_SCHEMA_COLLECTION, otherClass, 'prop');
                        expect(builder['getSubSchemas']().hasOwnProperty('prop')).to.be.equal(
                            false,
                        );
                        const meta = builder.getMeta().get('prop');
                        expect(meta)
                            .to.be.an('object')
                            .that.have.property('Constructor', otherClass);
                        expect(meta).to.have.property('iterateOverData', true);
                    });
                });
            },
        );
    });

    describe('.addDefault', (): void => {
        it('it should add default fn for property and add property to the set', (): void => {
            const builder = ClassValidatorBuilder.extract(createClass());

            check(
                property(
                    gen.string,
                    (p): void => {
                        const callback = (): void => {};
                        builder.addDefault(p, callback);
                        expect(builder.getMeta().get(p))
                            .to.be.an('object')
                            .that.have.property('default', callback);
                    },
                ),
            );
        });
    });

    describe('.addTransform', (): void => {
        it('it should add transform fn for property and add property to the set', (): void => {
            const builder = ClassValidatorBuilder.extract(createClass());

            check(
                property(
                    gen.string,
                    (p): void => {
                        const callback = (): void => {};
                        builder.addTransform(p, callback);
                        expect(builder.getMeta().has(p))
                            .to.be.an('object')
                            .that.have.property(p, callback);
                    },
                ),
            );
        });
    });

    describe('.getSubSchemas', (): void => {
        it('it should create schema_properties if does not exists', (): void => {
            const builder = ClassValidatorBuilder.extract(createClass());
            expect(builder.getSchema().hasOwnProperty(SYM_SCHEMA_PROPERTIES)).to.be.equal(false);
        });

        it('it should return schema_properties of a root schema', (): void => {
            const builder = ClassValidatorBuilder.extract(createClass());
            builder.appendToSubSchema('key', 'value', 'prop');
            expect(builder['getSubSchemas']())
                .to.be.an('object')
                .that.have.property('prop');
            expect(builder['getSubSchemas']()['prop']).to.have.property('key', 'value');
        });

        it('it should ensure property of sub schemas if property parameter is supplied', (): void => {
            const builder = ClassValidatorBuilder.extract(createClass());
            const subSchemas = builder['getSubSchemas']('Test');
            expect(subSchemas)
                .to.be.an('object')
                .that.have.property('Test');
        });
    });
});
