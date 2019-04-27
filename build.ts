import { readdirSync, renameSync, rmdirSync, existsSync, statSync, unlink, unlinkSync } from 'fs';
import { resolve } from 'path';

function rm (src: string): void {
    const stat = statSync(src);
    if (stat.isFile()) {
        unlinkSync(src);
    } else {
        for (const path of readdirSync(src)) {
            rm(resolve(src, path));
        }
        rmdirSync(src);
    }
}

function move(src: string, dest: string): void {
    const source = resolve(__dirname, src);
    const files = readdirSync(source);
    for (const file of files) {
        const srcPath = resolve(__dirname, src, file);
        try {
            const destPath = resolve(dest, file);
            if (existsSync(destPath)) {
                rm(destPath);
            }
            renameSync(srcPath, resolve(dest, file));
        } catch (e) {
            console.error(`Could not move: ${srcPath}`);
        }
    }
    if (readdirSync(source).length === 0) {
        console.log('Moved all files.');
        rmdirSync(source);
    } else {
        for (const path of files) {
            if (existsSync(path)) {
                rm(path);
            }
        }
    }
}

move('./lib', '.');
