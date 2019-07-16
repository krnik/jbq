import { expect } from 'chai';
import { check, gen, property } from 'testcheck';
import { PropertyMetadata } from '../../../src/class_syntax/property_metadata';

describe(
    PropertyMetadata.name,
    (): void => {
        let propMeta: PropertyMetadata;

        beforeEach(
            (): void => {
                propMeta = new PropertyMetadata();
            },
        );

        it('it should create instance with proper default values', (): void => {
            expect(propMeta.frozen).to.be.equal(false);
            expect(propMeta.schema).to.be.deep.equal({});
            expect(propMeta.defaultFn).to.be.equal(undefined);
            expect(propMeta.transformFn).to.be.equal(undefined);
            expect(propMeta.Constructor).to.be.equal(undefined);
            expect(propMeta.dataPropertyPath).to.be.equal(undefined);
            expect(propMeta.isConstructorForItems).to.be.equal(false);
        });

        describe(
            PropertyMetadata.prototype.addKeyword.name,
            (): void => {
                it('it should extend schema with provided keyword', (): void => {
                    expect(propMeta.schema).to.be.deep.equal({});

                    const dataGenerator = gen.object({
                        keyword: gen.string,
                        value: gen.any,
                    });

                    check(
                        property(
                            dataGenerator,
                            (data): void => {
                                propMeta.addKeyword(data.keyword, data.value);
                                expect(propMeta.schema[data.keyword]).to.be.deep.equal(data.value);
                            },
                        ),
                        { numTests: 40 },
                    );
                });

                it('it should overwrite schema keyword', (): void => {
                    expect(propMeta.schema).to.be.deep.equal({});
                    const key = 'type';

                    propMeta.addKeyword(key, 'any');
                    expect(propMeta.schema[key]).to.be.equal('any');

                    propMeta.addKeyword(key, 'array');
                    expect(propMeta.schema[key]).to.be.equal('array');
                });
            },
        );

        describe(
            PropertyMetadata.prototype.freeze.name,
            (): void => {
                it('it should freeze schema and instance', (): void => {
                    propMeta.freeze();
                    try {
                        propMeta.addKeyword('type', 'type');
                    } catch (error) {
                        expect(error).to.be.instanceOf(TypeError);
                    }
                    try {
                        // @ts-ignore
                        propMeta.elo = 1;
                    } catch (error) {
                        expect(error).to.be.instanceOf(TypeError);
                    }
                });
            },
        );

        describe(
            PropertyMetadata.prototype.setValue.name,
            (): void => {
                it('it should set key of the instance', (): void => {
                    const entries = [
                        ['frozen', true],
                        ['frozen', false],
                        ['transformFn', (): void => {}],
                        ['defaultFn', (): void => {}],
                        ['dataPropertyPath', 'path'],
                        ['Constructor', function(): void {}],
                        ['isConstructorForItems', true],
                    ] as const;
                    for (const [key, value] of entries) {
                        propMeta.setValue(key, value);
                        expect(propMeta[key]).to.be.equal(value);
                    }
                });
            },
        );
    },
);
