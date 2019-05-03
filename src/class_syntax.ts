export * from './class_syntax/decorator/alteration_decorator';
export * from './class_syntax/decorator/class_decorator';
export * from './class_syntax/decorator/validation_decorator';
export * from './class_syntax/build_method_compile';

/**
 * Dummy class used to hint TypeScript that a class was compiled and has `build` method.
 */
export class Validator<HasAsyncTransforms extends boolean = false> {
    public build(data?: unknown): HasAsyncTransforms extends true ? Promise<this> : this {
        let dataJSON = '';
        try {
            dataJSON = JSON.stringify(data);
        } catch (err) {
            dataJSON = `${data}`;
        }
        const className = Object.getPrototypeOf(this).constructor.name;
        const errorMessage = `Validation class ${className} is using the default [build] method.\nTo use build method ensure that you marked that validator class should instantiate.\nData received: ${dataJSON}`;
        throw new Error(errorMessage);
    }
}

/**
 * Mapped type used to extract properties of a class.
 * Also just a hint for TypeScript.
 */
export type Shape<S extends object, M extends keyof S = never> = Pick<
    S,
    { [K in keyof S]: K extends M ? K : S[K] extends Function ? never : K }[keyof S]
>;
