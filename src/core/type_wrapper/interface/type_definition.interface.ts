import { SYM_TYPE_FOR_LOOP, SYM_TYPE_KEY_ORDER, SYM_TYPE_VALIDATE } from '../../../misc/constants';
import { TypeMethod, TypeValidationMethod } from './type_method.interface';

/**
 * Interface representing a shape of added to the type map type prototype.
 *
 * `[Symbol.for('type_key_order')]` - determines order in which the type
 * methods are used during creation of validation function. If not defined, the order
 * will depend on ECMASCript implementation.
 *
 * `[Symbol.for('type_validate')]` - must have as many methods as many methods
 * have TypeDefinition object. Methods in this object are used to validate if
 * value from schema can be accepted as an argument in TypeDefinition respective
 * method.
 *
 * # Example
 *
 *     const certainType = jbqTypes.get('any');
 *     // certain type shape
 *     {
 *        type (schemaValue, $DATA) {
 *          // method body used to create final validation function
 *        },
 *        required (schemaValue, $DATA) {
 *          // method body used to create final validation function
 *        },
 *        [Symbol.for('type_validate')]: {
 *            // method responsible for validation schema input
 *            // must throw on incorrect input
 *            type (schemaValue) {},
 *            required (schemaValue) {},
 *        },
 *        [Symbol.for('type_key_order')]: ['required', 'type'],
 *     }
 */
export interface TypeDefinition {
    [method: string]: TypeMethod;
    [SYM_TYPE_VALIDATE]: {
        [method: string]: TypeValidationMethod;
    };
    [SYM_TYPE_KEY_ORDER]: string[];
    [SYM_TYPE_FOR_LOOP]?: boolean;
}
