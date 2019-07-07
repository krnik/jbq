import { expect } from 'chai';
import { Compilation } from '../../../../src/core/compilation';
import { SYM_SCHEMA_COLLECTION, TYPE } from '../../../../src/misc/constants';
import { createTypes } from '../../../../src/type/mod';
import { suitesAny } from '../../../data/suites/any_suite';
import { suitesArray } from '../../../data/suites/array_suite';
import { suitesBoolean } from '../../../data/suites/boolean_suite';
import { suitesNumber } from '../../../data/suites/number_suite';
import { suitesObject } from '../../../data/suites/object_suite';
import { suitesString } from '../../../data/suites/string_suite';
import { ParseValues, ParameterName } from '../../../../src/core/compilation/compilation_typings';
import { TypeInstance } from '../../../../src/core/type_store/type_instance';

describe('Compilation', (): void => {
    it('Compiling test schemas', (): void => {
        const suites = [
            ...suitesAny,
            ...suitesArray,
            ...suitesBoolean,
            ...suitesNumber,
            ...suitesObject,
            ...suitesString,
        ];
        for (const { schema, name } of suites) {
            new Compilation(createTypes(), schema, name).execSync();
            new Compilation(createTypes(), schema, name, { async: true }).execSync();
        }
    });

    describe('Compilation.prototype.evaluateExpressions', (): void => {
        it('it should eval expressions', (): void => {
            const tests = [
                {
                    expr: '{{100 + schemaValue}}',
                    val: { schemaValue: 100 },
                    expected: '200',
                },
                {
                    expr: '{{schemaValue / 10}}',
                    val: { schemaValue: 100 },
                    expected: '10',
                },
                {
                    expr: '{{schemaValue.fill(0)}}',
                    val: { schemaValue: new Array(10) },
                    expected: new Array(10).fill(0).toString(),
                },
                {
                    expr: '{{"[]"}}',
                    val: { schemaValue: new Array(10) },
                    expected: '[]',
                },
            ];
            for (const { expr, val, expected } of tests) {
                const res = Compilation.prototype['evaluateExpressions'](expr, val as ParseValues);
                expect(res).to.be.equal(expected);
            }
        });
    });

    describe('Compilation.prototype.sortSchemaEntries', (): void => {
        it('it should sort object entries by given order', (): void => {
            const descriptor = { validator(): void {}, schemaValidator(): void {} };
            const schema = {
                first: 1,
                second: 2,
                third: 3,
                fourth: 4,
                fifth: 5,
                sixth: 10,
            };
            const keywordOrder = ['first', 'third', 'sixth'];
            const type = new TypeInstance('TestType');
            Object.keys(schema).forEach(
                (key): void => {
                    type.setKeyword(key, descriptor);
                },
            );
            type.setKeywordOrder(keywordOrder);

            const sortedEntries = Compilation.prototype['sortSchemaEntries'](schema, type);

            const [first, third, sixth, second, fourth, fifth] = sortedEntries;

            expect(first[0]).to.be.equal(keywordOrder[0]);
            expect(first[1]).to.be.equal(schema.first);

            expect(third[0]).to.be.equal(keywordOrder[1]);
            expect(third[1]).to.be.equal(schema.third);

            expect(sixth[0]).to.be.equal(keywordOrder[2]);
            expect(sixth[1]).to.be.equal(schema.sixth);

            expect(second[1]).to.be.equal(schema.second);
            expect(fourth[1]).to.be.equal(schema.fourth);
            expect(fifth[1]).to.be.equal(schema.fifth);
        });
    });

    describe('Compiling async - collection yield statements interval', (): void => {
        it('it should yield every N iterations', async (): Promise<void> => {
            const testSchema = {
                [TYPE]: 'array',
                [SYM_SCHEMA_COLLECTION]: {
                    [TYPE]: 'number',
                },
            };

            const compiled = new Compilation(createTypes(), testSchema, 'Async', {
                async: true,
                asyncInterval: 10,
            }).execSync();

            const AsyncFnConstructor = Object.getPrototypeOf(async function*(): unknown {})
                .constructor;

            const validator = new AsyncFnConstructor(
                ParameterName.Arguments,
                ParameterName.Data,
                compiled.code,
            ).bind(undefined, compiled.arguments);

            let yieldCount = 0;

            const asyncValidator = async ($DATA: unknown): Promise<void> => {
                const generator = validator($DATA);

                while (true) {
                    const result = await generator.next();

                    if (result.done) return;
                    yieldCount += 1;
                }
            };

            await asyncValidator(new Array(10).fill(0));
            expect(yieldCount).to.be.equal(1);
        });
    });
});
