import { TypeWrapper } from '../types/Wrapper';
import { parser } from './Parser';

export function VJS<T> (types: TypeWrapper, schemas: T) {
    const result = parser(types, schemas);
    // TODO: add acl
    return result;
}
