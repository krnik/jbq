import { REQUIRED, TYPE, TYPE_ANY } from '../../../src/misc/constants';
import { SYM_FAKER } from '../../utils';
import { TestSuite } from './suite.interface';

export const suitesAny: TestSuite[] = [
    {
        name: `${TYPE_ANY}#${TYPE}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_ANY,
            [SYM_FAKER]: ['random.number'],
        },
    },
    {
        name: `${TYPE_ANY}#${REQUIRED}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_ANY,
            [REQUIRED]: true,
            [SYM_FAKER]: (): boolean => true,
        },
    },
    {
        name: `${TYPE_ANY}#${REQUIRED}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_ANY,
            [REQUIRED]: true,
            [SYM_FAKER]: (): undefined => undefined,
        },
    },
];
