import { ParameterName } from '../constants';
import { JBQOptions, OmitSymbols } from '../typings';
import { Compilation } from './compilation/compilation';
import { TypeWrapper } from './type_wrapper/type_wrapper';

const AsyncFnConstructor = Object
    // tslint:disable-next-line:no-empty
    .getPrototypeOf(async function* (): unknown { })
    .constructor;

type ValidateFn = (data: any) => string | undefined;
type AsyncValidateFn = (data: any) => Promise<string | undefined>;

type Validators<T, F> = { [P in keyof OmitSymbols<T>]: F };

export function jbq<T, K extends keyof OmitSymbols<T>> (
    types: TypeWrapper,
    schemas: T,
    options: JBQOptions = {},
    async?: boolean,
) {
    type ValidationFunction = typeof async extends true ? ValidateFn : AsyncValidateFn;
    const patterns = {} as Validators<T, ValidationFunction>;
    for (const [name, schema] of Object.entries(schemas)) {
        const src = new Compilation(types, schema, name, options).execSync();

        if (typeof async === 'boolean') {
            const validate = new AsyncFnConstructor(
                ParameterName.Arguments,
                ParameterName.Data,
                src.code,
            );
            const bound = validate.bind(undefined, src.arguments);
            patterns[name as K] = async function asyncValidationFunction ($DATA: any): Promise<string | undefined> {
                for await (const result of bound($DATA))
                    if (result)
                        return result;
            };
        } else {
            const validate = new Function(ParameterName.Arguments, ParameterName.Data, src.code);
            patterns[name as K] = validate.bind(undefined, src.arguments);

        }
    }
    return patterns;
}
