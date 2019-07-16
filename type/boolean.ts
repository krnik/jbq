import { ValidationResult } from '../core/jbq/jbq_typings.ts';
import { TypeInstance } from '../core/type_store/type_instance.ts';
import { TYPE, TYPE_BOOLEAN, VALUE } from '../misc/constants.ts';
import { TypeAny } from './any.ts';
import { schemaValidate } from './schema_validator.ts';

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
