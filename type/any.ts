import { CodeGenerator } from '../core/code_gen.ts';
import { ParseValues } from '../core/compilation/compilation_typings.ts';
import { TypeInstance } from '../core/type_store/type_instance.ts';
import { KeywordValidationFunctionKind } from '../core/type_store/type_instance/type_instance_typings.ts';
import { REQUIRED, TYPE, TYPE_ANY } from '../misc/constants.ts';
import { schemaValidate } from './schema_validator.ts';

export const TypeAny = new TypeInstance(TYPE_ANY)
    .setKeyword(TYPE, {
        validator({ variableName }: ParseValues): string {
            return CodeGenerator.renderLabeledBreakStatement(variableName);
        },
        kind: KeywordValidationFunctionKind.Macro,
        schemaValidator: schemaValidate.primitive(TYPE_ANY, TYPE, 'string'),
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
        schemaValidator: schemaValidate.primitive(TYPE_ANY, REQUIRED, 'boolean'),
    })
    .setKeywordOrder([REQUIRED, TYPE]);
