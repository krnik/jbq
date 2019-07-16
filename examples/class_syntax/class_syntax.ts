import { equal, throws } from 'assert';
import { compile, number, optional, regex, shape, string, Validator } from '../../src/class_syntax';

@compile()
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

@compile()
class User extends Validator {
    @string
    public name!: string;

    @number
    public id!: number;

    @shape(Address)
    public address!: Address;
}

const user = new User().from({ name: 'J', id: 100, address: { zip: '22-99' } });

equal(user.name, 'J');
equal(user.id, 100);
equal(user.address.zip, '22-99');

throws((): User => new User().from({ name: 'j', id: 0, address: { zip: '22-872' } }));
