import { CodeGenerator } from '../../core/code_gen';
import { Schema } from '../../core/compilation/compilation_typings';
import { jbq } from '../../core/jbq';
import { Options } from '../../core/jbq/jbq_typings';
import { TypeStore } from '../../core/type_store';
import { types } from '../../lib';
import { Any } from '../../misc/typings';
import { TypeReflect } from '../../util/type_reflect';
import { ValidatorBuilder } from '../validator_builder';

let TYPE_STORE: TypeStore<Any> = types;

/**
 * Permanently changes the types used provided to the JBQ compilation
 * function by `@compile()` decorator.
 *
 * By default the `types` `TypeStore` instance from `/core/type/mod` module is used.
 *
 * Changing default value will not affect the `types`.
 * But changing the `types` value affect this modules' default types.
 */
export function setDefaultTypes(types: TypeStore): void {
    TYPE_STORE = types;
}

interface CompileDecoratorOptions {
    types?: TypeStore;
    options?: Options;
}

function compileValidator(
    schema: Schema,
    schemaName: string,
    types: TypeStore,
    options?: Options,
): [boolean, Function] {
    const isAsync = Boolean(options && options.async);
    const { [schemaName]: validator } = jbq(types, { [schemaName]: schema }, options);
    return [isAsync, validator];
}

function buildFromMethod(constructor: Function, options: CompileDecoratorOptions): Function {
    const enum Param {
        Data = '$DATA',
        Meta = '$META',
        Self = '$SELF',
        Validator = '$VALIDATOR',
    }

    const builder = ValidatorBuilder.extract(constructor).buildSchema();
    const [classMeta, propertiesMeta] = builder.getMeta();
    const className = constructor.name;
    const store = options.types || TYPE_STORE;

    const metaArguments: unknown[] = [];
    const addArgument = (value: unknown): string => {
        const len = metaArguments.length;
        metaArguments.push(value);
        return `${Param.Meta}[${len}]`;
    };

    const [isAsync, validator] = compileValidator(
        classMeta.schema,
        className,
        store,
        options.options,
    );

    const propertyAssignsChunks = Array.from(propertiesMeta.entries()).map(
        ([propertyName, meta]): string => {
            const property = meta.dataPropertyPath || propertyName;

            const selfAccessor = TypeReflect.string(propertyName)
                ? CodeGenerator.renderPropertyAccessor(propertyName)
                : `[${addArgument(propertyName)}]`;

            const dataAccessor = TypeReflect.string(property)
                ? CodeGenerator.renderPropertyAccessor(property)
                : `[${addArgument(property)}]`;

            const selfProperty = `${Param.Self}${selfAccessor}`;
            const dataProperty = `${Param.Data}_property`;

            const assignToSelf = `
            const ${dataProperty} = ${Param.Data} && ${Param.Data}${dataAccessor};
            ${selfProperty} = ${dataProperty};
            `;

            let getDefault = '';
            if (meta.defaultFn !== undefined) {
                const defaultFn = addArgument(meta.defaultFn);
                getDefault = `
                    if (${selfProperty} === undefined)
                        ${selfProperty} = ${defaultFn}(${Param.Data});
                `;
            }

            let instantiate = '';
            if (meta.Constructor !== undefined) {
                const Constructor = addArgument(meta.Constructor);
                if (meta.isConstructorForItems) {
                    instantiate = `
                        const len = ${selfProperty} && ${selfProperty}.length;
                        if (typeof len !== 'number')
                            throw new Error('@collectionOf decorator supports array-like objects only.');

                        for (let i = 0; i < len; i++) {
                            const val = new ${Constructor}().from(${selfProperty}[i]);
                            if (val instanceof Promise) {
                                ${selfProperty}[i] = val.then((instance) => {
                                    ${selfProperty}[i] = instance;
                                });
                                promises.push(${selfProperty});
                            } else {
                                ${selfProperty}[i] = val;
                            }
                        }
                    `;
                } else {
                    instantiate = `
                        const val = new ${Constructor}().from(${dataProperty});
                        if (val instanceof Promise) {
                            ${selfProperty} = val.then((instance) => {
                                ${selfProperty} = instance;
                            });
                            promises.push(${selfProperty});
                        } else {
                            ${selfProperty} = val;
                        }
                    `;
                }
            }

            let transform = '';
            if (meta.transformFn !== undefined) {
                const transformFn = addArgument(meta.transformFn);
                transform = `
                    if (${selfProperty} instanceof Promise) {
                        ${selfProperty} = ${selfProperty}.then(() => {
                            return ${selfProperty} = ${transformFn}(${selfProperty}, ${Param.Self});
                        });
                        promises.push(${selfProperty});
                    } else {
                        const val = ${transformFn}(${selfProperty}, ${Param.Self});
                        if (val instanceof Promise) {
                            ${selfProperty} = val.then((result) => {
                                ${selfProperty} = result;
                            });
                            promises.push(${selfProperty});
                        } else {
                            ${selfProperty} = val;
                        }
                    }
                `;
            }
            return `{${assignToSelf}${getDefault}${instantiate}${transform}}`;
        },
    );

    const buildBody = (isAsync: boolean, mainBlocks: string): string =>
        isAsync
            ? `return ${Param.Validator}(${Param.Data})
                .then((_validation_result) => {
                    if (_validation_result) {
                        throw _validation_result;
                    }
                    ${mainBlocks}
                });`
            : `const validationError = ${Param.Validator}(${Param.Data})
                if (validationError) {
                    throw validationError;
                }
                ${mainBlocks}
            `;
    const body = buildBody(
        isAsync,
        `
        const promises = [];
        ${propertyAssignsChunks.join('\n')}
        return promises.length > 0
            ? Promise.all(promises).then(() => ${Param.Self})
            : ${Param.Self};
    `,
    );

    const bound = new Function(Param.Validator, Param.Meta, Param.Self, Param.Data, body).bind(
        undefined,
        validator,
        metaArguments,
    );

    return bound;
}

/**
 * Compiles the schema of class and creates propert `[from]` method for class.
 */
export const compile: (options?: CompileDecoratorOptions) => ClassDecorator = (
    options?: CompileDecoratorOptions,
): ClassDecorator => (constructor: Function): void => {
    constructor.prototype.from = function(data: unknown): unknown {
        const fromMethod = buildFromMethod(constructor, options || {});

        constructor.prototype.from = function(data: unknown): void {
            return fromMethod(this, data);
        };

        return fromMethod(this, data);
    };
};
