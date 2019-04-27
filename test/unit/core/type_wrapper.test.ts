import { expect } from 'chai';
import { SYM_TYPE_VALIDATE, TYPE_NAME } from '../../../src/misc/constants';
import { TypeWrapper } from '../../../src/core/type_wrapper/type_wrapper';
import { TypeArray } from '../../../src/type/array';
import { TypeBoolean } from '../../../src/type/boolean';
import { createTypes } from '../../../src/type/mod';
import { TypeDefinition } from '../../../src/core/type_wrapper/interface/type_definition.interface';

describe('Type Wrapper', (): void => {
    describe('.set()', (): void => {
        it('It should accept valid type', (): void => {
            new TypeWrapper().set(TYPE_NAME.ARRAY, TypeArray);
        });
        it('It should throw an error when adding if type is already declared', (): void => {
            expect(
                (): TypeWrapper =>
                    new TypeWrapper()
                        .set(TYPE_NAME.ARRAY, TypeArray)
                        .set(TYPE_NAME.ARRAY, TypeBoolean),
            ).to.throw();
        });
        it('It should reject type that lacks schema validation method', (): void => {
            const customType = {
                method(): void {},
            };
            expect(
                (): TypeWrapper =>
                    new TypeWrapper().set('customType', (customType as unknown) as TypeDefinition),
            ).to.throw();
        });
        it('It should throw an error when extending with non-existent type', (): void => {
            const customType = {
                method(): void {},
                [SYM_TYPE_VALIDATE]: {
                    method(): void {},
                },
            };
            expect(
                (): TypeWrapper =>
                    new TypeWrapper()
                        .set(TYPE_NAME.ARRAY, TypeArray)
                        .set('customType', customType, { type: TYPE_NAME.OBJECT }),
            ).to.throw();
        });
        it('It should extend custom type with existing one', (): void => {
            const customType = {
                method(): void {},
                [SYM_TYPE_VALIDATE]: {
                    method(): void {},
                },
            };
            const types = new TypeWrapper()
                .set(TYPE_NAME.ARRAY, TypeArray)
                .set('customType', customType, { type: TYPE_NAME.ARRAY });
            const custom = types.get('customType') as TypeDefinition;
            expect(custom).to.be.an('object');
            expect(custom).to.have.property('method');
            expect(custom[SYM_TYPE_VALIDATE].method).to.be.a('function');
            for (const key of Object.keys(TypeArray)) {
                expect(custom[key]).to.be.an('function');
                expect(custom[SYM_TYPE_VALIDATE][key]).to.be.an('function');
            }
        });
        it('It should extend types multiple times', (): void => {
            const customType = {
                method(): void {},
                [SYM_TYPE_VALIDATE]: {
                    method(): void {},
                },
            };
            const anotherCustomType = {
                anotherMethod(): void {},
                [SYM_TYPE_VALIDATE]: {
                    anotherMethod(): void {},
                },
            };
            const types = new TypeWrapper()
                .set(TYPE_NAME.ARRAY, TypeArray)
                .set('customType', customType, { type: TYPE_NAME.ARRAY })
                .set('anotherCustomType', anotherCustomType, { type: 'customType' });
            const anotherCustom = types.get('anotherCustomType') as TypeDefinition;
            expect(anotherCustom).to.be.an('object');
            expect(anotherCustom).to.have.property('anotherMethod');
            expect(anotherCustom[SYM_TYPE_VALIDATE].anotherMethod).to.be.an('function');
            for (const key of ['method', ...Object.keys(TypeArray)]) {
                expect(anotherCustom[key]).to.be.an('function');
                expect(anotherCustom[SYM_TYPE_VALIDATE][key]).to.be.an('function');
            }
        });
    });
    describe('.has()', (): void => {
        it('It should return boolean', (): void => {
            const types = new TypeWrapper();
            types.set(TYPE_NAME.ARRAY, TypeArray);
            expect(types.has(TYPE_NAME.ARRAY)).to.be.equal(true);
            expect(types.has(TYPE_NAME.BOOLEAN)).to.be.equal(false);
        });
    });
    describe('.get()', (): void => {
        it('It should return type if it exists', (): void => {
            const types = new TypeWrapper().set(TYPE_NAME.ARRAY, TypeArray);
            expect(types.get(TYPE_NAME.ARRAY)).to.be.equal(TypeArray);
        });
        it('It should return undefined if type does not exists', (): void => {
            const types = new TypeWrapper();
            expect(types.get(TYPE_NAME.ARRAY)).to.be.equal(undefined);
        });
    });
    describe('.addMethod()', (): void => {
        it('it should succesfully ad a method', (): void => {
            const types = createTypes();
            types.addMethod('any', 'newMethod', (): void => void 0, (): void => void 0);
            const typeAny = types.get('any') as TypeDefinition;
            expect(typeAny).to.haveOwnProperty('newMethod');
        });
        it('it should throw if method exists', (): void => {
            const types = createTypes();
            expect(
                (): TypeWrapper =>
                    types.addMethod('any', 'type', (): void => void 0, (): void => void 0),
            ).to.throw();
        });
        it('it should throw if type does not exists', (): void => {
            const types = createTypes();
            expect(
                (): TypeWrapper =>
                    types.addMethod('missing', 'type', (): void => void 0, (): void => void 0),
            ).to.throw();
        });
    });
});
