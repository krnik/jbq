import { compile } from './class_syntax/class_decorator';

export * from './class_syntax/alteration_decorator';
export * from './class_syntax/class_decorator';
export * from './class_syntax/validation_decorator';

export class Validator<HasAsyncTransforms extends boolean = false> {
    public build(data: unknown): HasAsyncTransforms extends true ? Promise<this> : this {
        const errorMessage = `One of validation classes is using default .build method which should be overwritten by @compile() decorator.\nData received:${data}.`;
        throw new Error(errorMessage);
    }
    public constructor(_data: unknown) {}
}
