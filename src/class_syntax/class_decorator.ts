import { jbq } from '../core/jbq';
import { TypeWrapper } from '../core/type_wrapper';
import { JBQOptions, Constructor } from '../misc/typings';
import { jbqTypes } from '../type/mod';
import { ClassValidatorBuilder } from './class_validator_builder';

let TYPES = jbqTypes;

/**
 * Permanently changes the types used provided to the JBQ compilation
 * function by `@compile()` decorator.
 *
 * By default the `jbqTypes` `TypeWrapper` instance from `/core/type/mod` module is used.
 *
 * Changing default value will not affect the `jbqTypes`.
 * But changing the `jbqTypes` value affect this modules' default types.
 */
export function setDefaultTypes(types: TypeWrapper): void {
    TYPES = types;
}

interface CompileOptions {
    types?: TypeWrapper;
    options?: JBQOptions;
}

function isDataValidObject(
    validator: Function,
    data: unknown,
): data is Record<string | symbol, unknown> {
    const validationError = validator(data);
    if (validationError !== undefined) throw validationError;
    return true;
}

// TODO: support options.async = true
function addBuildMethod<T extends NewableFunction>(
    constructor: T,
    options: CompileOptions = {},
): void {
    const t = options.types === undefined ? TYPES : options.types;
    const builder = ClassValidatorBuilder.extract(constructor);

    const validators = jbq(t, { [constructor.name]: builder.getSchema() }, options.options);
    const validator = validators[constructor.name];

    constructor.prototype.build = function build(
        this: Record<string | symbol, unknown>,
        data: unknown,
    ): object | Promise<object> {
        if (isDataValidObject(validator, data)) {
            for (const property of builder.getProperties())
                this[property as string] = data[property as string];

            type CallbackMap = Map<string, CallableFunction>;
            for (const [property, buildDefault] of builder.getDefaults() as CallbackMap)
                if (this[property] === undefined) this[property] = buildDefault(this);

            let returnsPromise = false;
            const transformPromises: Promise<void>[] = [];

            for (const [property, transformFn] of builder.getTransforms() as CallbackMap) {
                const transformed = transformFn(this[property], this);
                if (transformed instanceof Promise) {
                    returnsPromise = true;
                    transformPromises.push(
                        transformed.then(
                            (value): void => {
                                this[property] = value;
                            },
                        ),
                    );
                } else {
                    this[property] = transformed;
                }
            }

            if (returnsPromise) return Promise.all(transformPromises).then((): object => this);
        }

        return this;
    };
}

/**
 * *Constructor decorator.*
 *
 * Adds a `.build` method to the the constructor prototype.
 */
export function compile(options?: CompileOptions): (C: Constructor) => void {
    return (constructor: Constructor): void => {
        addBuildMethod(constructor, options);
    };
}
