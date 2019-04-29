import { ClassValidatorBuilder } from './class_validator_builder';

/**
 * *Property decorator.*
 *
 * Defines default value or default value factory for a property.
 * Executed after validation and before transformations.
 *
 * Evaluated only if property is decorated by the `optional` decorator
 * and/or property value of an object is equal to `undefined`.
 *
 * If provided value is a function then the return value of the function will be
 * assigned to a property value and additionally a `this` (valid instance) value
 * will be passed as a first argument to the functions.
 *
 * # Examples
 *
 *      \@compile()
 *      class Person extends Validator {
 *          \@optional
 *          \@string
 *          \@withDefault(() => 'John Snow')
 *          name!: string;
 *
 *          \@withDefault((person: Person) => {
 *              // there is no guarantee that person object will
 *              // have its `name` property set to default before
 *              // this function evaluates
 *              return true;
 *          })
 *          notValidated!: boolean;
 *
 *          \@withDefault(async () => true)
 *          holdsPromise!: Promise<true>;
 *
 *          ohMy!: string;
 *      }
 *
 *      const data = {};
 *      const person = new Person().build(data);
 *      person.name; // 'John Snow'
 *      person.notValidated; // true
 *      person.holdsPromise; // Promise<true>
 *      person.ohMy; // undefined
 *
 * Since `notValidated` property does not exist in schema because it was not
 * decorated with any of the validation decorators it is not validated.
 * If `notValidated` value from source object will not be equal to `undefined` then
 * the default factory will not be evaluated.
 *
 * If a function will return the promise then the promise will not be awaited during
 * setting the defaul values.
 */
export const withDefault = <T>(buildDefault: (data: unknown) => T): PropertyDecorator => (
    prototype: object,
    property: string | symbol,
): void => {
    ClassValidatorBuilder.extract(prototype.constructor).addDefault(property, buildDefault);
};

/**
 *  *Property decorator.*
 *
 * Defines the transformation function for a property.
 *
 * Transformations are evaluated after validation and after setting default
 * values.
 *
 * Transformation function will set property value to a return value of a
 * callback provided to the decorator function.
 *
 * If transformation function returns Promise then the `.build` method of a
 * class will also return Promise that eventually will resolve to the class
 * instance. Since TypeScript does not support change of class signature
 * via decorators this behaviour needs to be manually `noted` by setting
 * `true` value in a generic parameter of `Validator` class.
 *
 * # Examples
 *
 *      \@compile()
 *      class IAmLate extends Validator<true> {
 *          \@transform(async () => true)
 *          veryLate!: boolean;
 *      }
 *
 *      const latePerson = new IAmLate().build({});
 *      latePerson; // Promise<IAmLate>
 *      await latePerson; // IAmLate
 *
 *      \@compile()
 *      class TotallySync extends Validator<true> {
 *          \@transform(() => true)
 *          isSync!: boolean;
 *      }
 *
 *      const syncInstance = new TotallySync().build({});
 *      syncInstance; // TotallySync
 *      // TypeScript will infer that this method returns Promise
 *      // because of `Validator<HasAsyncTransforms = true>`
 *
 *
 * `Validator<true>` is a hint for TypeScript that `.build` method will return Promise.
 * Unfortunately, if class extends `Validator<true>` and none of transform functions
 * will return Promise then `.bulid` method will not resolve to a Promise.
 */
export const transform = <T extends CallableFunction>(callback: T): PropertyDecorator => (
    prototype: object,
    property: string | symbol,
): void => {
    const builder = ClassValidatorBuilder.extract(prototype.constructor);
    builder.addTransform(property, callback);
};
