import { equal, throws } from 'assert';
import {
    compileClass,
    number,
    object,
    optional,
    regex,
    Shape,
    shape,
    string,
    Validator,
} from '../../src/class_syntax';

class Address {
    @string
    @regex(/^\d{2}-\d{2}$/)
    public zip!: string;

    @string
    @optional
    public street?: string;

    @string
    @optional
    public city?: string;
}

class User extends Validator {
    @string
    public name!: string;

    @number
    public id!: number;

    @object
    @shape(Address)
    public address!: Shape<Address>;
}

compileClass(User);

const user = new User().build({ name: 'J', id: 100, address: { zip: '22-99' } });

equal(user.name, 'J');
equal(user.id, 100);
equal(user.address.zip, '22-99');

throws((): User => new User().build({ name: 'j', id: 0, address: { zip: '22-872' } }));
