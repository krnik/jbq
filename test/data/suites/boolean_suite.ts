import { TYPE, TYPE_BOOLEAN, VALUE } from '../../../src/misc/constants';
import { SYM_FAKER } from '../../utils';
import { TestSuite } from './suite.interface';

export const suitesBoolean: TestSuite[] = [
    {
        name: `${TYPE_BOOLEAN}#${TYPE}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_BOOLEAN,
            [SYM_FAKER]: (): boolean => true,
        },
    },
    {
        name: `${TYPE_BOOLEAN}#${TYPE}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_BOOLEAN,
            [SYM_FAKER]: (): null => null,
        },
    },
    {
        name: `${TYPE_BOOLEAN}#${VALUE}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_BOOLEAN,
            [VALUE]: true,
            [SYM_FAKER]: (): boolean => true,
        },
    },
    {
        name: `${TYPE_BOOLEAN}#${VALUE}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_BOOLEAN,
            [VALUE]: false,
            [SYM_FAKER]: (): boolean => true,
        },
    },
];
