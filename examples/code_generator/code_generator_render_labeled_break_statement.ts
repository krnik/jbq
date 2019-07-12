import { equal } from 'assert';
import { CodeGenerator } from '../../src/dev';

const label = 'validate_type_keyword';
equal(CodeGenerator.renderLabeledBreakStatement(label), 'break label_validate_type_keyword;');

const label2 = 'loop';
equal(CodeGenerator.renderLabeledBreakStatement(label2), 'break label_loop;');
