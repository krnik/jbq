import { TypeWrapper } from '../types/Wrapper';
import { parser } from './Parser';

export function VJS<T> (types: TypeWrapper, schemas: T) {
    return parser(types, schemas);
}
