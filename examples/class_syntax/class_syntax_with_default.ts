import { deepEqual, equal } from 'assert';
import {
    number,
    optional,
    string,
    Validator,
    withDefault,
    compileClass,
} from '../../src/class_syntax';

const userData = { name: 'John Snow', email: 'illget@you.com' };
function defaultAge(data: { name: string }): number {
    deepEqual(data, userData);
    return 20;
}

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

compileClass(User);

const user = new User().build(userData);
equal(user.age, 20);
