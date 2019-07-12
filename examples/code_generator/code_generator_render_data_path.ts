import { equal } from 'assert';
import { CodeGenerator } from '../../src/dev';

const dataPath = ['my', 'little', 'pony'];
equal(CodeGenerator.renderDataPath(dataPath), '(my/little/pony)');
equal(CodeGenerator.renderDataPath('user/name'), '(user/name)');
