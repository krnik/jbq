import { Option } from '../../misc/typings';

/**
 * Enum representing a ways of dealing with `$dataPath` resolution.
 * Each of the variants defines what to do if `$dataPath` resolves
 * to `undefined`.
 */
export enum PathResolutionStrategy {
    /**
     * If `$dataPath` resolves to `undefined` - skip the check of a property that
     * expected value.
     */
    Skip = 'skip',
    /**
     * Validate resolved `$dataPath` is validated by schema.
     *
     * # Examples
     *
     * If the value from path `/age` resolves to a value that is not a `number`
     * the validation function will return an error.
     *
     *      const schema = {
     *          type: "number",
     *          min: {
     *              $dataPath: "/age",
     *              type: "number",
     *          }
     *      };
     */
    Schema = 'schema',
    /**
     * Returns an error from validation function if `$dataPath` resolves to `undefined`.
     */
    Return = 'return',
    /**
     * Ignores the fact that the `$dataPath` resolved to `undefined`.
     */
    Ignore = 'ignore',
}

export interface Options {
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

export interface ValidationError {
    message: string;
    path: string;
}

export type ValidationResult = Option<ValidationError>;
