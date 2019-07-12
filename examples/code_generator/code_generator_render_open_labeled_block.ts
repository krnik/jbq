import { equal } from 'assert';
import { CodeGenerator } from '../../src/core/code_gen';

const label = 'validate_type';
equal(CodeGenerator.renderOpenLabeledBlock(label), 'label_validate_type: {');

const label2 = 'loop';
equal(CodeGenerator.renderOpenLabeledBlock(label2), 'label_loop: {');
