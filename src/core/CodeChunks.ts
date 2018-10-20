export const codeChunk = {
    defineVar (varName: string, objName: string, key: string) {
        return `\nconst ${varName} = ${objName}[${key}];\n`;
    },
    forOf: (elemName: string, iterableName: string) => `
if (!(Symbol.iterator in ${iterableName}))
    return 'Data requires to have ${Symbol.iterator.toString()} method implemented in order to use for..of loop';
for (const ${elemName} of ${iterableName})\n`,
    forIn: (varName: string, oldVar: string, accessor: string) => `
const ${oldVar}_len = ${oldVar}.length;
for (let ${accessor} = 0; ${accessor} < ${oldVar}_len; ${accessor}++) {
    const ${varName} = ${oldVar}[${accessor}];
    `,
    externCall: (externFnParam: string, dataVarName: string) => `
const ${externFnParam}_result = ${externFnParam}(${dataVarName});
if (${externFnParam}_result) return ${externFnParam}_result;
    `,
};
