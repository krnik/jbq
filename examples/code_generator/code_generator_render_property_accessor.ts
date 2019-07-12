import { equal } from 'assert';
import { CodeGenerator } from '../../src/dev';

// Array<[accessor, expectedResult]>
const numericAccessor = '100';
equal(CodeGenerator.renderPropertyAccessor(numericAccessor), `[100]`);

const validVarNameAccessor = '$jquery';
equal(CodeGenerator.renderPropertyAccessor(validVarNameAccessor), `.$jquery`);

const stringAccessor = '100=100';
equal(CodeGenerator.renderPropertyAccessor(stringAccessor), '[`100=100`]');
