import { Some } from '../../misc/typings.ts';
import { PropertyMetadata } from '../property_metadata.ts';
import { ValidatorBuilder } from '../validator_builder.ts';

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
 *     
 *     
 *     
 *     const userData = { name: 'John Snow', email: '\@you.com' };
 *     function defaultAge(data: { name: string }): number {
 *         deepEqual(data, userData);
 *         return 20;
 *     }
 *     
 *     @compile()
 *     class User extends Validator {
 *         @string
 *         public name!: string;
 *     
 *         @string
 *         public email!: string;
 *     
 *         @number
 *         @optional
 *         @withDefault(defaultAge)
 *         public age!: number;
 *     }
 *     
 *     const user = new User().from(userData);
 *     equal(user.age, 20);
 *     
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
 *     
 *     
 *     
 *     interface UserDoc {
 *         id: string;
 *         contact: object;
 *     }
 *     
 *     const DB = { user: { findById: (id: string): UserDoc => ({ id, contact: {} }) } };
 *     
 *     async function findUser(userId: string): Promise<UserDoc> {
 *         // ask the databse for the user
 *         return DB.user.findById(userId);
 *     }
 *     
 *     @compile()
 *     class PostEntity extends Validator<true> {
 *         @string
 *         @transform(findUser)
 *         public user!: UserDoc;
 *     
 *         @string
 *         public message!: string;
 *     }
 *     
 *     (async function(): Promise<void> {
 *         const post = await new PostEntity().from({ user: '100', message: 'Hello...' });
 *         deepEqual(post.user, { id: '100', contact: {} });
 *     })();
 *     
 */
export const transform = propMetaDecoratorFactory('transformFn');

/**
 * Changes the property name of which data should be used for validation.
 *
 * # Example
 *     
 *     
 *     
 *     @compile()
 *     class User extends Validator {
 *         @string
 *         @path('firstName')
 *         public name!: string;
 *     }
 *     
 *     const validData = [{ firstName: 'Joe' }, { firstName: 'Mark' }];
 *     validData.forEach(
 *         (data): void => {
 *             const user = new User().from(data);
 *             equal(user instanceof User, true);
 *         },
 *     );
 *     
 *     const invalidData = [{ name: 'John Doe' }, { lastName: 'Eee' }];
 *     invalidData.forEach(
 *         (data): void => {
 *             throws(
 *                 (): void => {
 *                     new User().from(data);
 *                 },
 *             );
 *         },
 *     );
 *     
 */
export const path = propMetaDecoratorFactory('dataPropertyPath');

/**
 * Creates class instances out of each array member of the property.
 *
 * # Example
 *     
 *     
 *     
 *     @compile()
 *     class Email extends Validator {
 *         @string
 *         public value!: string;
 *     
 *         @boolean
 *         public isPrimary!: boolean;
 *     }
 *     
 *     @compile()
 *     class User extends Validator {
 *         @array
 *         @collectionOf(Email)
 *         public emails!: Email[];
 *     }
 *     
 *     const validData = [
 *         { emails: [{ value: '\@test0.com', isPrimary: false }] },
 *         {
 *             emails: [
 *                 { value: '\@test1.com', isPrimary: true },
 *                 { value: '\@test.com', isPrimary: false },
 *             ],
 *         },
 *         { emails: [{ value: '\@test2.com', isPrimary: true }] },
 *     ];
 *     validData.forEach(
 *         (data): void => {
 *             const user = new User().from(data);
 *             user.emails.forEach(
 *                 (email): void => {
 *                     equal(email instanceof Email, true);
 *                 },
 *             );
 *         },
 *     );
 *     
 *     const invalidData = [{ emails: null }, { emails: [0] }];
 *     invalidData.forEach(
 *         (data): void => {
 *             throws(
 *                 (): void => {
 *                     new User().from(data);
 *                 },
 *             );
 *         },
 *     );
 *     
 */
export const collectionOf = (value: Function): PropertyDecorator => {
    return (prototype: object, property: string | symbol): void => {
        ValidatorBuilder.extract(prototype.constructor)
            .getPropertyMetadata(property)
            .setValue('isConstructorForItems', true)
            .setValue('Constructor', value);
    };
};

/**
 * Creates class instance out of decorated property.
 *
 * # Example
 *     
 *     
 *     
 *     @compile()
 *     class YearMonth extends Validator {
 *         @string
 *         @regex(/^\d{4}$/)
 *         @transform((property): number => Number(property))
 *         public year!: number;
 *     
 *         @string
 *         @regex(/^\d{2}$/)
 *         @transform((property): number => Number(property))
 *         public month!: number;
 *     }
 *     
 *     @compile()
 *     class History extends Validator {
 *         @shape(YearMonth)
 *         public visitedAt!: YearMonth;
 *     
 *         @shape(YearMonth)
 *         public commentedAt!: YearMonth;
 *     }
 *     
 *     const visitedAt = { month: '12', year: '2000' };
 *     const commentedAt = { month: '12', year: '2001' };
 *     const history = new History().from({ visitedAt, commentedAt });
 *     
 *     equal(history.commentedAt instanceof YearMonth, true);
 *     equal(history.commentedAt.year, 2001);
 *     equal(history.visitedAt instanceof YearMonth, true);
 *     equal(history.visitedAt.year, 2000);
 *     
 */
export const shape = (value: Function): PropertyDecorator => {
    return (prototype: object, property: string | symbol): void => {
        ValidatorBuilder.extract(prototype.constructor)
            .getPropertyMetadata(property)
            .setValue('Constructor', value);
    };
};
