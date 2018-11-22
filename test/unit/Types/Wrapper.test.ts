import { expect } from 'chai';
import { SYM_TYPE_VALIDATE, TYPE_NAME } from '../../../src/constants';
import { TypeArray } from '../../../src/types/Array';
import { TypeBoolean } from '../../../src/types/Boolean';
import { TypeWrapper } from '../../../src/types/Wrapper';

export default () => describe('Wrapper', () => {
    describe('.set()', () => {
        it('It should accept valid type', () => {
            new TypeWrapper().set(TYPE_NAME.ARRAY, TypeArray);
        });
        it('It should throw an error when adding if type is already declared', () => {
            expect(() => new TypeWrapper()
                .set(TYPE_NAME.ARRAY, TypeArray)
                .set(TYPE_NAME.ARRAY, TypeBoolean)).to.throw();
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
            expect(() => new TypeWrapper()
                .set(TYPE_NAME.ARRAY, TypeArray)
                .set('customType', customType, { type: TYPE_NAME.OBJECT })).to.throw();
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
                .set('customType', customType, { type: TYPE_NAME.ARRAY });
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
                .set('customType', customType, { type: TYPE_NAME.ARRAY })
                .set('anotherCustomType', anotherCustomType, { type: 'customType' });
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
