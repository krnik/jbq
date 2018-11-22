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
        const src = new Compilation(types, name, schema, debug).exec();
        const validate = new Function([...src.parameters, src.dataParameter].toString(), src.code);
        patterns[name as K] = validate.bind(undefined, ...src.arguments);
    }
    return patterns;
}
