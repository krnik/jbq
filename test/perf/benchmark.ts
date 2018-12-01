import AJV from 'ajv';
import Benchmark from 'benchmark';
import Joi from 'joi';
import { jbq } from '../../src/core/jbq';
import { createTypes } from '../../src/types/main';
import { arrayTests } from './suites/array';
import { booleanTests } from './suites/boolean';
import { customTests } from './suites/custom';
import { numberTests } from './suites/number';
import { objectTests } from './suites/object';
import { stringTests } from './suites/string';

const findArg = (prefix: string) => {
    const regex = new RegExp(`^${prefix}[a-zA-Z_]+$`);
    const arg = process.argv.find((a) => regex.test(a));
    return arg && arg.replace(prefix, '');
};

const selectSuite = findArg('suite=');
const selectTest = findArg('test=');
const selectLib = findArg('lib=');
const selectLibrary = (name: string) => selectLib ? name === selectLib : true;
const allow = {
    jbq: selectLibrary('jbq'),
    ajv: selectLibrary('ajv'),
    joi: selectLibrary('joi'),
    yup: selectLibrary('yup'),
};

interface ITest {
    name: string;
    data: any;
    fail?: boolean;
    schemas: Array<{
        name: string;
        data?: any;
        ajv?: any;
        jbq?: any;
        joi?: any;
        yup?: any;
    }>;
}
export function createTests (bench: Benchmark.Suite, test: ITest) {
    if (selectSuite && selectSuite !== test.name) return;
    const check = {
        jbq: {
            pass (fn: (...x: any[]) => any) {
                return () => {
                    if (fn() !== undefined) throw Error('It should not return any errors.');
                };
            },
            fail (fn: (...x: any[]) => any) {
                return () => {
                    if (fn() === undefined)
                        throw Error('It should return an error.');
                };
            },
        },
        ajv: {
            pass (fn: () => any) {
                return () => {
                    if (!fn()) throw Error('It should not return any errors.');
                };
            },
            fail (fn: () => any) {
                return () => {
                    if (fn()) throw Error('It should return false.');
                };
            },
        },
        joi: {
            pass (fn: () => any) {
                return () => {
                    if (fn().error) throw Error('It should not return any errors.');
                };
            },
            fail (fn: () => any) {
                return () => {
                    if (!fn().error) throw Error('It should return an error.');
                };
            },
        },
        yup: {
            pass (fn: () => any) {
                return () => fn();
            },
            fail (fn: () => any) {
                return () => {
                    try {
                        fn();
                        throw Error('It should throw an error');
                        // tslint:disable-next-line: no-empty
                    } catch (err) { }
                };
            },
        },
    };
    function createName (type: string, prop: string, lib: string) {
        const t = `\x1b[36m${type}\x1b[0m`;
        const p = `\x1b[33m${prop}\x1b[0m`;
        const l = `\x1b[36m${lib}\x1b[0m`;
        return `${t} # ${p} # ${l}`;
    }
    for (const schema of test.schemas) {
        if (selectTest && selectTest !== schema.name)
            continue;
        const data = schema.data !== undefined ? schema.data : test.data;
        const name = createName.bind(undefined, test.name, schema.name);
        if (schema.jbq && allow.jbq) {
            const jbqValidators = jbq(createTypes(), { test: schema.jbq });
            const wrapper = test.fail ? check.jbq.fail : check.jbq.pass;
            bench.add(name('jbq'), wrapper(jbqValidators.test.bind(undefined, data)));
        }
        if (schema.ajv && allow.ajv) {
            const ajv = new AJV().compile(schema.ajv);
            const wrapper = test.fail ? check.ajv.fail : check.ajv.pass;
            bench.add(name('ajv'), wrapper(ajv.bind(undefined, data)));
        }
        if (schema.joi && allow.joi) {
            const wrapper = test.fail ? check.joi.fail : check.joi.pass;
            bench.add(name('joi'), wrapper(() => Joi.validate(data, schema.joi)));
        }
        if (schema.yup && allow.yup) {
            const wrapper = test.fail ? check.yup.fail : check.yup.pass;
            bench.add(name('yup'), wrapper(() => schema.yup.validateSync(data)));
        }
    }
}

const Bench = new Benchmark.Suite();
for (const test of [
    ...arrayTests,
    ...objectTests,
    ...stringTests,
    ...numberTests,
    ...booleanTests,
]) createTests(Bench, test);
for (const test of customTests)
    Bench.add(test.name, test);

Bench
    // tslint:disable-next-line: no-console
    .on('cycle', (event: any) => console.log(String(event.target)))
    .run({ async: true });
