import { SYM_TYPE_FOR_LOOP, SYM_TYPE_KEY_ORDER, SYM_TYPE_VALIDATE } from '../../../constants';
import { OmitSymbols } from '../../../typings';
import { TypeMethod, TypeValidationMethod } from './type_method.interface';

/**
 * Type that represents all regular methods of TypePrototype that are used
 * during creation of validation function.
 */
type TypePrototypeMethods<T> = { [K in keyof T]: TypeMethod };

/**
 * Type that represents all symbol properties of TypePrototype.
 *
 *     Symbol.for('type_validate')
 *     Symbol.for('type_key_order')
 *     Symbol.for('type_for_loop')
 */
interface TypePrototypeSymbols<T> {
    [SYM_TYPE_VALIDATE]: { [K in keyof T]: TypeValidationMethod };
    [SYM_TYPE_FOR_LOOP]?: boolean;
    [SYM_TYPE_KEY_ORDER]?: string[];
}

export type TypePrototype<T> = TypePrototypeMethods<OmitSymbols<T>> &
    TypePrototypeSymbols<OmitSymbols<T>>;
