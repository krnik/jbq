import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const IMPORT_REGEX = /from\W*'(?<path>.+?)'/g;

function updateImports(path: string): void {
    if (!statSync(path).isDirectory()) throw new Error('Cannot walk non-directory');

    for (const content of readdirSync(path)) {
        const contentPath = resolve(path, content);
        if (statSync(contentPath).isDirectory()) {
            updateImports(contentPath);
        } else {
            writeFileSync(
                contentPath,
                readFileSync(contentPath)
                    .toString()
                    .replace(
                        IMPORT_REGEX,
                        (m: string, s: string): string => m.replace(s, `${s}.js`),
                    ),
            );
        }
    }
}

function copyMetaFiles(dest: string, files: string[]): void {
    const source = resolve(__dirname, dest);
    for (const file of files) {
        const filePath = resolve(__dirname, file);
        if (!existsSync(filePath)) throw new Error('Cannot copy file that does not exist!');

        writeFileSync(resolve(source, file), readFileSync(filePath));
    }
}

copyMetaFiles('./build', ['./README.md', './package.json']);
updateImports('./build');
