import { Validator } from './class_syntax/decorator/class_decorator';
import { schema, shape, string, collection } from './class_syntax/decorator/decorator';

export * from './class_syntax/decorator/class_decorator';

export class AsyncValidator {
    public build(this: AsyncValidator): Promise<AsyncValidator> {
        return Promise.resolve(this);
    }
}

class Elo {
    @string
    public siema!: string;
}

@schema({ type: 'object', required: false })
@Validator
class Siema {
    @schema({ required: false, type: 'string' })
    public firstName!: string;

    @shape(Elo)
    @collection(Elo)
    public arr!: Elo[];
}

console.log(new Siema().firstName);
process.exit(0);
