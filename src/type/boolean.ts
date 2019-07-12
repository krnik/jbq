import { ValidationResult } from '../core/jbq/jbq_typings';
import { TypeInstance } from '../core/type_store/type_instance';
import { TYPE, TYPE_BOOLEAN, VALUE } from '../misc/constants';
import { TypeAny } from './any';
import { schemaValidate } from './schema_validator';

export const TypeBoolean = new TypeInstance(TYPE_BOOLEAN)
    .derive(TypeAny)
    .setKeyword(TYPE, {
        validator(_schemaValue: string, $DATA: unknown): ValidationResult {
            if ($DATA !== true && $DATA !== false)
                return {
                    message: 'Data should be {{schemaValue}} type. Got ${typeof $DATA}.',
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.primitive(TYPE_BOOLEAN, TYPE, 'string'),
    })
    .setKeyword(VALUE, {
        validator(schemaValue: boolean, $DATA: boolean): ValidationResult {
            if (schemaValue !== $DATA)
                return {
                    message: `Data should be equal to {{resolvedValue || schemaValue}}. Got ${$DATA}.`,
                    path: '{{schemaPath}}',
                };
        },
        schemaValidator: schemaValidate.primitive(TYPE_BOOLEAN, VALUE, 'boolean', true),
    });
