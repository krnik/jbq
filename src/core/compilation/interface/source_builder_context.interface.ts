/**
 * Interface representing internal context of `SourceBuider` instance.
 * It's used to keep track of variable names, currently processed schema
 * property and schema path from root to the property.
 */
export interface SourceBuilderContext {
    /**
     * Represents variable name that is a source of data for currently processed
     * part of the schema.
     *
     * For root schema the variableName would be the `$DATA` parameter of the
     * validation function.
     */
    variableName: string;
    /**
     * Represents `Schema` property that is currently processed.
     * It's used to create `schemaPath` by adding the property name after `#` at
     * the end of the `schemaPath`
     */
    currentProperty: string;
    /**
     * Represents path from `Schema` root to currently processed part of it.
     */
    schemaPath: string;
}
