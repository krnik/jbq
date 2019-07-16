import { TypeInstance } from './type_store/type_instance.ts';
import { Option } from '../misc/typings.ts';
import { TypeStoreError } from './type_store/type_store_error.ts';

/**
 * Used to represent the typestate of empty TypeStore instance.
 */
type Empty = ['__empty__', '__empty__', undefined];

/**
 * Represents single Type in the TypeStore instance.
 *
 * `T[0]` - Equivalent of `TypeInstance`s' `N` generic argument - name of a type.
 *
 * `T[1]` - Equivalent of `TypeInstance`s' `M` generic argument - names of keywords.
 *
 * `T[2]` - Equivalent of `TypeInstance`s' `D` generic argument - name of derived type.
 */
type TypeSignature = [string, Option<string>, Option<string>];

/**
 * Represents the typestate of TypeStore instance.
 */
type Types<T> = Exclude<T, Empty>;

/**
 * Disallows use of T that is one of keys that already exist in TypeStore
 * instances.
 */
type NotIn<T extends string, P extends TypeSignature> = T extends P['0'] ? never : T;

/* eslint-disable prettier/prettier */
/**
 * Extracts single Type out of TypeStore.
 */
type Extract<T extends TypeSignature, P extends T['0']> = T extends [infer N, infer M, infer D]
    ? N extends P
        // @ts-ignore
        ? TypeInstance<N, M, D>
        : never
    : never;
/* eslint-enable prettier/prettier */

/**
 * `TypeStore<TypeSignature>`. A class that stores all types that should be used during schema compilation.
 */
export class TypeStore<T extends TypeSignature = Empty> {
    private types: Map<T['0'], TypeInstance<string, Option<string>, Option<string>>> = new Map();

    /**
     * Adds a type to the store. Cannot add a type with name that already exists
     * in the store.
     *
     * # Example
     *     
     *     
     *     
     *     // TypeStore<['__empty__', '__empty__', undefined]>
     *     const store = new TypeStore();
     *     deepEqual(store.getTypeNames(), []);
     *     
     *     // TypeStore<['any', 'type' | 'required', undefined]>
     *     const tAny = store.addType(TypeAny);
     *     deepEqual(store.getTypeNames(), ['any']);
     *     
     *     // TypeStore<
     *     // | ['any', 'type' | 'required', undefined]
     *     // | ['array', 'type' | 'every' | 'some', 'includes', 'len', 'any']
     *     // >;
     *     tAny.addType(TypeArray);
     *     deepEqual(tAny.getTypeNames(), ['any', 'array']);
     *     
     */
    public addType<N extends string, M extends Option<string>, D extends Option<string>>(
        type: TypeInstance<NotIn<N, T>, M, D>,
    ): TypeStore<Types<T | [N, M, D]>> {
        if (this.types.has(type.name)) {
            throw TypeStore.Error.typeAlreadyExists(type.name);
        }

        this.types.set((type.name as unknown) as T['0'], type);
        return (this as unknown) as TypeStore<Types<T | [N, M, D]>>;
    }

    /**
     * Returns `true` if type with provided name has been added to the store.
     */
    public hasType<N extends string>(typeName: N): boolean {
        return this.types.has(typeName);
    }

    /**
     * Returns `TypeInstance` instance if it was previously added to the store.
     *
     * # Example
     *     
     *     
     *     
     *     const store = new TypeStore().addType(TypeAny).addType(TypeArray);
     *     
     *     // TypeInstance<'any', 'type' | 'required', undefined>
     *     const anyType = store.getType('any');
     *     equal(anyType instanceof TypeInstance, true);
     *     equal(anyType.name, 'any');
     *     
     *     // TypeInstance<'array', 'type' | 'every' | 'some', 'includes', 'len', 'any'>
     *     const arrayType = store.getType('array');
     *     equal(arrayType instanceof TypeInstance, true);
     *     equal(arrayType.name, 'array');
     *     
     *     try {
     *         // @ts-ignore
     *         store.getType('null');
     *     } catch (err) {
     *         // Error: no such type 'null'.
     *     }
     *     
     */
    public getType<N extends T['0']>(typeName: N): Extract<T, N> {
        if (!this.types.has(typeName)) {
            throw TypeStore.Error.typeNotFound(typeName);
        }

        return this.types.get(typeName) as Extract<T, N>;
    }

    /**
     * Returns an array of names of all types that has been added to the store.
     *
     * # Example
     *     
     *     
     *     
     *     const store = new TypeStore().addType(TypeAny).addType(TypeNumber);
     *     
     *     // ('any' | 'number')[]
     *     const typeNames = store.getTypeNames();
     *     deepEqual(typeNames, ['any', 'number']);
     *     
     */
    public getTypeNames(): T[0][] {
        return Array.from(this.types.keys());
    }

    private static Error = TypeStoreError;
}
