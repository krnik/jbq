import { equal } from 'assert';
import { CodeGenerator } from '../../src/dev';

const fnCall = CodeGenerator.renderFunctionCall('callback', '10', '/user/name', 'data');
equal(true, fnCall.startsWith('const callback_res = callback(10, `/user/name`, data);'));
equal(true, fnCall.endsWith('if (callback_res) return callback_res;'));
