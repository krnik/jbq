import { deepEqual, equal } from 'assert';
import { compile, number, optional, string, Validator, withDefault } from '../../src/class_syntax';

const userData = { name: 'John Snow', email: 'illget@you.com' };
function defaultAge(data: { name: string }): number {
    deepEqual(data, userData);
    return 20;
}

@compile()
class User extends Validator {
    @string
    public name!: string;

    @string
    public email!: string;

    @number
    @optional
    @withDefault(defaultAge)
    public age!: number;
}

const user = new User().from(userData);
equal(user.age, 20);
