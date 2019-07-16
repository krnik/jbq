import { TypeInstance } from '../../src/dev';

const dummy = new TypeInstance('dummy')
    .setKeyword('one', { validator(): void {}, schemaValidator(): void {} })
    .setKeyword('two', { validator(): void {}, schemaValidator(): void {} });

dummy.setKeywordOrder(['two']);
// Now, the keyword "two" will always be compiled before any other keyword.
