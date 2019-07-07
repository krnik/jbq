import { Constructor } from '../../misc/typings';
import { ClassValidatorBuilder } from '../class_validator_builder';

/**
 * *Constructor decorator.*
 *
 * Hints compiler that this class should be used to create instance if nested inside
 * another class.
 *
 * Default behavior for a nested class is a `schema provider`. That means that if
 * class is not decorated with `@instantiate` then it will provide schema
 * when used with `@shape` or `@collection` decorators.
 */
export function instantiate(constructor: Constructor): void {
    ClassValidatorBuilder.shouldInstantiate(constructor);
}
