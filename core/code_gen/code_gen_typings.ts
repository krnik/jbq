import { Keyword } from './token/keyword.ts';
import { ComparisonOperator, LogicalOperator } from './token/operator.ts';

/**
 * Interface representing an object used to build if statement condition.
 */
export interface IfCondition {
    operator: LogicalOperator | ComparisonOperator | Keyword;
    value: string;
    variableName: string;
    negate?: boolean;
}
