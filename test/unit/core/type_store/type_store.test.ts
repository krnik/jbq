import { expect } from 'chai';
import { TypeStore } from '../../../../src/core/type_store';
import { TypeInstance } from '../../../../src/core/type_store/type_instance';
import { catchError } from '../../../utils';

describe('TypeStore', (): void => {
    describe('.constructor', (): void => {
        it('it should create TypeStore instance with default properties', (): void => {
            const store = new TypeStore();

            expect(store['types']).to.be.instanceOf(Map);
            expect(store['types'].size).to.be.equal(0);
        });
    });

    describe('.addType', (): void => {
        it('it should add new type instance', (): void => {
            const name = 'Test';
            const type = new TypeInstance(name);

            const store = new TypeStore().addType(type);
            expect(store['types'].size).to.be.equal(1);

            const stored = store.getType('Test');
            expect(stored === type).to.be.equal(true);
        });

        it('it should not overwrite type if type already exists', (): void => {
            const name = 'Test';
            const type = new TypeInstance(name);
            const type1 = new TypeInstance(name).setUseForOfLoop(false);

            // @ts-ignore
            catchError((): never => new TypeStore().addType(type).addType(type1));
        });
    });

    describe('.hasType', (): void => {
        it('it should return true if type exists', (): void => {
            const name = 'Test';
            const type = new TypeInstance(name);
            const store = new TypeStore().addType(type);

            expect(store.hasType(name)).to.be.equal(true);
        });

        it('it should return false if type does not exists', (): void => {
            const name = 'Test';
            const store = new TypeStore();

            expect(store.hasType(name)).to.be.equal(false);
        });
    });

    describe('.getType', (): void => {
        it('it should return type, when exists', (): void => {
            const name = 'Test';
            const type = new TypeInstance(name);
            const store = new TypeStore().addType(type);

            const extracted = store.getType('Test');
            expect(extracted).to.be.an('object');
            expect(extracted instanceof TypeInstance).to.be.equal(true);
        });

        it('it should return undefined if type does not exists', (): void => {
            const name = 'Test';
            const store = new TypeStore();

            // @ts-ignore
            catchError((): never => store.getType(name));
        });
    });

    describe('.getTypeNames', (): void => {
        it('it should return an array of type names', (): void => {
            const store = new TypeStore();
            expect(store.getTypeNames())
                .to.be.an('array')
                .that.have.lengthOf(0);

            const names = ['Test1', 'Test2', 'Test3'];
            store.addType(new TypeInstance(names[0]));
            expect(store.getTypeNames())
                .to.be.an('array')
                .that.have.lengthOf(1);

            store.addType(new TypeInstance(names[1]));
            expect(store.getTypeNames())
                .to.be.an('array')
                .that.have.lengthOf(2);

            store.addType(new TypeInstance(names[2]));
            expect(store.getTypeNames())
                .to.be.an('array')
                .that.have.lengthOf(3);
        });
    });
});
