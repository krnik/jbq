import { PARAMETER } from '../constants';
import { IJBQOptions, OmitSymbols } from '../typings';
import { Compilation } from './Compilation';
import { TypeWrapper } from './type_wrapper/type_wrapper';

type ValidateFn = (data: any) => string | undefined;

type Validators<T> = { [P in keyof OmitSymbols<T>]: ValidateFn };

export function jbq<T, K extends keyof OmitSymbols<T>> (
    types: TypeWrapper,
    schemas: T,
    options?: IJBQOptions,
) {
    const patterns = {} as Validators<T>;
    for (const [name, schema] of Object.entries(schemas)) {
        const src = new Compilation(types, schema, name, options).execSync();
        const validate = new Function(PARAMETER.ARGUMENTS, PARAMETER.DATA, src.code);
        patterns[name as K] = validate.bind(undefined, src.arguments);
    }
    return patterns;
}
