import { TypeWrapper } from '../types/Wrapper';
import { Parser } from './Parser';

export function VJS<T> (types: TypeWrapper, schemas: T) {
    return Parser.compile(types, schemas);
}
