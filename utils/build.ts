import { writeFileSync, readFileSync } from 'fs';
import { walkDir, copyFiles } from './common';
import { resolve } from 'path';

const IMPORT_PATH_REGEX = /from\W*'(?<path>.+?)'/g;

function addFileExtensionsToImports(filePath: string): void {
    const fileContent = readFileSync(filePath)
        .toString()
        .replace(
            IMPORT_PATH_REGEX,
            (match: string, path: string): string => match.replace(path, `${path}.js`),
        );

    writeFileSync(filePath, fileContent);
}

const BUILD_PATH = resolve(__dirname, '../build');

walkDir(BUILD_PATH, addFileExtensionsToImports);
copyFiles(BUILD_PATH, ['../README.md', '../package.json']);
