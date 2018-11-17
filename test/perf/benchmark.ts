import AJV from 'ajv';
import Benchmark from 'benchmark';
import Joi from 'joi';
import { VJS } from '../../src/core/VJS';
import { createTypes } from '../../src/types/main';
import { arrayTests } from './suites/array';
import { booleanTests } from './suites/boolean';
import { numberTests } from './suites/number';
import { objectTests } from './suites/object';
import { stringTests } from './suites/string';

interface ITest {
    name: string;
    data: any;
    fail?: boolean;
    schemas: Array<{
        type: string;
        data?: any;
        ajv?: any;
        vjs?: any;
        joi?: any;
    }>;
}
function createTests (bench: Benchmark.Suite, test: ITest) {
    const check = {
        vjs: {
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
    };
    function createName (type: string, prop: string, lib: string) {
        const t = `\x1b[33m${type}\x1b[0m`;
        const p = `\x1b[36m${prop}\x1b[0m`;
        const l = `\x1b[33m${lib}\x1b[0m`;
        return `${t}#${p}#${l}`;
    }
    for (const schema of test.schemas) {
        const data = schema.data || test.data;
        const name = createName.bind(undefined, test.name, schema.type);
        if (schema.vjs) {
            const vjs = VJS(createTypes(), { test: schema.vjs });
            const wrapper = test.fail ? check.vjs.fail : check.vjs.pass;
            bench.add(name('vjs'), wrapper(vjs.test.bind(undefined, data)));
        }
        if (schema.ajv) {
            const ajv = new AJV().compile(schema.ajv);
            const wrapper = test.fail ? check.ajv.fail : check.ajv.pass;
            bench.add(name('ajv'), wrapper(ajv.bind(undefined, data)));
        }
        if (schema.joi) {
            const wrapper = test.fail ? check.joi.fail : check.joi.pass;
            bench.add(name('joi'), wrapper(() => Joi.validate(data, schema.joi)));
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

Bench
    // tslint:disable-next-line: no-console
    .on('cycle', (event: any) => console.log(String(event.target)))
    .run({ async: true });
