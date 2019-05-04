import { PathResolutionStrategy, PROP_DATA_PATH } from './constants';

export type Option<T> = T | undefined;

export type OmitSymbols<T> = Pick<T, { [K in keyof T]: K extends symbol ? never : K }[keyof T]>;

export interface SchemaMin {
    min: number | DataPath;
}
export interface SchemaMax {
    max: number | DataPath;
}
export type SchemaMinMax = SchemaMax | SchemaMin | number | DataPath;

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
    schemaValue: SchemaMinMax;
}

export type DataPathResolver = (schemaValue: DataPath) => string;

export type DataPathChecker = (schemaValue: unknown) => schemaValue is DataPath;

export interface JBQOptions {
    /**
     * Defines if schema compilation progress should be logged.
     */
    debug?: boolean;
    /**
     * Defines what to do in case when $dataPath resolves to undefined.
     */
    handleResolvedPaths?: PathResolutionStrategy;
    /**
     * Defines if validation function should be asyncronous.
     */
    async?: boolean;
    /**
     * Defines how often the validation of collection should be suspended in
     * asyncronous validation functions.
     */
    asyncInterval?: number;
}

export interface Constructor<T = {}> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
}

export type ArrIterCallback<R = unknown, T = unknown> = (elem: T, index: number, arr: T[]) => R;
