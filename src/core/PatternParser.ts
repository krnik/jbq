import { IParsedProp, IType, TypeMethod } from 'types/index';
import Types from 'types/Wrapper';
import { SYM, TYPE_METHOD } from '../constants';
import { debug, E, isType } from '../utils/index';
const { TYPE, VALIDATE, PARSE } = TYPE_METHOD;
const INDENT = Symbol('pattern_parser_indent');
const INDENT_VAL = '  ';

export interface IPatternConfig {
    type?: string;
    required?: boolean;
    [INDENT]?: string;
    [k: string]: boolean | string | undefined;
}

export interface IPatternsInput {
    [patternName: string]: {
        [propertyName: string]: ({
            [propertyName: string]: any;
        }) | any;
    };
}

export interface IProperty {
    [requirement: string]: IParsedProp;
}

export interface IPattern {
    [propertyName: string]: IPattern | IProperty;
}

export interface IPatterns {
    [patternName: string]: IPattern | IProperty;
}

function getEntries<T> (val: { [p: string]: T }, conf: IPatternConfig, indent?: string) {
    const config = { ...conf, ...(val[SYM.CONFIG] as {} || {}) } as IPatternConfig;
    config[INDENT] = (config[INDENT] || '') + (indent || '');
    return {
        config,
        entries: Object.entries(val),
    };
}

function parseProperty (types: Types, input: { [k: string]: any }, conf: IPatternConfig, name: string) {
    const result = {} as IPattern | IProperty;
    const _type = input[TYPE] || conf[TYPE];
    if (!types.has(_type)) E.missingType(_type);
    const type = types.get(_type) as IType;
    const { entries, config } = getEntries({ ...conf, ...input }, conf, INDENT_VAL);
    for (const [key, value] of entries) {
        if (!isType.objectInstance((type[VALIDATE] as IType)[key], 'Function'))
            E.invalidMethod(_type, typeof (type[VALIDATE] as IType)[key]);
        const isLast = key === entries[entries.length - 1][0];
        debug('magenta', `${isLast ? '└─' : '├─'}${key}`, config[INDENT]);
        ((type[VALIDATE] as IType)[key] as TypeMethod)(value, config[INDENT]);
        result[key] = (((type[PARSE] as IType)[key] as TypeMethod)(key, value) as IParsedProp);
    }
    if (input[SYM.FLAT]) result[SYM.FLAT] = input[SYM.FLAT];
    if (SYM.OBJECT in input)
        result[SYM.OBJECT] = patternParser(types, {
            [name]: input[SYM.OBJECT],
        }, config)[name];
    if (SYM.COLLECTION in input)
        result[SYM.COLLECTION] = patternParser(types, {
            [name]: input[SYM.COLLECTION],
        }, config)[name];
    return result;
}

export default function patternParser (types: Types, patterns: IPatternsInput, conf: IPatternConfig) {
    const result: IPatterns = {};
    const { entries, config } = getEntries(patterns, conf);

    for (const [patternName, patternInput] of entries) {
        debug('yellow', patternName, config[INDENT]);
        if (patternInput[SYM.FLAT])
            result[patternName] = parseProperty(types, patternInput, config, patternName);
        else {
            result[patternName] = {};
            const pattern = result[patternName];
            const {
                entries: properties,
                config: patternConfig,
            } = getEntries(patternInput, config, INDENT_VAL);
            for (const [propertyName, propertyInput] of properties) {
                debug('blue', propertyName, patternConfig[INDENT]);
                pattern[propertyName] = parseProperty(types, propertyInput, patternConfig, propertyName);
            }
        }
    }
    return result;
}
