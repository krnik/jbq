import { expect } from 'chai';
import { check, gen, property } from 'testcheck';
import { PropertyMetadata } from '../../../src/class_syntax/property_metadata';
import { ValidatorBuilder } from '../../../src/class_syntax/validator_builder';
import { SYM_PROPERTIES } from '../../../src/lib';
import {
    LEN,
    PROPERTIES,
    TYPE,
    TYPE_NUMBER,
    TYPE_OBJECT,
    TYPE_STRING,
    TYPE_ARRAY,
} from '../../../src/misc/constants';

describe(
    ValidatorBuilder.name,
    (): void => {
        let Ctr: Function;
        let builder: ValidatorBuilder;

        beforeEach(
            (): void => {
                Ctr = function(): void {};
                builder = ValidatorBuilder.extract(Ctr);
            },
        );

        it(
            ValidatorBuilder.extract.name,
            (): void => {
                const Ctr = function(): void {};
                ValidatorBuilder.extract(Ctr);

                const symbols = Object.getOwnPropertySymbols(Ctr);
                expect(symbols).to.have.length(1);
            },
        );

        describe(
            ValidatorBuilder.prototype.addKeyword.name,
            (): void => {
                it('it should extend schema with provided keyword', (): void => {
                    const dataGenerator = gen.object({
                        key: gen.string,
                        value: gen.any,
                    });
                    check(
                        property(
                            dataGenerator,
                            (data): void => {
                                builder.addKeyword(data.key, data.value);
                                const meta = builder.getMeta();
                                expect(meta[0].schema[data.key]).to.be.equal(data.value);
                            },
                        ),
                        {
                            numTests: 40,
                        },
                    );
                });
            },
        );

        describe(
            ValidatorBuilder.prototype.getMeta.name,
            (): void => {
                it('it should return references to metadata properties', (): void => {
                    const [meta, propMeta] = builder.getMeta();
                    expect(meta).to.be.equal(builder['metadata']);
                    expect(propMeta).to.be.equal(builder['propertiesMetadata']);
                });
            },
        );

        describe(
            ValidatorBuilder.prototype.getPropertyMetadata.name,
            (): void => {
                it('it should return PropertyMetadata reference', (): void => {
                    const property = 'Test';

                    expect(builder['propertiesMetadata'].has(property)).to.be.equal(false);

                    const propMeta = builder.getPropertyMetadata(property);
                    expect(builder['propertiesMetadata'].has(property)).to.be.equal(true);
                    expect(propMeta).to.be.instanceOf(PropertyMetadata);
                });
            },
        );

        // describe(
        //     ValidatorBuilder.prototype.markCompiled.name,
        //     (): void => {
        //         it('it should set "wasCompiled" flag to true', (): void => {
        //             builder.markCompiled();
        //             expect(builder['metadata'].wasCompiled).to.be.equal(true);
        //         });
        //     },
        // );

        describe(
            ValidatorBuilder.prototype.buildSchema.name,
            (): void => {
                it('it should freeze objects and its properties metadata', (): void => {
                    builder.buildSchema();
                    expect(builder['metadata'].frozen).to.be.equal(true);
                });

                it('it should build and freeze schema of builder', (): void => {
                    const keys: string[] = [];
                    check(
                        property(
                            gen.string,
                            (str: string): void => {
                                keys.push(str);
                                builder.addKeyword(str, str);
                            },
                        ),
                    );

                    try {
                        builder.addKeyword(keys[0], keys[0]);
                    } catch (error) {
                        expect(error).to.be.instanceOf(TypeError);
                    }
                });

                it('it should not append properties to SYM_PROPERTIES of property with Constructor', (): void => {
                    const Ctr = function(): void {};
                    const subBuilder = ValidatorBuilder.extract(Ctr);
                    const properties = [
                        ['name', { [TYPE]: TYPE_STRING }],
                        ['age', { [TYPE]: TYPE_NUMBER }],
                    ] as const;

                    properties.forEach(
                        ([propertyName, schema]): void => {
                            subBuilder
                                .getPropertyMetadata(propertyName)
                                .addKeyword(TYPE, schema[TYPE]);
                        },
                    );

                    const builderProp = 'user';
                    builder.getPropertyMetadata(builderProp).setValue('Constructor', Ctr);

                    builder.buildSchema();
                    const schema = builder['metadata'].schema;

                    expect(schema).to.be.an('object');
                    expect(schema[SYM_PROPERTIES]).to.be.equal(undefined);
                    expect(schema).to.be.deep.equal({ [TYPE]: TYPE_OBJECT });
                });

                it('it should append schema to SYM_PROPERTIES of properties that do not have Constructor', (): void => {
                    const prop = 'user';
                    builder
                        .addKeyword(PROPERTIES, [prop])
                        .getPropertyMetadata(prop)
                        .addKeyword(TYPE, TYPE_STRING)
                        .addKeyword(LEN, { min: 8 });
                    builder.buildSchema();

                    const schema = builder['metadata'].schema;

                    expect(schema).to.be.an('object');
                    expect(schema[SYM_PROPERTIES])
                        .to.be.an('object')
                        .that.have.all.keys([prop]);
                    expect(schema).to.be.deep.equal({
                        [TYPE]: TYPE_OBJECT,
                        [PROPERTIES]: [prop],
                        [SYM_PROPERTIES]: {
                            [prop]: {
                                [TYPE]: TYPE_STRING,
                                [LEN]: { min: 8 },
                            },
                        },
                    });
                });

                it('it should append schema to SYM_PROPERTIES of property that have its Constructor for items', (): void => {
                    const Ctr = function(): void {};
                    const subBuilder = ValidatorBuilder.extract(Ctr);
                    subBuilder.getPropertyMetadata('name').addKeyword(TYPE, TYPE_STRING);
                    subBuilder.getPropertyMetadata('address').addKeyword(TYPE, TYPE_STRING);

                    builder
                        .getPropertyMetadata('user')
                        .addKeyword(TYPE, TYPE_ARRAY)
                        .setValue('Constructor', Ctr)
                        .setValue('isConstructorForItems', true);
                    builder.buildSchema();

                    const schema = builder['metadata'].schema;
                    expect(schema)
                        .to.be.an('object')
                        .that.have.all.keys([SYM_PROPERTIES, TYPE]);
                    expect(schema[SYM_PROPERTIES])
                        .to.be.an('object')
                        .that.have.all.keys(['user']);
                    expect(schema).to.be.deep.equal({
                        [TYPE]: TYPE_OBJECT,
                        [SYM_PROPERTIES]: {
                            user: {
                                [TYPE]: TYPE_ARRAY,
                            },
                        },
                    });
                });
            },
        );
    },
);
