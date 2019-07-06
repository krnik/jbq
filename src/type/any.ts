import { CodeGenerator } from '../core/code_gen';
import { ParseValues } from '../core/compilation/compilation_typings';
import { TypeInstance } from '../core/type_store/type_instance';
import { REQUIRED, TYPE, TYPE_NAME } from '../misc/constants';
import { schemaValidate } from './schema_validator';
import { KeywordValidationFunctionKind } from '../core/type_store/type_instance/type_instance_typings';

export const TypeAny = new TypeInstance(TYPE_NAME.ANY)
    .setKeyword(TYPE, {
        validator({ variableName }: ParseValues): string {
            return CodeGenerator.renderLabeledBreakStatement(variableName);
        },
        kind: KeywordValidationFunctionKind.Macro,
        schemaValidator: schemaValidate.primitive(TYPE_NAME.ANY, TYPE, 'string'),
    })
    .setKeyword(REQUIRED, {
        validator({ variableName, schemaValue, schemaPath }: ParseValues): string {
            return schemaValue
                ? `if (${variableName} === undefined)
                    return { message: "Data is required but got undefined.", path: "${schemaPath}" };`
                : `if (${variableName} === undefined)  break label_${variableName};`;
            // pass create break function into helpers
        },
        kind: KeywordValidationFunctionKind.Macro,
        schemaValidator: schemaValidate.primitive(TYPE_NAME.ANY, REQUIRED, 'boolean'),
    })
    .setKeywordOrder([REQUIRED, TYPE]);
