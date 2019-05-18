import { equal } from 'assert';
import { TypeWrapper } from '../../src/core/type_wrapper';
import { TypeAny } from '../../src/type/any';
import { SYM_TYPE_VALIDATE } from '../../src/misc/constants';

const hexReg = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i;
const HexColor = {
    type(_schemaValue: string, $DATA: unknown): string | undefined {
        if (typeof $DATA !== 'string') {
            return `"{ "message": "Only string values can be hex colors.", "path": "{{schemaPath}}" }"`;
        }
        if (!hexReg.test($DATA)) {
            return `"{ "message": "Received string is not a hex color value.", "path": "{{schemaPath}}" }"`;
        }
    },
    [SYM_TYPE_VALIDATE]: {
        type(schemaValue: unknown): void {
            if (schemaValue !== 'string') throw new Error('Type can be a string only!');
        },
    },
};

const types = new TypeWrapper().set('any', TypeAny).set('hex_color', HexColor, { type: 'any' });

equal(types.get('hex_color'), HexColor);
equal(types.has('hexcolor'), false);
