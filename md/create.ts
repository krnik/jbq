import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import * as CONST from '../src/constants';
import * as MD_CONST from './md_constants';

let currentPage: string;
const params: string[] = [];
const args: any[] = [];

function bringToScope (obj: object) {
    Object.entries(obj).forEach(([k, v]) => {
        params.push(k);
        args.push(v);
    });
}

bringToScope(CONST);
bringToScope(MD_CONST);
bringToScope({ example, wikiLink, include });

const exprRegex = /{{(.*?)}}/g;
function compile (source: string) {
    return source
        .replace(exprRegex, (_: any, match: string) => {
            return new Function(params.join(','), `return ${match}`)(...args);
        });
}

function example (exampleName: string) {
    const examples = readFileSync(resolve(currentPage, 'examples.ts'));
    const regex = new RegExp(`//example:${exampleName}\\b([\\W\\w]+)//example:${exampleName}\\b`);
    const content = examples.toString().match(regex);
    if (!content)
        throw Error('Content not found!');
    return `\`\`\`typescript${content[1]}\`\`\`\n`;

}

function wikiLink (pageName: string, display?: string) {
    return `[${display || pageName}](${MD_CONST.WIKI_URL + pageName})`;
}

function include (fileName: string) {
    const file = readFileSync(resolve(__dirname, 'includes', `${fileName}.md`)).toString();
    return compile(file);
}

async function create () {
    const pagesPath = resolve(__dirname, 'pages');
    const pages = readdirSync(pagesPath);
    for (const page of pages) {
        currentPage = resolve(pagesPath, page);
        const { NAME, PATH } = await import(resolve(currentPage, 'locals.ts'));
        const content = compile(readFileSync(resolve(currentPage, 'template.md')).toString());
        writeFileSync(resolve(PATH, NAME + '.md'), content);
    }
}

create();
