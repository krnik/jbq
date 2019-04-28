import * as fs from 'https://deno.land/std/fs/mod.ts';

const IMPORT_REGEX = /from\W*'(?<path>.+?)'/g;

fs.ensureDirSync('./build_deno');

for (const fileInfo of fs.walkSync('src')) {
    const fileContent = fs.readFileStrSync(fileInfo.path, { encoding: 'utf8' });
    const writeToPath = fileInfo.path.replace('src', 'build_deno');

    fs.ensureFileSync(writeToPath);
    fs.writeFileStrSync(
        writeToPath,
        fileContent.replace(
            IMPORT_REGEX,
            (m: string, s: string): string => m.replace(s, `${s}.ts`),
        ),
    );
}
