import { jbq } from '../core/jbq';
import { TypeWrapper } from '../core/type_wrapper';
import { Constructor, JBQOptions } from '../misc/typings';
import { jbqTypes } from '../type/mod';
import { ClassValidatorBuilder } from './class_validator_builder';
import { TypeReflect } from '../util/type_reflect';
import { CodeGenerator } from '../core/code_gen';

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

enum Param {
    Data = '$DATA',
    Meta = '$META',
    Self = '$SELF',
    Validator = '$VALIDATOR',
}

export function compileClass(constructor: Constructor, options: CompileOptions = {}): void {
    const builder = ClassValidatorBuilder.extract(constructor);

    const Types = options.types === undefined ? TYPES : options.types;
    const { [constructor.name]: validator } = jbq(
        Types,
        { [constructor.name]: builder.getSchema() },
        options.options,
    );

    const properties = [...builder.getMeta().entries()];

    const metaArguments: unknown[] = [];
    const addArgument = (value: unknown): string => {
        const len = metaArguments.length;
        metaArguments.push(value);
        return `${Param.Meta}[${len}]`;
    };

    const builtBody = `
        const validationError = ${Param.Validator}(${Param.Data});
        if (validationError) {
            throw validationError;
        }

        const promises = [];
        ${properties.reduce((acc, [property, meta]): string => {
            acc = acc.concat('{');
            const accessor = TypeReflect.string(property)
                ? CodeGenerator.renderPropertyAccessor(property)
                : `[${addArgument(property)}]`;

            const selfProp = `${Param.Self}${accessor}`;
            const dataProp = '_resolved';

            acc = acc.concat(`
                const ${dataProp} = ${Param.Data} && ${Param.Data}${accessor};
                ${selfProp} = ${dataProp};
            `);

            if (meta.default !== undefined) {
                const defaultFn = addArgument(meta.default);
                acc = acc.concat(`
                    if (${selfProp} === undefined)
                        ${selfProp} = ${defaultFn}(${Param.Data});
                `);
            }

            if (meta.Constructor !== undefined) {
                const constructorFn = addArgument(meta.Constructor);
                if (meta.iterateOverData) {
                    acc = acc.concat(`
                        const len = ${selfProp} && ${selfProp}.length;
                        if (typeof len !== 'number')
                            throw new Error('@collection decorator supports array-like objects only');

                        for (let i = 0; i < len; i++) {
                            const value = new ${constructorFn}().build(${selfProp}[i]);
                            if (value instanceof Promise)
                                promises.push(value.then((d) => {
                                    ${selfProp}[i] = d;
                                }));
                            ${selfProp}[i] = value;
                        }
                    `);
                } else {
                    acc = acc.concat(`
                        const value = new ${constructorFn}().build(${dataProp});
                        if (value instanceof Promise)
                            promises.push(value.then((d) => {
                                ${selfProp} = d;
                            }));
                        ${selfProp} = value;
                    `);
                }
            }

            if (meta.transform !== undefined) {
                const transformFn = addArgument(meta.transform);
                acc = acc.concat(`
                    if (${selfProp} instanceof Promise) {
                        const value = ${selfProp}.then(() => {
                            return ${transformFn}(${selfProp}, ${Param.Self});
                        });
                        promises.push(value);
                        ${selfProp} = value;
                    } else {
                        const value = ${transformFn}(${selfProp}, ${Param.Self});
                        if (value instanceof Promise)
                            promises.push(value.then((d) => {
                                ${selfProp} = d;
                            }));
                        ${selfProp} = value;
                    }
                `);
            }
            return acc.concat('}');
        }, '')}

        return promises.length > 0
            ? Promise.all(promises).then(() => ${Param.Self})
            : ${Param.Self};
    `;

    const bound = new Function(Param.Validator, Param.Meta, Param.Self, Param.Data, builtBody).bind(
        undefined,
        validator,
        metaArguments,
    );
    type Obj = Record<string, unknown>;
    constructor.prototype.build = function build(this: Obj, data: unknown): Obj | Promise<Obj> {
        return bound(this, data);
    };
}
