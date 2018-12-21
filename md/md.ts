import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { TYPE_NAME } from '../src/constants';

enum DIR {
    ROOT = '../',
    WIKI = '../jbq.wiki/',
}

function wikiTypeName (type: TYPE_NAME) {
    return `Type_${type.charAt(0).toUpperCase()}${type.slice(1)}`;
}

const WIKI_URL = 'https://github.com/krnik/jbq/wiki/';

const WIKI = {
    MIN_MAX_OR_NUM: {
        template: 'wiki_min_max_or_number',
        name: 'MinMaxOrNumber',
    },
    DATA_PATH: {
        template: 'wiki_data_path',
        name: 'DataPath',
    },
    TYPE_CUSTOM: {
        template: 'wiki_type_custom',
        name: 'CustomTypes',
    },
    TYPE_WRAPPER: {
        template: 'wiki_type_wrapper',
        name: 'TypeWrapper',
    },
    PARSER: {
        template: 'wiki_parser',
        name: 'Parser',
    },
};

export const mdParts = [
    {
        template: 'readme',
        name: 'README',
        destination: DIR.ROOT,
    },
    {
        template: 'wiki_home',
        name: 'Home',
        destination: DIR.WIKI,
    },
    {
        template: 'wiki_sidebar',
        name: '_Sidebar',
        destination: DIR.WIKI,
    },
    {
        template: 'wiki_type_any',
        name: wikiTypeName(TYPE_NAME.ANY),
        destination: DIR.WIKI,
    },
    {
        template: 'wiki_type_array',
        name: wikiTypeName(TYPE_NAME.ARRAY),
        destination: DIR.WIKI,
    },
    {
        template: 'wiki_type_boolean',
        name: wikiTypeName(TYPE_NAME.BOOLEAN),
        destination: DIR.WIKI,
    },
    {
        template: 'wiki_type_number',
        name: wikiTypeName(TYPE_NAME.NUMBER),
        destination: DIR.WIKI,
    },
    {
        template: 'wiki_type_object',
        name: wikiTypeName(TYPE_NAME.OBJECT),
        destination: DIR.WIKI,
    },
    {
        template: 'wiki_type_string',
        name: wikiTypeName(TYPE_NAME.STRING),
        destination: DIR.WIKI,
    },
    {
        ...WIKI.MIN_MAX_OR_NUM,
        destination: DIR.WIKI,
    },
    {
        ...WIKI.DATA_PATH,
        destination: DIR.WIKI,
    },
    {
        ...WIKI.PARSER,
        destination: DIR.WIKI,
    },
    {
        ...WIKI.TYPE_CUSTOM,
        destination: DIR.WIKI,
    },
    {
        ...WIKI.TYPE_WRAPPER,
        destination: DIR.WIKI,
    },
];

const code = '```';

export const MD = {
    WIKI,
    AWIKI (page: { name: string, template: string }) {
        return `[${page.name}](${WIKI_URL}${page.name})`;
    },
    A (type: TYPE_NAME, anchor: string) {
        const file = wikiTypeName(type);
        const hash = anchor ? `#${anchor}` : '';
        return `[${type}](${WIKI_URL}${file}${hash})`;
    },
    AREADME (type: TYPE_NAME | { name: string }) {
        const file = typeof type === 'object'
            ? type.name
            : wikiTypeName(type);
        return `[${typeof type === 'object' ? type.name : type}](${WIKI_URL}${file})`;
    },
    ASRC (type: TYPE_NAME) {
        let url = 'https://github.com/krnik/jbq/blob/master/src/types/';
        switch (type) {
            case TYPE_NAME.ANY:
                url += 'Any.ts';
            case TYPE_NAME.ARRAY:
                url += 'Array.ts';
            case TYPE_NAME.BOOLEAN:
                url += 'Boolean.ts';
            case TYPE_NAME.NUMBER:
                url += 'Number.ts';
            case TYPE_NAME.OBJECT:
                url += 'Object.ts';
            case TYPE_NAME.STRING:
                url += 'String.ts';
        }
        return `[Source](${url})`;
    },
    example (file: string, key: string) {
        const examplePath = resolve(__dirname, 'examples', `${file}_${key}.ts`);
        if (!existsSync(examplePath))
            return 'ENOTFOUND';
        const regex = new RegExp(`function\\W*example.*?{([\\w\\W]*)}`);
        const content = readFileSync(examplePath)
            .toString()
            .match(regex);
        if (!content)
            throw Error('Content not found!');
        return `${code}typescript${content[1]}${code}\n`;
    },
};

export const BADGE = {
    STATUS: '[![Build Status](https://travis-ci.org/krnik/jbq.svg?branch=master)](https://travis-ci.org/krnik/jbq)',
    NPM: '[![](https://img.shields.io/npm/v/jbq.svg)](https://www.npmjs.com/package/jbq)',
    TYPES: '![](https://img.shields.io/npm/types/jbq.svg)',
};
