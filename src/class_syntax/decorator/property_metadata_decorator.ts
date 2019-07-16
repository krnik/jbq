import { Some } from '../../misc/typings';
import { PropertyMetadata } from '../property_metadata';
import { ValidatorBuilder } from '../validator_builder';

type DecoratorFactory<V> = (value: V) => PropertyDecorator;
const propMetaDecoratorFactory = <
    K extends keyof PropertyMetadata,
    V extends Some<PropertyMetadata[K]>
>(
    keyword: K,
): DecoratorFactory<V> => (value: V): PropertyDecorator => (
    prototype: object,
    property: string | symbol,
): void => {
    ValidatorBuilder.extract(prototype.constructor)
        .getPropertyMetadata(property)
        .setValue(keyword, value);
};
/**
 * **Property decorator.**
 *
 * **Applies only to instances.**
 *
 * Defines default value factory for a property.
 *
 * Evaluated only if property instances' property resolves to undefined.
 *
 * The return value of provided function will be
 * assigned to a property. As a first argument default factory will receive
 * data that is received during building instance.
 *
 * # Example
 * #example:class_syntax_with_default
 */
export const withDefault = propMetaDecoratorFactory('defaultFn');

/**
 * **Property decorator.**
 *
 * **Applies only to instances.**
 *
 * Defines the transformation function for a property.
 *
 * Transformations are evaluated at the end of building instance.
 *
 * Transformation function will set property value to a return value of a
 * callback provided to the decorator function.
 *
 * If transformation function returns Promise then the `.build` method of a
 * class will also return Promise that eventually will resolve to the class
 * instance. Since TypeScript does not support changing the class signature
 * via decorators this behaviour needs to be manually `hinted` by setting
 * `true` value in a generic parameter of `Validator` class.
 *
 * # Example
 * #example:class_syntax_transform
 */
export const transform = propMetaDecoratorFactory('transformFn');

// Data path
export const path = propMetaDecoratorFactory('dataPropertyPath');

// SYM_COLLECTION
export const collectionOf = (value: Function): PropertyDecorator => {
    return (prototype: object, property: string | symbol): void => {
        ValidatorBuilder.extract(prototype.constructor)
            .getPropertyMetadata(property)
            .setValue('isConstructorForItems', true)
            .setValue('Constructor', value);
    };
};

// SYM_PROPERTIES
export const shape = (value: Function): PropertyDecorator => {
    return (prototype: object, property: string | symbol): void => {
        ValidatorBuilder.extract(prototype.constructor)
            .getPropertyMetadata(property)
            .setValue('Constructor', value);
    };
};
