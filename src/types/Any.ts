import { REQUIRED, SYM_METHOD_MACRO, SYM_TYPE_KEY_ORDER, SYM_TYPE_VALIDATE, TYPE, TYPE_NAME } from '../constants';
import { IParseValues } from '../typings';
import { schemaValidate } from './schemaValidate';

export const TypeAny = {
    [TYPE] (_schemaValue: string, _$DATA: any): void {
        //{break}
    },
    [REQUIRED] (parseValues: IParseValues): string {
        const { dataVariable, schemaValue, schemaPath } = parseValues;
        return schemaValue
            ? `if (${dataVariable} === undefined)
                return '{ "message": "Data is required but got undefined.", "path": "${schemaPath}" }';`
            : `if (${dataVariable} === undefined)  break label_${dataVariable};`;
            // pass create break function into helpers
    },
    [SYM_TYPE_VALIDATE]: {
        [TYPE]: schemaValidate.primitive(TYPE_NAME.ANY, TYPE, 'string'),
        [REQUIRED]: schemaValidate.primitive(TYPE_NAME.ANY, REQUIRED, 'boolean'),
    },
    [SYM_TYPE_KEY_ORDER]: [REQUIRED, TYPE],
};

Object.defineProperty(TypeAny[REQUIRED], SYM_METHOD_MACRO, { value: true });
