import { deepEqual } from 'assert';
import { compile, string, transform, Validator } from '../../src/class_syntax';

interface UserDoc {
    id: string;
    contact: object;
}

const DB = { user: { findById: (id: string): UserDoc => ({ id, contact: {} }) } };

async function findUser(userId: string): Promise<UserDoc> {
    // ask the databse for the user
    return DB.user.findById(userId);
}

@compile()
class PostEntity extends Validator<true> {
    @string
    @transform(findUser)
    public user!: UserDoc;

    @string
    public message!: string;
}

(async function(): Promise<void> {
    const post = await new PostEntity().from({ user: '100', message: 'Hello...' });
    deepEqual(post.user, { id: '100', contact: {} });
})();
