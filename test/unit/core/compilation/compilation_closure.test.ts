import { expect } from 'chai';
import { Compilation } from '../../../../src/core/compilation';
import { ParseValues } from '../../../../src/core/compilation/compilation_typings';
import { PathResolutionStrategy, ValidationResult } from '../../../../src/core/jbq/jbq_typings';
import { TypeInstance } from '../../../../src/core/type_store/type_instance';
import { KeywordValidationFunctionKind } from '../../../../src/core/type_store/type_instance/type_instance_typings';
import {
    PROP_DATA_PATH,
    REQUIRED,
    SYM_SCHEMA_PROPERTIES,
    TYPE,
    TYPE_OBJECT,
    TYPE_ANY,
} from '../../../../src/misc/constants';
import { createTypes } from '../../../../src/type/mod';
import { schemaValidate } from '../../../../src/type/schema_validator';
import { isValidationError } from '../../../utils';

describe('Compilation', (): void => {
    describe(`Kind: ${KeywordValidationFunctionKind.Closure}`, (): void => {
        const nullableStringType = new TypeInstance('NullableString')
            .setKeyword(TYPE, {
                schemaValidator(schemaValue: unknown): void {
                    if (typeof schemaValue !== 'string')
                        throw new Error('Expected string as schemaValue.');
                },
                validator(
                    _schemaValue: ParseValues,
                    path: string,
                    $DATA: unknown,
                ): ValidationResult {
                    if ($DATA !== null && typeof $DATA !== 'string')
                        return {
                            path,
                            message: `${$DATA}`,
                        };
                },
                kind: KeywordValidationFunctionKind.Closure,
            })
            .setKeyword('logValue', {
                schemaValidator(): void {},
                validator(): void {},
                kind: KeywordValidationFunctionKind.Closure,
            })
            .setKeyword('value', {
                schemaValidator(schemaValue: unknown): void {
                    if (
                        schemaValue !== null &&
                        typeof schemaValue !== 'string' &&
                        !schemaValidate.dataPath(schemaValue)
                    )
                        throw new Error('expected string, datapath or null');
                },
                validator(schemaValue: unknown, path: string, $DATA: unknown): ValidationResult {
                    if (schemaValue !== $DATA)
                        return {
                            message: `schemaValue: ${schemaValue} | $DATA: ${$DATA}`,
                            path,
                        };
                },
                kind: KeywordValidationFunctionKind.Closure,
            });
        const typeStore = createTypes().addType(nullableStringType);

        const suites = [
            {
                schema: {
                    [TYPE]: 'NullableString',
                },
                data: {
                    valid: (): unknown[] => ['A String', null],
                    invalid: (): unknown[] => [{}, [], true, 1, undefined],
                },
                options: {},
            },
            {
                schema: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        mailing: { [TYPE]: TYPE_ANY },
                        enlistedOn: {
                            [TYPE]: 'NullableString',
                            logValue: { $dataPath: 'mailing' },
                        },
                    },
                },
                data: {
                    valid: (): unknown[] => [
                        { mailing: null, enlistedOn: null },
                        { mailing: 'enabled', enlistedOn: 'all' },
                    ],
                    invalid: (): unknown[] => [{}, { mailing: null, enlistedOn: true }],
                },
                options: {},
            },
            {
                schema: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        compare: {
                            [TYPE]: TYPE_ANY,
                        },
                        val: {
                            [TYPE]: 'NullableString',
                            value: {
                                [PROP_DATA_PATH]: 'compare',
                            },
                        },
                    },
                },
                data: {
                    valid: (): unknown[] => [
                        { compare: null, val: null },
                        { compare: '0', val: '0' },
                        { val: null },
                        { val: '1' },
                    ],
                    invalid: (): unknown[] => [
                        { compare: null, val: '0' },
                        { compare: '0', val: null },
                        { val: 1 },
                    ],
                },
                options: { handleResolvedPaths: PathResolutionStrategy.Skip },
            },
            {
                schema: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        val: {
                            [TYPE]: 'NullableString',
                            value: {
                                [PROP_DATA_PATH]: 'compare',
                                [TYPE]: TYPE_ANY,
                                [REQUIRED]: true,
                            },
                        },
                    },
                },
                data: {
                    valid: (): unknown[] => [
                        { compare: null, val: null },
                        { compare: '0', val: '0' },
                    ],
                    invalid: (): unknown[] => [
                        { compare: null, val: '0' },
                        { compare: '0', val: null },
                        { val: null },
                        { val: '1' },
                        { val: 1 },
                    ],
                },
                options: { handleResolvedPaths: PathResolutionStrategy.Schema },
            },
            {
                schema: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        val: {
                            [TYPE]: 'NullableString',
                            value: {
                                [PROP_DATA_PATH]: 'compare',
                            },
                        },
                    },
                },
                data: {
                    valid: (): unknown[] => [
                        { compare: null, val: null },
                        { compare: '0', val: '0' },
                    ],
                    invalid: (): unknown[] => [
                        { compare: null, val: '0' },
                        { compare: '0', val: null },
                        { val: null },
                        { val: '1' },
                        { val: 1 },
                    ],
                },
                options: { handleResolvedPaths: PathResolutionStrategy.Return },
            },
        ] as const;

        for (const [index, suite] of suites.entries()) {
            it(`it should resulve correct paths successfully - ${index}`, (): void => {
                const source = new Compilation(
                    typeStore,
                    suite.schema,
                    'CompDataPath',
                    suite.options,
                ).execSync();
                const validator = new Function(
                    source.argsParameter,
                    source.dataParameter,
                    source.code,
                ).bind(undefined, source.arguments);

                const validData = suite.data.valid();
                validData.forEach(
                    (data): void => {
                        expect(validator(data)).to.be.equal(undefined);
                    },
                );

                const invalidData = suite.data.invalid();
                invalidData.forEach(
                    (data): void => {
                        isValidationError(validator(data));
                    },
                );
            });
        }
    });
});
