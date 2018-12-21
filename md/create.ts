import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import * as CONST from '../src/constants';
import { BADGE, MD, mdParts } from './md';

const _entries = Object.entries(CONST);
const params = _entries.map(([k]) => k).concat(['MD', 'BADGE']).join(',');
const args = _entries.map<any>(([_, v]) => v).concat([MD, BADGE]);

const exprRegex = /{{(.*?)}}/g;
for (const part of mdParts) {
    const templatePath = resolve(__dirname, 'templates', `${part.template}.md`);
    if (!existsSync(templatePath))
        continue;
    const content = readFileSync(templatePath)
        .toString()
        .replace(exprRegex, (_: any, match: string) => {
            return new Function(`_,${params}`, `return ${match}`)(part.template, ...args);
        });
    const path = resolve(__dirname, part.destination, `${part.name}.md`);
    writeFileSync(path, content);
}
