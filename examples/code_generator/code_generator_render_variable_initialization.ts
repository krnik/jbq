import { equal } from 'assert';
import { CodeGenerator, Keyword } from '../../src/dev';

equal(
    CodeGenerator.renderVariableInitialization('date', 'new Date()', '', Keyword.Let),
    'let date = new Date();',
);

equal(
    CodeGenerator.renderVariableInitialization(
        'APP_ID',
        'ENVIRONMENT',
        '.APPLICATION_ID',
        Keyword.Const,
    ),
    'const APP_ID = ENVIRONMENT.APPLICATION_ID;',
);

equal(CodeGenerator.renderVariableInitialization('name', 'user.name'), 'const name = user.name;');
