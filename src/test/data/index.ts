// import { createData } from './create';
// import { patterns } from './patterns';

// export {
//   patterns,
//   createData,
//  };

export const values = {
  non: {
    regex: ['', 1, Symbol('unique symbol'), null, undefined, {}, []],
    number: ['', true, Symbol('unique symbol'), null, undefined, {}, [], () => {}],
    string: [true, 1, Symbol('unique symbol'), null, undefined, {}, [], () => {}],
    boolean: ['', 1, Symbol('unique symbol'), null, undefined, {}, []],
    function: ['', 1, true, Symbol('unique symbol'), null, undefined, {}, []],
  },
  null: [null, undefined],
};
