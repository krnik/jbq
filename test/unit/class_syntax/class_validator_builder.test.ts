import { expect } from 'chai';
import 'mocha';
import { check, gen, property } from 'testcheck';
import { ClassValidatorBuilder } from '../../../src/class_syntax/class_validator_builder';
import {
    SYM_SCHEMA_COLLECTION,
    SYM_SCHEMA_PROPERTIES,
    TYPE,
    TYPE_NAME,
} from '../../../src/misc/constants';

interface TestClass {
    (...args: unknown[]): unknown;
    [k: string]: unknown;
}

function createClass(): TestClass {
    return function Test(): void {};
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

            expect(builder).to.have.all.keys(['schema', 'properties', 'defaults', 'transforms']);
            expect(builder).to.be.instanceOf(ClassValidatorBuilder);
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

    describe('.setSymbolSchemaProperty', (): void => {
        it('it should append subSchema to the root schema_collection property', (): void => {
            const builder = ClassValidatorBuilder.extract(createClass());
            const other = ClassValidatorBuilder.extract(createClass());
            other.append(TYPE, TYPE_NAME.ANY);

            builder.setSymbolSchemaProperty(SYM_SCHEMA_COLLECTION, other);
            expect(builder.getSchema()[SYM_SCHEMA_COLLECTION]).to.be.equal(other.getSchema());
        });

        it('it should append subSchema to the subProperty schema_collection property', (): void => {
            const builder = ClassValidatorBuilder.extract(createClass());
            const other = ClassValidatorBuilder.extract(createClass());
            other.append(TYPE, TYPE_NAME.ANY);

            builder.setSymbolSchemaProperty(SYM_SCHEMA_COLLECTION, other, 'prop');
            expect(builder['getSubSchemas']()['prop'][SYM_SCHEMA_COLLECTION]).to.be.equal(
                other.getSchema(),
            );
        });

        it.skip('NESTED INSTANCES', (): void => {});

        it('it should append subSchema to the root schema_properties property', (): void => {
            const builder = ClassValidatorBuilder.extract(createClass());
            const other = ClassValidatorBuilder.extract(createClass());
            other.appendToSubSchema(TYPE, TYPE_NAME.BOOLEAN, 'isBool');

            builder.setSymbolSchemaProperty(SYM_SCHEMA_PROPERTIES, other);
            expect(builder['getSubSchemas']()['isBool']).to.be.deep.eq(
                other['getSubSchemas']()['isBool'],
            );
        });

        it('it should append subSchema to the subProperty schema_properties property', (): void => {
            const builder = ClassValidatorBuilder.extract(createClass());
            const other = ClassValidatorBuilder.extract(createClass());
            other.appendToSubSchema(TYPE, TYPE_NAME.BOOLEAN, 'isBool');

            builder.setSymbolSchemaProperty(SYM_SCHEMA_PROPERTIES, other, 'prop');
            expect(builder['getSubSchemas']()['prop'][SYM_SCHEMA_PROPERTIES]).to.be.deep.eq(
                other['getSubSchemas'](),
            );
        });
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
                        expect(builder.getProperties().has(p)).to.be.equal(true);
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
                        expect(builder.getProperties().has(p)).to.be.equal(true);
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
    });
});
