import { OmitSymbols, Any } from '../misc/typings.ts';
import { Compilation } from './compilation.ts';
import { ParameterName, Schema } from './compilation/compilation_typings.ts';
import { Options, ValidationResult } from './jbq/jbq_typings.ts';
import { TypeStore } from './type_store.ts';

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
 *     
 *     
 *     
 *     
 *     const userSchema = {                //  Define `userSchema`
 *         type: 'object',                 //  ▶ that is an object
 *         properties: ['names', 'email'], //  ▶ that can have only two properies 'names' and 'email'
 *         [SYM_PROPERTIES]: {             //  ▶ properties of this object have following schemas
 *             names: {                    //  ⯁ `names` property:
 *                 type: 'array',          //      ▷ is an array
 *                 len: 2,                 //      ▷ that have length equal 2
 *                 [SYM_COLLECTION]: {     //      ▷ all items in this array
 *                     type: 'string',     //      ▷ are strings
 *                 },                      //
 *             },                          //
 *             email: {                    //  ⯁ `email` property
 *                 type: 'string',         //      ▷ is a string
 *             },                          //
 *         },                              //
 *     };                                  //
 *     
 *     const schemas = {
 *         User: userSchema,
 *         TwoChars: {                     //  Define `TwoChars` schema
 *             type: 'string',             //  ▶ that is a string
 *             len: 2,                     //  ▶ that have length equal 2
 *         },
 *     };
 *     
 *     
 *     const { TwoChars, User } = jbq(types, schemas);
 *     
 *     equal(TwoChars('AA'), undefined);
 *     equal(TwoChars('  '), undefined);
 *     equal(typeof TwoChars('Kenobi'), 'object');
 *     
 *     const validUsers = [
 *         { email: 'some_string', names: ['Git', 'Hub'] },
 *         { email: '', names: ['John', 'Doe'] },
 *     ];
 *     validUsers.forEach(
 *         (userData): void => {
 *             equal(User(userData), undefined);
 *         },
 *     );
 *     
 *     const invalidUsers = [
 *         { names: ['A', 'B'] },
 *         { email: '\@test.com', names: [] },
 *         { email: '\@test.com', names: ['Boolean', true] },
 *     ];
 *     invalidUsers.forEach(
 *         (userData): void => {
 *             equal(typeof User(userData), 'object');
 *         },
 *     );
 *     
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
