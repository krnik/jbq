import { TYPE, TYPE_NAME, VALUE } from '../../../src/misc/constants';
import { SYM_FAKER } from '../../utils';
import { TestSuite } from './suite.interface';

export const suitesBoolean: TestSuite[] = [
    {
        name: `${TYPE_NAME.BOOLEAN}#${TYPE}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.BOOLEAN,
            [SYM_FAKER]: (): boolean => true,
        },
    },
    {
        name: `${TYPE_NAME.BOOLEAN}#${TYPE}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.BOOLEAN,
            [SYM_FAKER]: (): null => null,
        },
    },
    {
        name: `${TYPE_NAME.BOOLEAN}#${VALUE}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.BOOLEAN,
            [VALUE]: true,
            [SYM_FAKER]: (): boolean => true,
        },
    },
    {
        name: `${TYPE_NAME.BOOLEAN}#${VALUE}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.BOOLEAN,
            [VALUE]: false,
            [SYM_FAKER]: (): boolean => true,
        },
    },
];
