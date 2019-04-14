/**
 * Utility class that reduces the boilerplate code.
 * It enables easy `if` statement assessments.
 *
 * # Examples
 *
 *     const array: unkown = [10, 20, 30];
 *     if (TypeReflect.arrayOf(array, TypeReflect.string)) {
 *         // inside this block TypeScript will infer
 *         // that the array is of type string[]
 *     }
 *
 *     const checkIfUser = (v: any): v is User => {
 *         // if v is a User object return true
 *     }
 *     const responseBody: any = {};
 *     if (TypeReflect.objectShape(responseBody, checkIfUser)) {
 *         // inside this block TypeScript will infer
 *         // that the responseBody is User object
 *     }
 */
export class TypeReflect {
    public static boolean (value: any): value is boolean {
        return value === true || value === false;
    }

    public static number (value: any): value is number {
        return typeof value === 'number' && value === value;
    }

    public static bigInt (value: any): value is bigint {
        return typeof value === 'bigint';
    }

    public static string (value: any): value is string {
        return typeof value === 'string';
    }

    public static symbol (value: any): value is symbol {
        return typeof value === 'symbol';
    }

    public static object<T extends object = object> (value: any): value is T {
        return value instanceof Object && value !== null;
    }

    public static objectShape<T extends object = object> (
        value: any,
        valueCheck: (val: any, ...rest: any[]) => val is T,
    ): value is T {
        return valueCheck(value);
    }

    public static array<T = unknown> (value: any, allowEmpty?: boolean): value is T[] {
        return Array.isArray(value) && (allowEmpty || Boolean(value.length));
    }

    public static arrayOf<T = unknown> (
        value: any,
        elemCheck: (val: any, ...rest: any[]) => val is T,
        allowEmpty?: boolean,
    ): value is T[] {
        return Array.isArray(value)
            && value.every(elemCheck)
            && (allowEmpty || Boolean(value.length));
    }

    // tslint:disable-next-line:ban-types
    public static objectInstance<T = object> (value: any, constructor: Function): value is T {
        return value == null
            ? value
            : Object.getPrototypeOf(value).constructor.name === constructor.name;
    }

    /**
     * This function will return true if it's possible to
     * represent `value` argument as a literal.
     */
    public static primitiveLiteral (value: any): boolean {
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

// TODO: remove or uncomment
// export const as = {
//     string (str: string) {
//         return `\`${str.replace(/`/g, '\\`')}\``;
//     },
// };
