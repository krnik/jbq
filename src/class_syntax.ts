export * from './class_syntax/alteration_decorator';
export * from './class_syntax/class_decorator';
export * from './class_syntax/validation_decorator';

export class Validator<HasAsyncTransforms extends boolean = false> {
    public build(data: unknown): HasAsyncTransforms extends true ? Promise<this> : this {
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
