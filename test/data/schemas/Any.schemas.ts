import { REQUIRED, TYPE, TYPE_NAME } from '../../../src/constants';
import { SYM_FAKER } from '../../utils';

export const schemasAny = [
    {
        name: `${TYPE_NAME.ANY}_${TYPE}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.ANY,
            [SYM_FAKER]: ['random.number'],
        },
    },
    {
        name: `${TYPE_NAME.ANY}_${REQUIRED}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.ANY,
            [REQUIRED]: true,
            [SYM_FAKER]: () => true,
        },
    },
    {
        name: `${TYPE_NAME.ANY}_${REQUIRED}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.ANY,
            [REQUIRED]: true,
            [SYM_FAKER]: () => undefined,
        },
    },
    {
        name: `${TYPE_NAME.ARRAY}_${REQUIRED}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.ANY,
            [REQUIRED]: false,
            [SYM_FAKER]: () => undefined,
        },
    },
];
