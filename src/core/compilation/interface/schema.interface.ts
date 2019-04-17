import { SYM_SCHEMA_COLLECTION, SYM_SCHEMA_PROPERTIES } from '../../../constants';

/**
 * Interface representing a Schema passed down to compilation functions.
 *
 * # Examples
 *
 *    const schema1 = { type: 'any', required: false };
 *
 *    const schema2 = {
 *      type: 'object',
 *      [Symbol.for('schema_properties')]: {
 *          firstName: { type: 'string', len: { min: 4 } },
 *          zip_code: { type: 'string', regex: /\d{3}-\d{2}/ },
 *      }
 *     };
 */
export interface Schema {
    [SYM_SCHEMA_PROPERTIES]?: {
        [schemaName: string]: Schema;
    };
    [SYM_SCHEMA_COLLECTION]?: Schema;
    [property: string]: any;
}
