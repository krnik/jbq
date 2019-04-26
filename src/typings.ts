import { PathResolutionStrategy, PROP_DATA_PATH } from './constants';

export type Option<T> = T | undefined;

export type OmitSymbols<T> = Pick<T, { [K in keyof T]: K extends symbol ? never : K }[keyof T]>;

export interface SchemaMin {
    min: number | DataPath;
}
export interface SchemaMax {
    max: number | DataPath;
}
export type SchemaMinMax = SchemaMax | SchemaMin | number;

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

export interface ParseValuesMinMax extends ParseValues {
    schemaValue: SchemaMinMax | DataPath;
}

export type DataPathResolver = (schemaValue: DataPath) => string;

export type DataPathChecker = (schemaValue: unknown) => schemaValue is DataPath;

export interface JBQOptions {
    debug?: boolean;
    handleResolvedPaths?: PathResolutionStrategy;
    async?: boolean;
}
