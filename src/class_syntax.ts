export * from './class_syntax/decorator';

/**
 * Dummy class used to hint TypeScript that a class was compiled and has `build` method.
 *
 * # Example
 * #example:class_syntax
 */
export class Validator<HasAsyncTransforms extends boolean = false> {
    public from(data?: unknown): HasAsyncTransforms extends true ? Promise<this> : this {
        let dataJSON = '';
        try {
            dataJSON = JSON.stringify(data);
        } catch (err) {
            dataJSON = `${data}`;
        }
        const className = Object.getPrototypeOf(this).constructor.name;
        const errorMessage = `Validation class ${className} is using the default [from] method.
        To use build method ensure that you decorated class with @compile() decorator.
        Data received: ${dataJSON}`;
        throw new Error(errorMessage);
    }
}
