import { equal } from 'assert';
import { CodeGenerator } from '../../src/dev';

const message = 'Data value should be greater than 10.';
const path = '/contact/age';

equal(
    CodeGenerator.renderReturnObject(message, path),
    'return { message: `Data value should be greater than 10.`, path: `/contact/age` };',
);
