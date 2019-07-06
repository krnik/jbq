import { RestParams } from '../../../misc/typings';
import { ValidationResult } from '../../jbq/jbq_typings';

type KeywordValidationFunction = (...args: RestParams) => ValidationResult | string | void;

export enum KeywordValidationFunctionKind {
    Function = 'Function',
    Closure = 'Closure',
    Macro = 'Macro',
}

export interface KeywordDescriptor {
    validator: KeywordValidationFunction;
    kind: KeywordValidationFunctionKind;
    schemaValidator: (schemaValue: unknown) => unknown;
    acceptDataPath: boolean;
}
