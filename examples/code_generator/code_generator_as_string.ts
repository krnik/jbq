import { equal } from 'assert';
import { CodeGenerator } from '../../src/dev';

equal(CodeGenerator.asString('github is a service'), '`github is a service`');
equal(CodeGenerator.asString('taggedTemplate``'), '`taggedTemplate\\`\\``');
