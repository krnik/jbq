import { equal } from 'assert';
import { TypeInstance, TypeStore, ValidationResult } from '../../src/dev';
import { jbq } from '../../src/lib';

function numericValidator(_schemaValue: string, $DATA: unknown): ValidationResult {
    switch (true) {
        case typeof $DATA === 'number' && $DATA !== $DATA:
            return { message: 'Data cannot be NaN.', path: '{{schemaPath}}' };
        case typeof $DATA === 'number':
        // This token will break of currently processed block. It will be replaced
        // during compilation.
        //{break}
        case typeof $DATA === 'string' && !/^\d+$/.test($DATA):
            return { message: 'Data can contain only digits.', path: '{{schemaPath}}' };
        case typeof $DATA === 'string':
            // Break statement will break switch statement.
            break;
        default:
            return {
                message: 'Data must be a number or a string that contains only digits.',
                path: '{{schemaPath}}',
            };
    }
}

// Now, if we add this type to the TypeStore we will be able to use 'numeric' as a
// 'type' property value in schema.
const numeric = new TypeInstance('numeric').setKeyword('type', {
    validator: numericValidator,
    schemaValidator: (): void => {},
});

const store = new TypeStore().addType(numeric);
const schema = { Numeric: { type: 'numeric' } };
const { Numeric } = jbq(store, schema);

equal(Numeric('123'), undefined);
equal(Numeric(100), undefined);
equal(typeof Numeric(NaN), 'object');
equal(typeof Numeric('100.01'), 'object');
