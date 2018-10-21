import { BASE_DATA_PARAMETER } from '../constants';

export const CodeChunk = {
    label: (dataVariable: string) => `label_${dataVariable}: {\n`,

    closeBlock: () => `\n}\n`,

    defineVariable (dataVariable: string, oldDataVar: string, key: string) {
        return `\nconst ${dataVariable} = ${oldDataVar}[${key}];\n`;
    },

    forOfLoop: (dataVariable: string, oldDataVar: string) => `
if (!(Symbol.iterator in ${oldDataVar}))
    return 'Data requires to have ${Symbol.iterator.toString()} method implemented in order to use for..of loop';
for (const ${dataVariable} of ${oldDataVar})\n`,

    forLoop: (dataVariable: string, oldDataVar: string, accessor: string) => `
const ${oldDataVar}_len = ${oldDataVar}.length;
for (let ${accessor} = 0; ${accessor} < ${oldDataVar}_len; ${accessor}++) {
    const ${dataVariable} = ${oldDataVar}[${accessor}];
    `,

    externCall: (fnParam: string, data: string) => `
const ${fnParam}_result = ${fnParam}(${data});
if (${fnParam}_result) return ${fnParam}_result;
    `,

    externCallResolve: (fnParam: string, schemaValue: string, schemaPath: string, dataVariable: string) => `{
const ${fnParam}_result = ${fnParam}(${schemaValue}, ${schemaPath}, ${dataVariable});
if (${fnParam}_result) return ${fnParam}_result;
    }`,

    resolveDataCall (dataPath: string | string[], dataVariable: string) {
        const asStr = (str: string) => `\`${str.replace(/`/g, '\\`')}\``;
        const paths = Array.isArray(dataPath) ? dataPath : dataPath.split('/');
        const pathResolution = paths
            .filter((e) => e.length)
            .map((e, i, arr) => {
                const base = BASE_DATA_PARAMETER;
                if (!i) return `${base}[${asStr(e)}]`;
                const mid = arr.slice(0, i).map((s) => `[${asStr(s)}]`).join('');
                return `${base}${mid}[${asStr(e)}]`;
            })
            .join(' && ');
        return `const ${dataVariable} = ${pathResolution};\n if (${dataVariable} !== undefined) `;
    },
};
