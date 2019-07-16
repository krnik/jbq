import { equal } from 'assert';
import {
    compileClass,
    instantiate,
    object,
    Shape,
    shape,
    string,
    Validator,
} from '../../src/class_syntax';

class Address {
    @string
    public street!: string;
}

@instantiate
class Contact {
    @string
    public email!: string;

    public isUnique(this: Contact): boolean {
        // do some checks
        return true;
    }
}
compileClass(Contact);

class User extends Validator {
    @object
    @shape(Address)
    public address!: Shape<Address>;

    @object
    @shape(Contact)
    public contact!: Contact;
}
compileClass(User);

const user = new User().build({ address: { street: '123' }, contact: { email: 'hell@o.com' } });

equal(true, user.contact instanceof Contact);
equal(true, user.contact.isUnique());
equal(Object, Object.getPrototypeOf(user.address).constructor);
