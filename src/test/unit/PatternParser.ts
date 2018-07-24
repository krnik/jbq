import { SYM, TYPE_METHOD } from '../../constants';
import patternParser, { IPatternsInput, IProperty } from '../../core/PatternParser';
import { types } from '../../index';
import { patterns } from '../data/index';
const { TYPE, REGEX, MIN_LEN, MIN } = TYPE_METHOD;

export default () => describe('Pattern Parser', () => {
    it(`it should recognize ${SYM.OBJECT.toString()}`, () => {
        const patterns: IPatternsInput = {
            TestSymObject: {
                address: {
                    [TYPE]: 'object',
                    [SYM.OBJECT]: {
                        prop1: { type: 'string' },
                        prop2: { type: 'string' },
                    },
                },
            },
        };
        const parsedPatterns = patternParser(types, patterns, {});
        for (const key of Object.keys(patterns))
            for (const prop of Object.keys(patterns[key])) {
                parsedPatterns[key][prop].should.have.property(SYM.OBJECT);
                (parsedPatterns[key][prop] as IProperty)[SYM.OBJECT].should.have.all.keys(...Object.keys(patterns[key][prop][SYM.OBJECT]));
            }
    });
    it(`it should recognize ${SYM.COLLECTION.toString()}`, () => {
        const patterns: IPatternsInput = {
            TestSymCollection: {
                array: {
                    [TYPE]: 'array',
                    [SYM.COLLECTION]: {
                        name: {
                            [TYPE]: 'string',
                        },
                    },
                },
            },
        };
        const parsedPatterns = patternParser(types, patterns, {});
        for (const key of Object.keys(patterns))
            for (const prop of Object.keys(patterns[key])) {
                parsedPatterns[key][prop].should.have.property(SYM.COLLECTION);
                (parsedPatterns[key][prop] as IProperty)[SYM.COLLECTION].should.have.all.keys(...Object.keys(patterns[key][prop][SYM.COLLECTION]), ...Object.getOwnPropertySymbols(patterns[key][prop][SYM.COLLECTION]) as any);
            }
    });
    it(`it should recognize ${SYM.FLAT.toString()}`, () => {
        const patterns: IPatternsInput = {
            Primitive: {
                [TYPE]: 'string',
                [SYM.FLAT]: true,
            },
            Tuple: {
                [TYPE]: 'array',
                [SYM.FLAT]: true,
                [SYM.OBJECT]: {
                    0: { type: 'string' },
                    1: { type: 'number' },
                },
            },
        };
        const parsedPatterns = patternParser(types, patterns, {});
        parsedPatterns.should.have.keys(...Object.keys(patterns));
        for (const key of Object.keys(parsedPatterns))
            parsedPatterns[key].should.have.keys(...Object.keys(patterns[key]), ...Object.getOwnPropertySymbols(patterns[key]) as any);
    });
    it(`it should recognize ${SYM.CONFIG.toString()}`, () => {
        const patterns = {
            [SYM.CONFIG]: {
                [TYPE]: 'string',
            },
            StringPrimitive: {
                [SYM.FLAT]: true,
            },
        };
        patternParser(types, patterns, {});
    });
    it('it should accept config as a third parameter', () => {
        const patterns = {
            StringPrimitive: {
                [SYM.FLAT]: true,
            },
        };
        patternParser(types, patterns, { [TYPE]: 'string' });
    });
    it('it should parse valid patterns', () => {
        const parsedPatterns = patternParser(types, patterns, {});
        parsedPatterns.should.have.keys(...Object.keys(patterns));
        for (const key in parsedPatterns)
            Object.keys(parsedPatterns[key]).should.be.deep.equal(Object.keys(patterns[key]));
    });
    it('it should throw an error if type property is not defined', (done) => {
        const _patterns = {
            Invalid: {
                name: {},
            },
        };
        try {
            patternParser(types, _patterns, {});
            done('Should throw an error');
        } catch (err) {
            done();
        }
    });
    it('it should throw an error if type is not defined', (done) => {
        const _patterns = {
            Invalid: {
                map: {
                    type: 'map',
                },
            },
        };
        try {
            patternParser(types, _patterns, {});
            done('Should throw an error');
        } catch (err) {
            done();
        }
    });
    it('it should parse nested patterns', () => {
        const addressObject: { [k: string]: {} } = {
            zipCode: {
                [TYPE]: 'string',
                [REGEX]: /^\d{2}-\d{3}$/,
            },
            street: {
                [TYPE]: 'string',
                [MIN_LEN]: 4,
            },
            city: {
                [TYPE]: 'string',
                [MIN_LEN]: 2,
            },
            buildingNo: {
                [TYPE]: 'number',
                [MIN]: 1,
            },
            flatNo: {
                [TYPE]: 'number',
                [MIN]: 1,
            },
        };
        const personObject = {
            type: 'object',
            [SYM.FLAT]: true,
            [SYM.OBJECT]: addressObject,
        };
        const parsedPatterns = patternParser(types, { Test: personObject }, {});
        for (const [key, val] of Object.entries(parsedPatterns.Test[SYM.OBJECT]))
            addressObject[key].should.have.all.keys(Object.keys(val));
    });
});
