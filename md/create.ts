import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import * as CONST from '../src/misc/constants';
import * as MD_CONST from './md_constants';

let currentPage: string;
const params: string[] = [];
const args: unknown[] = [];

function bringToScope(obj: object): void {
    Object.entries(obj).forEach(
        ([k, v]): void => {
            params.push(k);
            args.push(v);
        },
    );
}

bringToScope(CONST);
bringToScope(MD_CONST);

const exprRegex = /{{(.*?)}}/g;
function compile(source: string): string {
    return source.replace(
        exprRegex,
        (_: unknown, match: string): string => {
            return new Function(params.join(','), `return ${match}`)(...args);
        },
    );
}

function example(exampleName: string): string {
    const examples = readFileSync(resolve(currentPage, 'examples.ts'));
    const regex = new RegExp(`//example:${exampleName}\\b([\\W\\w]+)//example:${exampleName}\\b`);
    const content = examples.toString().match(regex);
    if (!content) throw Error('Content not found!');
    return `\`\`\`typescript${content[1]}\`\`\`\n`;
}

function wikiLink(pageName: string, display?: string): string {
    return `[${display || pageName}](${MD_CONST.WIKI_URL + pageName})`;
}

function wikiType(type: CONST.TYPE_NAME, anchor: string, anc?: number): string {
    const typeFile = `Type${type.charAt(0).toUpperCase()}${type.slice(1)}`;
    const hash = anchor ? `#${anchor}` : '';
    return `[${anc ? anchor : type}](${MD_CONST.WIKI_URL}${typeFile}${hash})`;
}

function sourceLink(type: CONST.TYPE_NAME): string {
    return `[Source](https://github.com/krnik/jbq/blob/master/src/types/${type
        .charAt(0)
        .toUpperCase() + type.slice(1)}.ts)`;
}

function include(fileName: string): string {
    const file = readFileSync(resolve(__dirname, 'includes', `${fileName}.md`)).toString();
    return compile(file);
}

bringToScope({ example, wikiLink, include, wikiType, sourceLink });

async function create(): Promise<void> {
    const pagesPath = resolve(__dirname, 'pages');
    const pages = readdirSync(pagesPath);
    for (const page of pages) {
        currentPage = resolve(pagesPath, page);
        const { NAME, PATH } = await import(resolve(currentPage, 'locals.ts'));
        const content = compile(readFileSync(resolve(currentPage, 'template.md')).toString());
        writeFileSync(resolve(PATH, `${NAME}.md}`), content);
    }
}

create();
