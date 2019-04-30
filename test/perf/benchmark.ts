import Benchmark from 'benchmark';
import { jbq } from '../../src/core/jbq';
import { createTypes } from '../../src/type/mod';
import { createData } from '../data/mod';
import { suitesAny } from '../data/suites/any_suite';
import { suitesArray } from '../data/suites/array_suite';
import { suitesBoolean } from '../data/suites/boolean_suite';
import { suitesNumber } from '../data/suites/number_suite';
import { suitesObject } from '../data/suites/object_suite';
import { suitesString } from '../data/suites/string_suite';
import { TestSuite } from '../data/suites/suite.interface';

const findArg = (prefix: string): string | undefined => {
    const regex = new RegExp(`^${prefix}[a-zA-Z_]+$`);
    const arg = process.argv.find((a): boolean => regex.test(a));
    return arg && arg.replace(prefix, '');
};

const selectType = findArg('type=');
const selectTest = findArg('test=');

function handlePass(fn: (...x: unknown[]) => unknown): () => void {
    return (): void => {
        if (fn() !== undefined) throw Error('It should not return any errors.');
    };
}

function handleFail(fn: (...x: unknown[]) => unknown): () => void {
    return (): void => {
        if (fn() === undefined) throw Error('It should return an error.');
    };
}

const nameRegex = /^(?<type>\w+)#(?<test>\w+)/;
function extractSuiteNames(name: string): { type: string; test: string } {
    interface RegexpExec extends RegExpExecArray {
        groups: {
            type: string;
            test: string;
        };
    }
    const {
        groups: { type, test },
    } = nameRegex.exec(name) as RegexpExec;
    return { type, test };
}

function printSuiteName(name: string, type: string, test: string, valid: boolean): string {
    const tp = `\x1b[36m${type}\x1b[0m`;
    const tst = `\x1b[33m${test}\x1b[0m`;
    const nameWithColor = name.replace(type, tp).replace(test, tst);
    const prefixCol = valid ? 34 : 31;
    const prefix = `\x1b[${prefixCol}m${valid ? 'Pass: ' : 'Fail: '}\x1b[0m`;
    return `${prefix}${nameWithColor}`;
}

function createTests(bench: Benchmark.Suite, suites: TestSuite[]): void {
    for (const { name, valid, schema } of suites) {
        const { type, test } = extractSuiteNames(name);

        if (selectType && selectType !== type) return;
        if (selectTest && selectTest !== test) continue;

        const data = createData(schema);

        const { PerfTestFn } = jbq(createTypes(), { PerfTestFn: schema });
        const perfFn = (valid ? handlePass : handleFail)(PerfTestFn.bind(undefined, data));
        bench.add(printSuiteName(name, type, test, valid), perfFn);
    }
}

const Bench = new Benchmark.Suite();
for (const suites of [
    suitesAny,
    suitesArray,
    suitesBoolean,
    suitesNumber,
    suitesObject,
    suitesString,
])
    createTests(Bench, suites);

Bench.on('cycle', (event: Benchmark.Event): void => console.log(String(event.target))).run({
    async: true,
});
