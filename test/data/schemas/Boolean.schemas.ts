import { TYPE, TYPE_NAME, VALUE } from '../../../src/constants';
import { SYM_FAKER } from '../../utils';
import { ITestSuite } from './typings';

export const schemasBoolean: ITestSuite[] = [
    {
        name: `${TYPE_NAME.BOOLEAN}_${TYPE}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.BOOLEAN,
            [SYM_FAKER]: () => true,
        },
    },
    {
        name: `${TYPE_NAME.BOOLEAN}_${TYPE}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.BOOLEAN,
            [SYM_FAKER]: () => null,
        },
    },
    {
        name: `${TYPE_NAME.BOOLEAN}_${VALUE}`,
        valid: true,
        schema: {
            [TYPE]: TYPE_NAME.BOOLEAN,
            [VALUE]: true,
            [SYM_FAKER]: () => true,
        },
    },
    {
        name: `${TYPE_NAME.BOOLEAN}_${VALUE}`,
        valid: false,
        schema: {
            [TYPE]: TYPE_NAME.BOOLEAN,
            [VALUE]: false,
            [SYM_FAKER]: () => true,
        },
    },
];
