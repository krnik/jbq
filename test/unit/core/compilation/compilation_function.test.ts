import { expect } from 'chai';
import { Compilation } from '../../../../src/core/compilation';
import { PathResolutionStrategy } from '../../../../src/core/jbq/jbq_typings';
import { KeywordValidationFunctionKind } from '../../../../src/core/type_store/type_instance/type_instance_typings';
import {
    PROP_DATA_PATH,
    SYM_SCHEMA_PROPERTIES,
    TYPE,
    TYPE_BOOLEAN,
    TYPE_NUMBER,
    TYPE_OBJECT,
    VALUE,
} from '../../../../src/misc/constants';
import { createTypes } from '../../../../src/type/mod';
import { isValidationError } from '../../../utils';

describe('Compilation', (): void => {
    describe(`Kind: ${KeywordValidationFunctionKind.Function}`, (): void => {
        const suites = [
            {
                schema: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        verified: {
                            [TYPE]: TYPE_BOOLEAN,
                        },
                        active: {
                            [TYPE]: TYPE_BOOLEAN,
                            [VALUE]: {
                                [PROP_DATA_PATH]: 'verified',
                            },
                        },
                    },
                },
                data: {
                    valid: (): unknown[] => [
                        { verified: false, active: false },
                        { verified: true, active: true },
                    ],
                    invalid: (): unknown[] => [
                        { verified: true, active: false },
                        { verified: false, active: true },
                    ],
                },
                options: {},
            },
            {
                schema: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        received: {
                            [TYPE]: TYPE_OBJECT,
                            [SYM_SCHEMA_PROPERTIES]: {
                                age: {
                                    [TYPE]: TYPE_NUMBER,
                                    [VALUE]: {
                                        min: { [PROP_DATA_PATH]: 'valid/minimum' },
                                        max: { [PROP_DATA_PATH]: 'valid/maximum' },
                                    },
                                },
                            },
                        },
                        valid: {
                            [TYPE]: TYPE_OBJECT,
                            [SYM_SCHEMA_PROPERTIES]: {
                                minimum: {
                                    [TYPE]: TYPE_NUMBER,
                                },
                                maximum: {
                                    [TYPE]: TYPE_NUMBER,
                                },
                            },
                        },
                    },
                },
                data: {
                    valid: (): unknown[] => [
                        { received: { age: 20 }, valid: { minimum: 15, maximum: 25 } },
                        { received: { age: 0 }, valid: { minimum: -15, maximum: 25 } },
                    ],
                    invalid: (): unknown[] => [
                        { received: { age: 20 }, valid: { minimum: 15, maximum: 19 } },
                        { received: { age: 0 }, valid: { minimum: 5, maximum: 25 } },
                    ],
                },
                options: {},
            },
            {
                schema: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        verified: {
                            [TYPE]: TYPE_BOOLEAN,
                        },
                        active: {
                            [TYPE]: TYPE_BOOLEAN,
                            [VALUE]: {
                                [PROP_DATA_PATH]: 'missing',
                            },
                        },
                    },
                },
                data: {
                    valid: (): unknown[] => [
                        { verified: false, active: false },
                        { verified: true, active: false },
                        { verified: false, active: true },
                        { verified: true, active: true },
                    ],
                    invalid: (): unknown[] => [
                        { verified: true, active: false, missing: true },
                        { verified: false, active: true, missing: false },
                    ],
                },
                options: {
                    handleResolvedPaths: PathResolutionStrategy.Skip,
                },
            },
            {
                schema: {
                    [TYPE]: TYPE_BOOLEAN,
                    [VALUE]: {
                        [PROP_DATA_PATH]: 'missing',
                    },
                },
                data: {
                    valid: (): unknown[] => [true, false],
                    invalid: (): unknown[] => [],
                },
                options: {
                    handleResolvedPaths: PathResolutionStrategy.Skip,
                },
            },
            {
                schema: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        active: {
                            [TYPE]: TYPE_BOOLEAN,
                            [VALUE]: {
                                [PROP_DATA_PATH]: 'verified',
                                [TYPE]: TYPE_BOOLEAN,
                            },
                        },
                    },
                },
                data: {
                    valid: (): unknown[] => [
                        { verified: false, active: false },
                        { verified: true, active: true },
                    ],
                    invalid: (): unknown[] => [
                        { verified: true, active: false },
                        { verified: false, active: true },
                        { active: true },
                        { verified: 1, active: true },
                    ],
                },
                options: { handleResolvedPaths: PathResolutionStrategy.Schema },
            },
            {
                schema: {
                    [TYPE]: TYPE_BOOLEAN,
                    [VALUE]: {
                        [PROP_DATA_PATH]: 'missing',
                    },
                },
                data: {
                    valid: (): unknown[] => [],
                    invalid: (): unknown[] => [true, false],
                },
                options: { handleResolvedPaths: PathResolutionStrategy.Schema },
            },
            {
                schema: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        verified: {
                            [TYPE]: TYPE_BOOLEAN,
                        },
                        active: {
                            [TYPE]: TYPE_BOOLEAN,
                            [VALUE]: {
                                [PROP_DATA_PATH]: 'missing',
                            },
                        },
                    },
                },
                data: {
                    valid: (): unknown[] => [
                        { verified: false, active: false, missing: false },
                        { verified: true, active: false, missing: false },
                        { verified: false, active: true, missing: true },
                        { verified: true, active: true, missing: true },
                    ],
                    invalid: (): unknown[] => [
                        { verified: true, active: false },
                        { verified: false, active: true },
                        { verified: true, active: false, missing: true },
                        { verified: false, active: true, missing: false },
                    ],
                },
                options: { handleResolvedPaths: PathResolutionStrategy.Return },
            },
            {
                schema: {
                    [TYPE]: TYPE_BOOLEAN,
                    [VALUE]: {
                        [PROP_DATA_PATH]: 'missing',
                    },
                },
                data: {
                    valid: (): unknown[] => [],
                    invalid: (): unknown[] => [true, false],
                },
                options: { handleResolvedPaths: PathResolutionStrategy.Return },
            },
        ] as const;

        for (const [index, suite] of suites.entries()) {
            it(`it should resulve correct paths successfully - ${index}`, (): void => {
                const source = new Compilation(
                    createTypes(),
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
