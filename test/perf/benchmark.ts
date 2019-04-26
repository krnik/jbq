import Benchmark from 'benchmark';
import { jbq } from '../../src/core/jbq';
import { createTypes } from '../../src/types/mod';
import { createData } from '../data/mod';
import { suitesAny } from '../data/suites/Any.suites';
import { suitesArray } from '../data/suites/Array.suites';
import { suitesBoolean } from '../data/suites/Boolean.suites';
import { suitesNumber } from '../data/suites/Number.suites';
import { suitesObject } from '../data/suites/Object.suites';
import { suitesString } from '../data/suites/String.suites';
import { TestSuite } from '../data/suites/typings';

const findArg = (prefix: string) => {
    const regex = new RegExp(`^${prefix}[a-zA-Z_]+$`);
    const arg = process.argv.find((a) => regex.test(a));
    return arg && arg.replace(prefix, '');
};

const selectType = findArg('type=');
const selectTest = findArg('test=');

function handlePass(fn: (...x: any[]) => any) {
    return () => {
        if (fn() !== undefined) throw Error('It should not return any errors.');
    };
}

function handleFail(fn: (...x: any[]) => any) {
    return () => {
        if (fn() === undefined) throw Error('It should return an error.');
    };
}

const nameRegex = /^(?<type>\w+)#(?<test>\w+)/;
function extractSuiteNames(name: string) {
    interface IRegexpExec extends RegExpExecArray {
        groups: {
            type: string;
            test: string;
        };
    }
    const {
        groups: { type, test },
    } = nameRegex.exec(name)! as IRegexpExec;
    return { type, test };
}

function printSuiteName(name: string, type: string, test: string, valid: boolean) {
    const tp = `\x1b[36m${type}\x1b[0m`;
    const tst = `\x1b[33m${test}\x1b[0m`;
    const nameWithColor = name.replace(type, tp).replace(test, tst);
    const prefixCol = valid ? 34 : 31;
    const prefix = `\x1b[${prefixCol}m${valid ? 'Pass: ' : 'Fail: '}\x1b[0m`;
    return `${prefix}${nameWithColor}`;
}

function createTests(bench: Benchmark.Suite, suites: TestSuite[]) {
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

Bench.on('cycle', (event: any) => console.log(String(event.target))).run({ async: true });
