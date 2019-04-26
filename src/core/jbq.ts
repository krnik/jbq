import { ParameterName } from '../constants';
import { JBQOptions, OmitSymbols } from '../typings';
import { Compilation } from './compilation/compilation';
import { Schema } from './compilation/interface/schema.interface';
import { TypeWrapper } from './type_wrapper/type_wrapper';

const AsyncFnConstructor = Object.getPrototypeOf(async function*(): unknown {}).constructor;

type SyncValidationFunction = (data: unknown) => string | undefined;
type AsyncValidationFunction = (data: unknown) => Promise<string | undefined>;

type ValidationFn<T> = T extends { async: infer A }
    ? A extends true
        ? AsyncValidationFunction
        : SyncValidationFunction
    : SyncValidationFunction;

type Validators<T, O> = { [P in keyof OmitSymbols<T>]: ValidationFn<O> };

export function jbq<T, K extends keyof OmitSymbols<T>, O extends JBQOptions>(
    types: TypeWrapper,
    schemas: T,
    options?: O,
): Validators<T, O> {
    const patterns = Object.create(null) as Validators<T, O>;
    for (const [name, schema] of Object.entries(schemas) as [K, Schema][]) {
        const src = new Compilation(types, schema, name as string, options).execSync();

        if (options && typeof options.async === 'boolean') {
            const validate = new AsyncFnConstructor(
                ParameterName.Arguments,
                ParameterName.Data,
                src.code,
            );

            const bound = validate.bind(undefined, src.arguments);

            patterns[name] = (async function asyncValidationFunction(
                $DATA: unknown,
            ): Promise<string | undefined> {
                const generator = bound($DATA);
                while (true) {
                    const result = await generator.next();

                    if (result.value !== undefined) return result.value;
                    if (result.done) return;
                }
            } as unknown) as ValidationFn<O>;
        } else {
            const validate = new Function(ParameterName.Arguments, ParameterName.Data, src.code);
            patterns[name as K] = validate.bind(undefined, src.arguments);
        }
    }
    return patterns;
}
