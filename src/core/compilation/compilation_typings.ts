import { PROP_DATA_PATH, SYM_SCHEMA_COLLECTION, SYM_SCHEMA_PROPERTIES } from '../../misc/constants';

/**
 * Interface representing a Schema passed down to compilation functions.
 */
export interface Schema {
    [SYM_SCHEMA_PROPERTIES]?: {
        [schemaName: string]: Schema;
    };
    [SYM_SCHEMA_COLLECTION]?: Schema;
    [property: string]: unknown;
}

export interface DataPath {
    [PROP_DATA_PATH]: string | string[];
    [key: string]: unknown;
}

export interface ParseValues {
    schemaValue: unknown;
    schemaPath: string;
    variableName: string;
    resolvedValue?: string;
}

export type DataPathResolver = (schemaValue: DataPath) => string;

export type DataPathChecker = (schemaValue: unknown) => schemaValue is DataPath;

/**
 * Enum representing parameter names of validation function.
 */
export const enum ParameterName {
    Data = '$DATA',
    Arguments = '$ARGS',
    SchemaValue = 'schemaValue',
    SchemaPath = 'schemaPath',
    ResolvedValue = 'resolvedValue',
}
