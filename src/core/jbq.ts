import { OmitSymbols, Any } from '../misc/typings';
import { Compilation } from './compilation';
import { ParameterName, Schema } from './compilation/compilation_typings';
import { Options, ValidationResult } from './jbq/jbq_typings';
import { TypeStore } from './type_store';

type SyncValidationFunction = <T>(data: T) => ValidationResult;
type AsyncValidationFunction = <T>(data: T) => Promise<ValidationResult>;

type ResolvedValidationFunction<Opt extends Partial<Options>> = Opt extends {
    async: infer Async;
}
    ? Async extends true
        ? AsyncValidationFunction
        : SyncValidationFunction
    : SyncValidationFunction;

type JBQValidators<Schemas, Opt extends Partial<Options>> = {
    [P in keyof OmitSymbols<Schemas>]: ResolvedValidationFunction<Opt>
};

const AsyncFnConstructor = Object.getPrototypeOf(async function*(): unknown {}).constructor;

function AsyncFnFactory(fn: GeneratorFunction): AsyncValidationFunction {
    return async function asyncValidationFunction($DATA: unknown): Promise<ValidationResult> {
        const generator = fn($DATA);
        while (true) {
            const result = await generator.next();

            if (result.value !== undefined) return result.value;
            if (result.done) return;
        }
    };
}

/**
 * Compiles `schemas` using `types` instance as source of validation code.
 *
 * # Examples
 * #example:usage
 */
export function jbq<Schemas, SchemaKeys extends keyof OmitSymbols<Schemas>, Opt extends Options>(
    types: TypeStore<Any>,
    schemas: Schemas,
    options?: Opt,
): JBQValidators<Schemas, Opt> {
    const validationFunctions = Object.create(null) as JBQValidators<Schemas, Opt>;

    for (const [name, schema] of Object.entries(schemas) as [SchemaKeys, Schema][]) {
        const src = new Compilation(types, schema, name as string, options).execSync();

        try {
            if (!options || !options.async) {
                const validationFunction = new Function(
                    ParameterName.Arguments,
                    ParameterName.Data,
                    src.code,
                );
                validationFunctions[name] = validationFunction.bind(undefined, src.arguments);
                continue;
            }

            const validationFunction = new AsyncFnConstructor(
                ParameterName.Arguments,
                ParameterName.Data,
                src.code,
            ).bind(undefined, src.arguments);

            validationFunctions[name] = (AsyncFnFactory(
                validationFunction,
            ) as unknown) as ResolvedValidationFunction<Opt>;
        } catch (err) {
            console.log(src.code);
            throw err;
        }
    }

    return validationFunctions;
}
