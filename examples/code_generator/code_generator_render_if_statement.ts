import { IfCondition } from '../../src/core/code_gen/code_gen_typings';
import { CodeGenerator, LogicalOperator, ComparisonOperator } from '../../src/dev';
import { equal, throws } from 'assert';

const ifs: IfCondition[] = [];
throws((): unknown => CodeGenerator.renderIfStatement(ifs, LogicalOperator.And));

ifs.push({
    variableName: 'date',
    value: '"2019-01-01"',
    negate: true,
    operator: ComparisonOperator.Equal,
});
ifs.push({
    variableName: 'hour',
    value: '12',
    operator: ComparisonOperator.GreaterOrEqual,
});
equal(
    CodeGenerator.renderIfStatement(ifs, LogicalOperator.Or),
    'if (!(date === "2019-01-01")||hour >= 12)',
);
