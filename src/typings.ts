import { HANDLE_PATH_RESOLUTION, PROP_DATA_PATH } from './constants';

export type OmitSymbols<T> = Pick<T, { [K in keyof T]: K extends symbol ? never : K }[keyof T]>;

interface ISchemaMin { min: number; }
interface ISchemaMax { max: number; }
type SchemaMinMax = ISchemaMax | ISchemaMin;

export interface IDataPathSchemaValue {
    [PROP_DATA_PATH]: string | string[];
    [key: string]: any;
}

export interface IParseValues {
    schemaValue: any;
    schemaPath: string;
    dataVariable: string;
    resolvedValue?: string;
}

export interface IParseValuesMinMax extends IParseValues {
    schemaValue: SchemaMinMax | number | IDataPathSchemaValue;
}

export type DataPathResolver = (schemaValue: IDataPathSchemaValue) => string;

export type DataPathChecker = (schemaValue: any) => schemaValue is IDataPathSchemaValue;

export interface IJBQOptions {
    debug?: boolean;
    handleResolvedPaths?: HANDLE_PATH_RESOLUTION;
}
