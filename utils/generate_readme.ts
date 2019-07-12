import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import * as CONST from '../src/misc/constants';
import { walkDir } from './common';

const EXAMPLES_PATH = resolve(__dirname, '../examples/');

const args: unknown[] = [];
const params: unknown[] = [];

function addToArgs(obj: object): void {
    Object.entries(obj).forEach(
        ([key, value]): void => {
            args.push(value);
            params.push(key);
        },
    );
}

function getFileContent(ext: 'md' | 'ts', name: string): string {
    let contentPath: string | undefined = undefined;

    walkDir(
        EXAMPLES_PATH,
        (filePath: string): void => {
            if (filePath.endsWith(`${name}.${ext}`)) {
                contentPath = filePath;
            }
        },
    );

    if (contentPath === undefined) {
        throw new Error(name);
    }

    return readFileSync(contentPath).toString();
}

function execExpression(source: string): string {
    return source.replace(
        /{{(.*?)}}/g,
        (_: string, match: string): string => {
            try {
                return new Function(params.join(','), `return ${match}`)(...args);
            } catch (error) {
                console.log({ match, _, error });
                return match;
            }
        },
    );
}

function example(exampleName: string): string {
    const content = getFileContent('ts', exampleName)
        .toString()
        .replace(/\/\*\W?eslint-.*?$/gm, '')
        .replace(/import[\w\W]+?;/gm, '')
        .trim();

    const codeBlock = `\n\`\`\`typescript\n${content}\n\`\`\`\n`;
    return `<details><summary>Example</summary>\n${codeBlock}\n</details>`;
}

function include(pageName: string): string {
    const pageContent = getFileContent('md', pageName);
    return execExpression(pageContent);
}

addToArgs({ example, include });
addToArgs(CONST);

async function create(): Promise<void> {
    const content = execExpression(readFileSync(resolve(__dirname, './README.md')).toString());
    writeFileSync(resolve(__dirname, '../README.md'), content);
}

create();
