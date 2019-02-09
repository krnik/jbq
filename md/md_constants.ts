import { resolve } from 'path';
import { TYPE_NAME } from '../src/constants';

export const DIR = {
    ROOT: resolve(__dirname, '../'),
    WIKI: resolve(__dirname, '../jbq.wiki'),
};

export const WIKI_URL = 'https://github.com/krnik/jbq/wiki/';

function wikiTypeName (type: TYPE_NAME) {
    return `Type_${type.charAt(0).toUpperCase()}${type.slice(1)}`;
}

export const MD = {
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
};

export const BADGES = `
[![Build Status](https://travis-ci.org/krnik/jbq.svg?branch=master)](https://travis-ci.org/krnik/jbq)
[![](https://img.shields.io/npm/v/jbq.svg)](https://www.npmjs.com/package/jbq)
![](https://img.shields.io/npm/types/jbq.svg)
`;
