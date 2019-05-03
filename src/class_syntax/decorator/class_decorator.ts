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
 *
 * # Examples
 *
 *      \@instntiate
 *      class ID {}
 *
 *      class Name {
 *          \@string
 *          public firstName!: string;
 *      }
 *
 *      class User extends Validator {
 *          \@shape(ID)
 *          public id!: ID;
 *
 *          \@object
 *          \@shape(Name)
 *          public name!: Shape<Name>;
 *      }
 *
 *      new User().build({});   // throws -> no `name` is not an object
 *      new User().build()      // throws -> data is not an object
 *
 *      const user = new User().build({ name: 'Bon' });
 *
 *      user.id;                    // ID
 *      user.id instanceof ID;      // true
 *
 *      user.name;                  // { firstName: 'Bon' }
 *      user.name instanceof Name;  // false
 */
export function instantiate(constructor: Constructor): void {
    ClassValidatorBuilder.shouldInstantiate(constructor);
}
