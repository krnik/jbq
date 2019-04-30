import {
    REQUIRED,
    SYM_METHOD_MACRO,
    SYM_TYPE_KEY_ORDER,
    SYM_TYPE_VALIDATE,
    TYPE,
    TYPE_NAME,
} from '../misc/constants';
import { ParseValues } from '../misc/typings';
import { schemaValidate } from './schema_validator';

export const TypeAny = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [TYPE](_schemaValue: string, _$DATA: unknown): void {
        //{break}
    },
    [REQUIRED](parseValues: ParseValues): string {
        const { variableName, schemaValue, schemaPath } = parseValues;
        return schemaValue
            ? `if (${variableName} === undefined)
                return '{ "message": "Data is required but got undefined.", "path": "${schemaPath}" }';`
            : `if (${variableName} === undefined)  break label_${variableName};`;
        // pass create break function into helpers
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE]: schemaValidate.primitive(TYPE_NAME.ANY, TYPE, 'string'),
        [REQUIRED]: schemaValidate.primitive(TYPE_NAME.ANY, REQUIRED, 'boolean'),
    },
    [SYM_TYPE_KEY_ORDER]: [REQUIRED, TYPE],
};

Object.defineProperty(TypeAny[REQUIRED], SYM_METHOD_MACRO, { value: true });
