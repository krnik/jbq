import { CodeGenerator } from '../../src/dev';
import { equal, throws } from 'assert';

const dataPath = 'contact/email';
const resolution = CodeGenerator.renderDataPathResolution(dataPath, 'email', 'user');

equal(resolution, 'const email = user.contact&&user.contact.email;');
throws((): unknown => CodeGenerator.renderDataPathResolution('/', 'name'));
equal(CodeGenerator.renderDataPathResolution(['/'], 'slash', 'data'), 'const slash = data[`/`];');
