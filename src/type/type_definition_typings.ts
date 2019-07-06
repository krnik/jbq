import { DataPath, ParseValues } from '../core/compilation/compilation_typings';

export interface SchemaMin {
    min: number | DataPath;
}

export interface SchemaMax {
    max: number | DataPath;
}

export type SchemaMinMax = SchemaMax | SchemaMin | number | DataPath;

export interface ParseValuesMinMax extends ParseValues {
    schemaValue: SchemaMinMax;
}
