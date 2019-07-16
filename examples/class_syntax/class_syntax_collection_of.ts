import { equal, throws } from 'assert';
import { array, boolean, collectionOf, compile, string, Validator } from '../../src/class_syntax';

@compile()
class Email extends Validator {
    @string
    public value!: string;

    @boolean
    public isPrimary!: boolean;
}

@compile()
class User extends Validator {
    @array
    @collectionOf(Email)
    public emails!: Email[];
}

const validData = [
    { emails: [{ value: 'test@test0.com', isPrimary: false }] },
    {
        emails: [
            { value: 'test@test1.com', isPrimary: true },
            { value: '_test@test.com', isPrimary: false },
        ],
    },
    { emails: [{ value: 'test@test2.com', isPrimary: true }] },
];
validData.forEach(
    (data): void => {
        const user = new User().from(data);
        user.emails.forEach(
            (email): void => {
                equal(email instanceof Email, true);
            },
        );
    },
);

const invalidData = [{ emails: null }, { emails: [0] }];
invalidData.forEach(
    (data): void => {
        throws(
            (): void => {
                new User().from(data);
            },
        );
    },
);
