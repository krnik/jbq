import { PARAMETER } from '../constants';
import { TypeWrapper } from '../types/Wrapper';
import { OmitSymbols } from '../typings';
import { Compilation } from './Compilation';

type ValidateFn = (data: any) => string | undefined;

type Validators<T> = { [P in keyof OmitSymbols<T>]: ValidateFn };

export function jbq<T, K extends keyof OmitSymbols<T>> (
    types: TypeWrapper,
    schemas: T,
    debug: boolean = false,
) {
    const patterns = {} as Validators<T>;
    for (const [name, schema] of Object.entries(schemas)) {
        const src = new Compilation(types, schema, name, { debug }).execSync();
        const validate = new Function(PARAMETER.ARGUMENTS, PARAMETER.DATA, src.code);
        patterns[name as K] = validate.bind(undefined, src.arguments);
    }
    return patterns;
}
