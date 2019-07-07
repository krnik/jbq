import { expect } from 'chai';
import { TypeInstance } from '../../../../src/core/type_store/type_instance';
import { check, property, gen } from 'testcheck';
import { catchError } from '../../../utils';

describe('TypeInstance', (): void => {
    describe('.constructor', (): void => {
        it('it should create Type instance with default properties', (): void => {
            const name = 'Test';
            const type = new TypeInstance(name);

            expect(type.name).to.be.equal(name);
            expect(type['deriveType']).to.be.equal(undefined);
            expect(type['keywordOrder']).to.be.equal(undefined);
            expect(type['methods']).to.be.instanceOf(Map);
            expect(type['methods'].size).to.be.equal(0);
            expect(type['useForOfLoop']).to.be.equal(true);
        });
    });

    describe('.derive', (): void => {
        it('it should add reference to derived type as deriveType property', (): void => {
            const name = 'Test';
            const type = new TypeInstance(name);

            const derivedName = 'Derived';
            const derivedType = new TypeInstance(derivedName);

            type.derive(derivedType);
            expect(type['deriveType']).to.be.eq(derivedType);
        });
    });

    describe('.setKeyword', (): void => {
        it('it should add new method to the method set', (): void => {
            const name = 'Test';
            const type = new TypeInstance(name);

            const descriptor = {
                validator(): void {},
                schemaValidator(): void {},
            };

            type.setKeyword(name, descriptor);

            expect(type['methods'].size).to.be.equal(1);
            expect(type['methods'].has(name)).to.be.equal(true);
            expect(type['methods'].get(name)).to.be.deep.equal(descriptor);
        });

        it('it should overwrite method with the same name with newer one', (): void => {
            const name = 'Test';
            const type = new TypeInstance(name);

            const descriptors = [
                { validator(): void {}, schemaValidator(): void {} },
                { validator(): void {}, schemaValidator(): void {} },
            ];

            type.setKeyword(name, descriptors[0]);

            expect(type['methods'].size).to.be.equal(1);
            expect(type['methods'].has(name)).to.be.equal(true);
            expect(type['methods'].get(name)).to.be.deep.equal(descriptors[0]);

            type.setKeyword(name, descriptors[1]);

            expect(type['methods'].size).to.be.equal(1);
            expect(type['methods'].has(name)).to.be.equal(true);
            expect(type['methods'].get(name)).to.be.deep.equal(descriptors[1]);
        });
    });

    describe('.getKeyword', (): void => {
        it('it should return keyword descriptor from instance', (): void => {
            const name = 'Test';
            const type = new TypeInstance(name).setKeyword(name, {
                validator(): void {},
                schemaValidator(): void {},
            });

            const descriptor = type.getKeyword('Test');
            expect(descriptor)
                .to.be.an('object')
                .that.have.all.keys(['validator', 'kind', 'schemaValidator', 'acceptDataPath']);
        });

        it('it should return keyword descriptor from derive instance', (): void => {
            const name = 'Test';
            const type = new TypeInstance(name);

            const derivedName = 'Derived';
            const derivedType = new TypeInstance(derivedName).setKeyword(name, {
                validator(): void {},
                schemaValidator(): void {},
            });

            type.derive(derivedType);

            const descriptor = type.getKeyword(name);
            const derivedDescriptor = derivedType.getKeyword(name);

            expect(descriptor).to.not.be.equal(undefined);
            expect(derivedDescriptor).to.not.be.equal(undefined);
            expect(descriptor).to.be.deep.equal(derivedDescriptor);
        });

        it('it should return keyword descriptor from nested derive instance', (): void => {
            const name = 'Test';
            const type = new TypeInstance(name);

            const name1 = 'Derive1';
            const type1 = new TypeInstance(name1);

            const name2 = 'Derive2';
            const type2 = new TypeInstance(name2).setKeyword(name2, {
                validator(): void {},
                schemaValidator(): void {},
            });

            type1.derive(type2);
            type.derive(type1);

            const descriptor = type.getKeyword(name2);
            const descriptor1 = type1.getKeyword(name2);
            const descriptor2 = type1.getKeyword(name2);

            expect(descriptor).to.not.be.equal(undefined);
            expect(descriptor1).to.not.be.equal(undefined);
            expect(descriptor2).to.not.be.equal(undefined);

            expect(descriptor).to.be.deep.equal(descriptor1);
            expect(descriptor).to.be.deep.equal(descriptor2);
            expect(descriptor1).to.be.deep.equal(descriptor2);
        });

        it('it should throw an error if keyword does not exist', (): void => {
            const name = 'Test';
            const type = new TypeInstance(name);
            catchError(
                (): void => {
                    type.getKeyword(name);
                },
            );
        });
    });

    describe('.hasKeyword', (): void => {
        it('it should return true if type has specific keyword', (): void => {
            const name = 'Test';
            const type = new TypeInstance(name);

            check(
                property(
                    gen.string,
                    (str): void => {
                        expect(type.hasKeyword(str)).to.be.a('boolean');
                    },
                ),
            );
        });
    });

    describe('.getKeywords', (): void => {
        it('it should return all keyword type has access to', (): void => {
            const name = 'Test';
            const type = new TypeInstance(name);

            const keys = ['key1', 'key2', 'key3'];
            keys.forEach(
                (key): void => {
                    type.setKeyword(key, { validator(): void {}, schemaValidator(): void {} });
                },
            );

            const keywords = type.getKeywords();

            expect(keywords.length).to.be.equal(keys.length);
            keywords.forEach(
                (key): void => {
                    expect(keys.includes(key)).to.be.equal(true);
                },
            );
        });

        it('it should return all keyword of type and its derive type', (): void => {
            const name = 'Test';
            const type = new TypeInstance(name);

            const keys = ['key1', 'key2', 'key3'];
            keys.forEach(
                (key): void => {
                    type.setKeyword(key, { validator(): void {}, schemaValidator(): void {} });
                },
            );

            const deriveName = 'Derive';
            const deriveType = new TypeInstance(deriveName);

            const deriveKeys = ['derive1', 'derive2', 'derive3'];
            deriveKeys.forEach(
                (key): void => {
                    deriveType.setKeyword(key, {
                        validator(): void {},
                        schemaValidator(): void {},
                    });
                },
            );

            type.derive(deriveType);

            const keywords = type.getKeywords();
            [...keys, ...deriveKeys].forEach(
                (key): void => {
                    expect(keywords.includes(key)).to.be.equal(true);
                },
            );
        });
    });

    describe('.setKeywordOrder', (): void => {
        it('it should set keyOrder of a type', (): void => {
            const name = 'Test';
            const descriptor = { validator(): void {}, schemaValidator(): void {} };

            const type = new TypeInstance(name)
                .setKeyword('test1', descriptor)
                .setKeyword('test2', descriptor);
            expect(type['keywordOrder']).to.be.equal(undefined);

            const keywordOrder = ['test1', 'test2'];
            type.setKeywordOrder(keywordOrder);

            expect(type['keywordOrder']).to.be.deep.equal(keywordOrder);
        });

        it('it should throw if keywordOrder array contains keyword that has not been defined', (): void => {
            const name = 'Test';
            const type = new TypeInstance(name);
            catchError(
                (): void => {
                    type.setKeywordOrder(['test1', 'test2']);
                },
            );
        });
    });

    describe('.getKeywordOrder', (): void => {
        it('it should return Option<string[]>', (): void => {
            const name = 'Test';
            const descriptor = { validator(): void {}, schemaValidator(): void {} };

            const type = new TypeInstance(name)
                .setKeyword('test1', descriptor)
                .setKeyword('test2', descriptor);
            expect(type.getKeywordOrder()).to.be.equal(undefined);

            const keywordOrder = ['test1', 'test2'];
            type.setKeywordOrder(keywordOrder);

            expect(type.getKeywordOrder()).to.be.deep.equal(keywordOrder);
        });
    });

    describe('.setUseForOfLoop', (): void => {
        it('it should set value of useForOfLoop property', (): void => {
            const name = 'Test';
            const type = new TypeInstance(name);

            expect(type['useForOfLoop']).to.be.equal(true);

            type.setUseForOfLoop(false);

            expect(type['useForOfLoop']).to.be.deep.equal(false);
        });
    });

    describe('.getUseForOfLoop', (): void => {
        it('it should return boolean', (): void => {
            const name = 'Test';
            const type = new TypeInstance(name);

            expect(type.getUseForOfLoop()).to.be.equal(true);

            type.setUseForOfLoop(false);

            expect(type.getUseForOfLoop()).to.be.deep.equal(false);
        });
    });
});
