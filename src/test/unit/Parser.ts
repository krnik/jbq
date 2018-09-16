import { MAX_LEN, MIN_LEN, SYM_SCHEMA_CONFIG, SYM_SCHEMA_PROPERTIES, TYPE } from '../../constants';
import { parser } from '../../core/Parser';
import { Parser } from '../../core/Parser_alt';
import { createTypes } from '../../types/index';
import { schemas } from '../data/index';

export default () => describe('Parser', () => {
    it.only('it should parse schemas', () => {
        // parser(createTypes(), schemas.valid);
        // parser(createTypes(), schemas.invalid);
        Parser.compile(createTypes(), schemas.valid);
    });
    describe('passing default schema config', () => {
        it(`${SYM_SCHEMA_CONFIG.toString()} - schemas root`, () => {
            const testSchemas = {
                [SYM_SCHEMA_CONFIG]: {
                    [TYPE]: 'string',
                },
                Test0: {
                    [MIN_LEN]: 2,
                },
                Test1: {
                    [MAX_LEN]: 2,
                },
            };
            const parsed = parser(createTypes(), testSchemas);
            parsed.Test0('1')!.should.be.a('string');
            parsed.Test1('123')!.should.be.a('string');
        });
        it(`${SYM_SCHEMA_CONFIG.toString()} - schema`, () => {
            const testSchemas = {
                Test: {
                    [SYM_SCHEMA_CONFIG]: {
                        [TYPE]: 'string',
                    },
                    [TYPE]: 'object',
                    [SYM_SCHEMA_PROPERTIES]: {
                        prop1: { [MIN_LEN]: 2 },
                        prop2: { [MAX_LEN]: 4 },
                    },
                },
            };
            const parsed = parser(createTypes(), testSchemas);
            parsed.Test({ prop1: '1' })!.should.be.a('string');
            parsed.Test({ prop2: '12345' })!.should.be.a('string');
        });
        it(`${SYM_SCHEMA_CONFIG.toString()} - should omit in ${SYM_SCHEMA_PROPERTIES.toString()}`, (done) => {
            const testSchemas = {
                Test: {
                    [TYPE]: 'object',
                    [SYM_SCHEMA_PROPERTIES]: {
                        [SYM_SCHEMA_CONFIG]: {
                            [TYPE]: 'string',
                        },
                        prop1: { [MIN_LEN]: 4 },
                    },
                },
            };
            try {
                parser(createTypes(), testSchemas);
                done('Should throw an missing typ error');
            } catch (err) {
                done();
            }
        });
    });
});
