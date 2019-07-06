import { Constructor } from '../misc/typings';

type ObjWithKeys<K extends string, V> = { [P in K]: V };

/**
 * Utility class that reduces the boilerplate code.
 * It enables easy `if` statement assessments.
 */
export class TypeReflect {
    public static boolean(value: unknown): value is boolean {
        return value === true || value === false;
    }

    public static number(value: unknown): value is number {
        return typeof value === 'number' && value === value;
    }

    public static bigInt(value: unknown): value is bigint {
        return typeof value === 'bigint';
    }

    public static string(value: unknown): value is string {
        return typeof value === 'string';
    }

    public static symbol(value: unknown): value is symbol {
        return typeof value === 'symbol';
    }

    public static object<T extends object = object>(value: unknown): value is T {
        return value instanceof Object && value !== null;
    }

    public static objectProps<P extends string, V = unknown>(
        value: unknown,
        keys: P[],
    ): value is ObjWithKeys<P, V> {
        return TypeReflect.object(value)
            ? keys.every((k): boolean => value.hasOwnProperty(k))
            : false;
    }

    public static array<T = unknown>(value: unknown, allowEmpty?: boolean): value is T[] {
        return Array.isArray(value) && (allowEmpty || Boolean(value.length));
    }

    public static arrayOf<T = unknown>(
        value: unknown,
        elemCheck: (val: unknown, ...rest: unknown[]) => val is T,
        allowEmpty?: boolean,
    ): value is T[] {
        return (
            Array.isArray(value) && value.every(elemCheck) && (allowEmpty || Boolean(value.length))
        );
    }

    public static instance<T extends Constructor>(
        value: unknown,
        constructor: T,
    ): value is InstanceType<T> {
        return value == null
            ? false
            : Object.getPrototypeOf(value).constructor.name === constructor.name;
    }

    /**
     * This function will return true if it's possible to
     * represent `value` argument as a literal.
     */
    public static primitiveLiteral(value: unknown): boolean {
        if (value == null) return true;
        switch (typeof value) {
            case 'string':
            case 'number':
            case 'boolean':
            case 'bigint':
                return true;
            default:
                return false;
        }
    }
}
