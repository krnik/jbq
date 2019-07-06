import { TypeInstance } from './type_store/type_instance';
import { Option } from '../misc/typings';
import { TypeStoreError } from './type_store/type_store_error';

/**
 * Used to represent the typestate of empty TypeStore instance.
 */
type Empty = ['__empty__', '__empty__', undefined];

/**
 * Represents single Type in the TypeStore instance.
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

/**
 * Extracts single Type out of TypeStore.
 */
type Extract<T extends TypeSignature, P extends T['0']> = T extends [infer N, infer M, infer D]
    ? N extends P
        ? M extends Option<string>
            ? D extends Option<string>
                ? TypeInstance<N, M, D>
                : never
            : never
        : never
    : never;

export class TypeStore<T extends TypeSignature = Empty> {
    private types: Map<T['0'], TypeInstance<string, Option<string>, Option<string>>> = new Map();

    public addType<N extends string, M extends Option<string>, D extends Option<string>>(
        type: TypeInstance<NotIn<N, T>, M, D>,
    ): TypeStore<Types<T | [N, M, D]>> {
        if (this.types.has(type.name)) {
            throw TypeStoreError.typeAlreadyExists(type.name);
        }

        this.types.set((type.name as unknown) as T['0'], type);
        return (this as unknown) as TypeStore<Types<T | [N, M, D]>>;
    }

    public hasType<N extends string>(typeName: N): boolean {
        return this.types.has(typeName);
    }

    public getType<N extends T['0']>(typeName: N): Extract<T, N> {
        if (!this.types.has(typeName)) {
            throw TypeStoreError.typeNotFound(typeName);
        }

        return this.types.get(typeName) as Extract<T, N>;
    }

    public getTypeNames(): string[] {
        return Array.from(this.types.keys());
    }
}
