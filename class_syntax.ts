export * from './class_syntax/decorator.ts';

/**
 * Dummy class used to hint TypeScript that a class was compiled and has `build` method.
 *
 * # Example
 *     
 *     
 *     
 *     @compile()
 *     class Address {
 *         @string
 *         @regex(/^\d{2}-\d{2}$/)
 *         public zip!: string;
 *     
 *         @string
 *         @optional
 *         public street?: string;
 *     
 *         @string
 *         @optional
 *         public city?: string;
 *     }
 *     
 *     @compile()
 *     class User extends Validator {
 *         @string
 *         public name!: string;
 *     
 *         @number
 *         public id!: number;
 *     
 *         @shape(Address)
 *         public address!: Address;
 *     }
 *     
 *     const user = new User().from({ name: 'J', id: 100, address: { zip: '22-99' } });
 *     
 *     equal(user.name, 'J');
 *     equal(user.id, 100);
 *     equal(user.address.zip, '22-99');
 *     
 *     throws((): User => new User().from({ name: 'j', id: 0, address: { zip: '22-872' } }));
 *     
 */
export class Validator<HasAsyncTransforms extends boolean = false> {
    public from(data?: unknown): HasAsyncTransforms extends true ? Promise<this> : this {
        let dataJSON = '';
        try {
            dataJSON = JSON.stringify(data);
        } catch (err) {
            dataJSON = `${data}`;
        }
        const className = Object.getPrototypeOf(this).constructor.name;
        const errorMessage = `Validation class ${className} is using the default [from] method.
        To use build method ensure that you decorated class with @compile() decorator.
        Data received: ${dataJSON}`;
        throw new Error(errorMessage);
    }
}
