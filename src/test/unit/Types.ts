import { createTypes } from '../../index';

import { TYPE_NAME } from '../../constants';

export default () => describe('Types', () => {
    describe(TYPE_NAME.ARRAY, () => {});
    describe(TYPE_NAME.BOOLEAN, () => {});
    describe(TYPE_NAME.NUMBER, () => {});
    describe(TYPE_NAME.OBJECT, () => {});
    describe(TYPE_NAME.ROOT.toString(), () => {});
    describe(TYPE_NAME.STRING, () => {});
});
