import { equal, throws } from 'assert';
import { compile, path, string, Validator } from '../../src/class_syntax';

@compile()
class User extends Validator {
    @string
    @path('firstName')
    public name!: string;
}

const validData = [{ firstName: 'Joe' }, { firstName: 'Mark' }];
validData.forEach(
    (data): void => {
        const user = new User().from(data);
        equal(user instanceof User, true);
    },
);

const invalidData = [{ name: 'John Doe' }, { lastName: 'Eee' }];
invalidData.forEach(
    (data): void => {
        throws(
            (): void => {
                new User().from(data);
            },
        );
    },
);
