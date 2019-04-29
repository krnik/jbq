import { Constructor } from '../misc/typings';
import { ClassValidatorBuilder } from './class_validator_builder';

/**
 * *Constructor decorator.*
 *
 * Does some magic ;)
 */
export function instantiate(constructor: Constructor): void {
    ClassValidatorBuilder.shouldInstantiate(constructor);
}
