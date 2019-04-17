import { Keyword } from '../token/keyword';
import { ComparisonOperator, LogicalOperator } from '../token/operator';

export interface IfCondition {
    operator: LogicalOperator | ComparisonOperator | Keyword;
    value: string;
    variableName: string;
    negate?: boolean;
}
