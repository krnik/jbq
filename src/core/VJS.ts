import { TypeWrapper } from '../types/Wrapper';
import { Compilation } from './Compilation';

type ValidateFn = (data: any) => string | undefined;

type OmitSymbols<T> = Pick<T, { [K in keyof T]: K extends symbol ? never : K }[keyof T]>;

type Validators<T> = { [P in keyof OmitSymbols<T>]: ValidateFn };

export function VJS<T, K extends keyof OmitSymbols<T>> (
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
