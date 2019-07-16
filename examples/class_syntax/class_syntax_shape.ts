import { equal } from 'assert';
import { compile, regex, shape, string, transform, Validator } from '../../src/class_syntax';

@compile()
class YearMonth extends Validator {
    @string
    @regex(/^\d{4}$/)
    @transform((property): number => Number(property))
    public year!: number;

    @string
    @regex(/^\d{2}$/)
    @transform((property): number => Number(property))
    public month!: number;
}

@compile()
class History extends Validator {
    @shape(YearMonth)
    public visitedAt!: YearMonth;

    @shape(YearMonth)
    public commentedAt!: YearMonth;
}

const visitedAt = { month: '12', year: '2000' };
const commentedAt = { month: '12', year: '2001' };
const history = new History().from({ visitedAt, commentedAt });

equal(history.commentedAt instanceof YearMonth, true);
equal(history.commentedAt.year, 2001);
equal(history.visitedAt instanceof YearMonth, true);
equal(history.visitedAt.year, 2000);
