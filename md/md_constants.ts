import { resolve } from 'path';

export const DIR = {
    ROOT: resolve(__dirname, '../'),
    WIKI: resolve(__dirname, '../jbq.wiki'),
};

export const WIKI_URL = 'https://github.com/krnik/jbq/wiki/';

export const BADGES = `
[![Build Status](https://travis-ci.org/krnik/jbq.svg?branch=master)](https://travis-ci.org/krnik/jbq)
[![](https://img.shields.io/npm/v/jbq.svg)](https://www.npmjs.com/package/jbq)
![](https://img.shields.io/npm/types/jbq.svg)
`;
