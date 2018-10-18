import { expect } from 'chai';
import { MAX_LEN, MIN_LEN, SYM_SCHEMA_CONFIG, SYM_SCHEMA_PROPERTIES, TYPE } from '../../src/constants';
import { Parser } from '../../src/core/Parser';
import { createTypes } from '../../src/types/index';
import { schemas } from '../data/main';

export default () => describe('Parser', () => {
    it('it should parse schemas', () => {
        new Parser().compile(createTypes(), schemas.valid);
        new Parser().compile(createTypes(), schemas.invalid);
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
            const parsed = new Parser().compile(createTypes(), testSchemas);
            expect(parsed.Test0('1')).to.be.a('string');
            expect(parsed.Test1('123')).to.be.a('string');
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
            const parsed = new Parser().compile(createTypes(), testSchemas);
            expect(parsed.Test({ prop1: '1' })).to.be.a('string');
            expect(parsed.Test({ prop2: '12345' })).to.be.a('string');
        });
        it(`${SYM_SCHEMA_CONFIG.toString()} - should be omited in ${SYM_SCHEMA_PROPERTIES.toString()}`, () => {
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
            expect(() => new Parser().compile(createTypes(), testSchemas)).to.throw();
        });
    });
});
