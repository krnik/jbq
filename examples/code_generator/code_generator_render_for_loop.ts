import { CodeGenerator } from '../../src/dev';
import { equal } from 'assert';

const forLoop = CodeGenerator.renderForLoop('arrayItem', 'arrayOfNumbers', 'i', '');
const lines = [
    'for (',
    'let i = 0;',
    'i < arrayOfNumbers_len;',
    'i++',
    ') {',
    'const arrayItem = arrayOfNumbers[i];',
];
equal(true, lines.every((line): boolean => forLoop.includes(line)));
