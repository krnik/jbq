import { PathResolutionStrategy, PROP_DATA_PATH } from './constants';

export type OmitSymbols<T> = Pick<T, { [K in keyof T]: K extends symbol ? never : K }[keyof T]>;

interface SchemaMin { min: number; }
interface SchemaMax { max: number; }
type SchemaMinMax = SchemaMax | SchemaMin;

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
    schemaValue: SchemaMinMax | number | DataPathSchemaValue;
}

export type DataPathResolver = (schemaValue: DataPathSchemaValue) => string;

export type DataPathChecker = (schemaValue: any) => schemaValue is DataPathSchemaValue;

export interface JBQOptions {
    debug?: boolean;
    handleResolvedPaths?: PathResolutionStrategy;
    async?: boolean;
}
