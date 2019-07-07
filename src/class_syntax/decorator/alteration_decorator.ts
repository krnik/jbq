import { ClassValidatorBuilder } from '../class_validator_builder';

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
 */
export const withDefault = <T = unknown, R = unknown>(
    buildDefault: (data: T) => R,
): PropertyDecorator => (prototype: object, property: string | symbol): void => {
    ClassValidatorBuilder.extract(prototype.constructor).addDefault(property, buildDefault);
};

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
 */
export const transform = <P, D, R>(callback: (property: P, data: D) => R): PropertyDecorator => (
    prototype: object,
    property: string | symbol,
): void => {
    const builder = ClassValidatorBuilder.extract(prototype.constructor);
    builder.addTransform(property, callback);
};
