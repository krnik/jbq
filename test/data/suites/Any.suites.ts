import { REQUIRED, TYPE, TYPE_NAME } from '../../../src/constants';
import { SYM_FAKER } from '../../utils';
import { TestSuite } from './typings';

export const suitesAny: TestSuite[] = [
    {
        name: `${TYPE_NAME.ANY}#${TYPE}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.ANY,
            [SYM_FAKER]: ['random.number'],
        },
    },
    {
        name: `${TYPE_NAME.ANY}#${REQUIRED}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.ANY,
            [REQUIRED]: true,
            [SYM_FAKER]: (): boolean => true,
        },
    },
    {
        name: `${TYPE_NAME.ANY}#${REQUIRED}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.ANY,
            [REQUIRED]: true,
            [SYM_FAKER]: (): undefined => undefined,
        },
    },
];
