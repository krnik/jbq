import Joi from 'joi';
import { TYPE, VALUE } from '../../../constants';

const DATA = {
  TYPE: 'boolean',
  VALUE: false,
};

export const booleanTests = {
  name: 'boolean',
  data: DATA.VALUE,
  schemas: [
    {
      type: 'type_only',
      ajv: {
        type: DATA.TYPE,
      },
      vjs: {
        [TYPE]: DATA.TYPE,
      },
      joi: Joi.boolean(),
    },
    {
      type: 'value',
      vjs: {
        [TYPE]: DATA.TYPE,
        [VALUE]: DATA.VALUE,
      },
    },
  ],
};
