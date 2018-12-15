import { TYPE, TYPE_NAME, VALUE } from '../../../src/constants';
import { SYM_FAKER } from '../../utils';
import { ITestSuite } from './typings';

export const suitesBoolean: ITestSuite[] = [
    {
        name: `${TYPE_NAME.BOOLEAN}#${TYPE}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.BOOLEAN,
            [SYM_FAKER]: () => true,
        },
    },
    {
        name: `${TYPE_NAME.BOOLEAN}#${TYPE}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.BOOLEAN,
            [SYM_FAKER]: () => null,
        },
    },
    {
        name: `${TYPE_NAME.BOOLEAN}#${VALUE}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.BOOLEAN,
            [VALUE]: true,
            [SYM_FAKER]: () => true,
        },
    },
    {
        name: `${TYPE_NAME.BOOLEAN}#${VALUE}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.BOOLEAN,
            [VALUE]: false,
            [SYM_FAKER]: () => true,
        },
    },
];
