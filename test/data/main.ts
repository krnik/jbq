import { callFaker, createData } from './create';

export { callFaker, createData };

export const values = {
    non: {
        regex: ['', 1, Symbol(), null, undefined, {}, []],
        number: ['', true, Symbol(), null, undefined, {}, [], () => undefined],
        string: [true, 1, Symbol(), null, undefined, {}, [], () => undefined],
        boolean: ['', 1, Symbol(), null, undefined, {}, []],
        function: ['', 1, true, Symbol(), null, undefined, {}, []],
        array: ['', 1, true, Symbol(), null, {}, () => undefined],
    },
    null: [null, undefined],
};
