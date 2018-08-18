import { VJS } from '../../core/VJS';
import { createTypes } from '../../types';
import { createData, schemas } from '../data';

export default () => describe('Validator', () => {
    const data = {
        valid: createData(schemas.valid),
        invalid: createData(schemas.invalid),
    };
    for (const key of Object.keys(data.valid))
        it(`valid value ${key}`, () => {
            const validator = new VJS(createTypes(), schemas.valid);
            const res = validator[key](data.valid[key]);
            if (res) throw Error('it should not return error message');
        });
    for (const key of Object.keys(data.invalid))
        it(`invalid value ${key}`, () => {
            const validator = new VJS(createTypes(), schemas.invalid);
            const res = validator[key](data.invalid[key]);
            if (!res) throw Error('it should return error message');
        });
});
