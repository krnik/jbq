import { resolve } from 'path';
import { walkDir } from './common';
import { readFileSync, writeFileSync } from 'fs';

const EXAMPLE_REGEX = /^(.+?)#example:(.+?)$/gm;
const NEW_LINE = '\n';

function readExample(exampleName: string): string {
    const exampleFileName = `${exampleName}.ts`;
    let exampleFilePath: string | undefined = undefined;

    walkDir(
        resolve(__dirname, '../examples/'),
        (path): void => {
            if (path.endsWith(exampleFileName)) {
                exampleFilePath = path;
            }
        },
    );

    if (exampleFilePath === undefined) {
        throw new Error(exampleFileName);
    }

    return readFileSync(exampleFilePath).toString();
}

function replaceExampleToken(fileContent: string): string {
    return fileContent.replace(
        EXAMPLE_REGEX,
        (_, prefix, exampleName): string =>
            readExample(exampleName)
                .replace(/\w+@/gm, '\\@')
                .replace(/import[\w\W]+?from\W*'.+?';/g, '')
                // .replace(/(equal|throws)\([\w\W]+?\);/g, '')
                .replace(/\/\*\W?eslint-.*?$/gm, '')
                .split(NEW_LINE)
                .map((line): string => `${prefix}    ${line}`)
                .join(NEW_LINE),
    );
}

function readFileAndReplaceExamples(path: string): void {
    const fileContent = readFileSync(path).toString();
    if (!EXAMPLE_REGEX.test(fileContent)) {
        return;
    }

    writeFileSync(path, replaceExampleToken(fileContent));
}

function appendJsDocExamples(path: string): void {
    walkDir(path, readFileAndReplaceExamples);
}

appendJsDocExamples(resolve(__dirname, '../build'));
appendJsDocExamples(resolve(__dirname, '../build_deno'));
