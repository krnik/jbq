import * as fs from 'https://deno.land/std/fs/mod.ts';

const REG = /from\W*'(?<path>.+?)'/g;

for (const fileInfo of fs.walkSync('src')) {
    const fileContent = fs.readFileStrSync(fileInfo.path, { encoding: 'utf8' });
    const writeToPath = fileInfo.path.replace('src', '.');

    fs.writeFileStrSync(
        writeToPath,
        fileContent.replace(REG, (m: string, s: string): string => m.replace(s, `${s}.ts`)),
    );
}
