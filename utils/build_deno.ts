import { writeFileSync, readFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'fs';
import { walkDir, copyFiles } from './common';
import { resolve } from 'path';

const IMPORT_PATH_REGEX = /from\W*'(?<path>.+?)'/g;

function recreateDirStructure(srcDirPath: string, destDirPath: string): void {
    if (!existsSync(destDirPath)) {
        mkdirSync(destDirPath);
    }

    const contents = readdirSync(srcDirPath);
    contents.forEach(
        (contentName): void => {
            const newSrcDirPath = resolve(srcDirPath, contentName);
            if (statSync(newSrcDirPath).isDirectory()) {
                recreateDirStructure(newSrcDirPath, resolve(destDirPath, contentName));
            }
        },
    );
}

function addFileExtensionsToImports(filePath: string): void {
    const fileContent = readFileSync(filePath)
        .toString()
        .replace(
            IMPORT_PATH_REGEX,
            (match: string, path: string): string => match.replace(path, `${path}.ts`),
        );

    writeFileSync(filePath, fileContent);
}

const BUILD_PATH = resolve(__dirname, '../build_deno/');
const SOURCE_PATH = resolve(__dirname, '../src/');

recreateDirStructure(SOURCE_PATH, BUILD_PATH);
walkDir(
    resolve(__dirname, '../src'),
    (path): void => {
        writeFileSync(path.replace(SOURCE_PATH, BUILD_PATH), readFileSync(path));
    },
);
walkDir(BUILD_PATH, addFileExtensionsToImports);
copyFiles(BUILD_PATH, ['../README.md']);
