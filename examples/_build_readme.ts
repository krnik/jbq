import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import * as CONST from '../src/misc/constants';

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

const exprRegex = /{{(.*?)}}/g;

function compile(source: string): string {
    return source.replace(
        exprRegex,
        (_: string, match: string): string => {
            return new Function(params.join(','), `return ${match}`)(...args);
        },
    );
}

function example(exampleName: string, index?: number): string {
    const examples = readFileSync(resolve(__dirname, exampleName, `${exampleName}.ts`));
    let content = examples.toString().replace(/\/\*\W?eslint-.*?$/gm, '');

    if (index !== undefined) content = content.split('//example_region')[index];

    if (!content) {
        const msg = `Not found: ${exampleName}${index ? `[${index}]` : ''}`;
        throw Error(msg);
    }

    content = content.replace(/import[\w\W]+?;/gm, '').trim();

    return `\n\`\`\`typescript\n${content}\n\`\`\`\n`;
}

function include(page: string): string {
    const file = readFileSync(resolve(__dirname, page, `${page}.md`)).toString();
    return compile(file);
}

bringToScope({ example, include });

async function create(): Promise<void> {
    const content = compile(readFileSync(resolve(__dirname, 'README.md')).toString());
    writeFileSync(resolve(__dirname, '../', `README.md`), content);
}

create();
