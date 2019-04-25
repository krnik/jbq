import { PathResolutionStrategy, PROP_DATA_PATH } from './constants';

export type OmitSymbols<T> = Pick<T, { [K in keyof T]: K extends symbol ? never : K }[keyof T]>;

export interface SchemaMin { min: number; }
export interface SchemaMax { max: number; }
export type SchemaMinMax = SchemaMax | SchemaMin | number;

export interface DataPathSchemaValue {
    [PROP_DATA_PATH]: string | string[];
    [key: string]: any;
}

export interface ParseValues {
    schemaValue: any;
    schemaPath: string;
    variableName: string;
    resolvedValue?: string;
}

export interface ParseValuesMinMax extends ParseValues {
    schemaValue: SchemaMinMax | DataPathSchemaValue;
}

export type DataPathResolver = (schemaValue: DataPathSchemaValue) => string;

export type DataPathChecker = (schemaValue: any) => schemaValue is DataPathSchemaValue;

export interface JBQOptions {
    debug?: boolean;
    handleResolvedPaths?: PathResolutionStrategy;
    async?: boolean;
}
