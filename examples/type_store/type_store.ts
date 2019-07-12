import { equal } from 'assert';
import { TypeInstance } from '../../src/core/type_store/type_instance';
import { ValidationResult } from '../../src/core/jbq/jbq_typings';
import { TypeStore } from '../../src/core/type_store';

const HexColor = new TypeInstance('hex-color').setKeyword('type', {
    validator(_schemaValue: string, $DATA: unknown): ValidationResult {
        if (typeof $DATA !== 'string') {
            return {
                message: 'Only string values can be hex colors;].',
                path: '{{schemaPath}}',
            };
        }
        if (!/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i.test($DATA)) {
            return {
                message: 'Received string is not a hex color value.',
                path: '{{schemaPath}}',
            };
        }
    },
    schemaValidator(schemaValue: unknown): void {
        if (schemaValue !== 'string') throw new Error('Type can be a string only!');
    },
});

const types = new TypeStore().addType(HexColor);

equal(types.getType('hex-color'), HexColor);
equal(types.hasType('hexcolor'), false);
