import { statSync, readdirSync, existsSync, writeFileSync, readFileSync } from 'fs';
import { resolve, basename } from 'path';

export function walkDir(path: string, callback: (filePath: string) => void): void {
    if (!statSync(path).isDirectory()) throw new Error('Cannot walk non-directory.');

    for (const content of readdirSync(path)) {
        const contentPath = resolve(path, content);

        if (statSync(contentPath).isDirectory()) {
            walkDir(contentPath, callback);
        } else {
            callback(contentPath);
        }
    }
}

export function copyFiles(dest: string, files: string[]): void {
    const destPath = resolve(__dirname, dest);

    for (const file of files) {
        const fileName = basename(file);
        const filePath = resolve(__dirname, file);
        if (!existsSync(filePath)) throw new Error('Cannot copy file that does not exist!');

        writeFileSync(resolve(destPath, fileName), readFileSync(filePath));
    }
}
