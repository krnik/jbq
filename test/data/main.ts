import { callFaker, createData } from './create';
import { schemas } from './schemas';

export { callFaker, schemas, createData };

export const values = {
  non: {
    regex: ['', 1, Symbol('unique symbol'), null, undefined, {}, []],
    number: ['', true, Symbol('unique symbol'), null, undefined, {}, [], () => undefined],
    string: [true, 1, Symbol('unique symbol'), null, undefined, {}, [], () => undefined],
    boolean: ['', 1, Symbol('unique symbol'), null, undefined, {}, []],
    function: ['', 1, true, Symbol('unique symbol'), null, undefined, {}, []],
  },
  null: [null, undefined],
};
