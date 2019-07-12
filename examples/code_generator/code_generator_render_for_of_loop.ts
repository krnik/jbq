import { equal } from 'assert';
import { CodeGenerator } from '../../src/dev';

const forOfLoop = CodeGenerator.renderForOfLoop('user', 'allUsers', '');
equal(true, forOfLoop.endsWith('for (const user of allUsers) {'));

const forOfLoop2 = CodeGenerator.renderForOfLoop('item', 'documentCollection', '');
equal(true, forOfLoop2.endsWith('for (const item of documentCollection) {'));
