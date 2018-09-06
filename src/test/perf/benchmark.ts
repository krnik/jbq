import AJV from 'ajv';
import Benchmark from 'benchmark';
import Joi from 'joi';
import { VJS } from '../../core/VJS';
import { createTypes } from '../../types/index';
import { booleanTests } from './tests/boolean';
import { numberTests } from './tests/number';
import { stringTests } from './tests/string';
import { arrayTests } from './tests/array';

interface ITest {
    name: string;
    data: any;
    schemas: Array<{
        type: string;
        ajv?: any;
        vjs?: any;
        joi?: any;
    }>;
}
function createTests (bench: Benchmark.Suite, test: ITest) {
    const passing = {
        vjs (fn: (...x: any[]) => any) {
            return () => {
                if (fn() !== undefined) throw Error('It should not return any errors');
            };
        },
        ajv (fn: () => any) {
            return () => {
                if (!fn()) throw Error('It should not return any errors');
            };
        },
        joi (fn: () => any) {
            return () => {
                if (fn().error) throw Error('It should not return any errors');
            };
        },
    };
    function createName (type: string, prop: string, lib: string) {
        const t = `\x1b[33m${type}\x1b[0m`;
        const p = `\x1b[36m${prop}\x1b[0m`;
        const l = `\x1b[33m${lib}\x1b[0m`;
        return `${t}#${p}#${l}`;
    }
    for (const schema of test.schemas) {
        const name = createName.bind(undefined, test.name, schema.type);
        if (schema.vjs) {
            const vjs = VJS(createTypes(), { string: schema.vjs });
            bench.add(name('vjs'), passing.vjs(vjs.string.bind(undefined, test.data)));
        }
        if (schema.ajv) {
            const ajv = new AJV().compile(schema.ajv);
            bench.add(name('ajv'), passing.ajv(ajv.bind(undefined, test.data)));
        }
        if (schema.joi)
            bench.add(name('joi'), passing.joi(Joi.validate.bind(Joi, test.data, schema.joi)));
    }
}

const Bench = new Benchmark.Suite();
createTests(Bench, stringTests);
createTests(Bench, numberTests);
createTests(Bench, booleanTests);
for (const test of arrayTests) createTests(Bench, test);

Bench
    // tslint:disable-next-line: no-console
    .on('cycle', (event: any) => console.log(String(event.target)))
    .on('complete', function () {
        // @ts-ignore
        // tslint:disable-next-line: no-console
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ async: true });
