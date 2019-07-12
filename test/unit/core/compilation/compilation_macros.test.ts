import { expect } from 'chai';
import { Compilation } from '../../../../src/core/compilation';
import { PathResolutionStrategy } from '../../../../src/core/jbq/jbq_typings';
import { KeywordValidationFunctionKind } from '../../../../src/core/type_store/type_instance/type_instance_typings';
import {
    LEN,
    PROP_DATA_PATH,
    SYM_SCHEMA_PROPERTIES,
    TYPE,
    TYPE_NUMBER,
    TYPE_OBJECT,
    TYPE_STRING,
    VALUE,
} from '../../../../src/misc/constants';
import { createTypes } from '../../../../src/type/mod';
import { isValidationError } from '../../../utils';

describe('Compilation', (): void => {
    describe(`Kind: ${KeywordValidationFunctionKind.Macro}`, (): void => {
        const suites = [
            {
                schema: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        range: {
                            [TYPE]: TYPE_OBJECT,
                            [SYM_SCHEMA_PROPERTIES]: {
                                min: {
                                    [TYPE]: TYPE_NUMBER,
                                    [VALUE]: {
                                        min: 0,
                                        max: { [PROP_DATA_PATH]: 'range/max' },
                                    },
                                },
                                max: {
                                    [TYPE]: TYPE_NUMBER,
                                    [VALUE]: {
                                        min: { [PROP_DATA_PATH]: 'range/min' },
                                    },
                                },
                            },
                        },
                        username: {
                            [TYPE]: TYPE_STRING,
                            [LEN]: {
                                min: { [PROP_DATA_PATH]: 'range/min' },
                                max: { [PROP_DATA_PATH]: 'range/max' },
                            },
                        },
                    },
                },
                data: {
                    valid: (): unknown[] => [
                        {
                            range: { min: 6, max: 12 },
                            username: 'SuperUser',
                        },
                        {
                            range: { min: 3, max: 3 },
                            username: 'Max',
                        },
                    ],
                    invalid: (): unknown[] => [
                        {
                            range: { min: 5, max: 4 },
                            username: '12345',
                        },
                        {
                            range: { min: 5, max: 7 },
                            username: 'SuperUser',
                        },
                        {
                            range: { min: 10, max: 5 },
                            username: '12345',
                        },
                    ],
                },
                options: {},
            },
            {
                schema: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        username: {
                            [TYPE]: TYPE_STRING,
                            [LEN]: {
                                min: { [PROP_DATA_PATH]: 'range/min' },
                                max: { [PROP_DATA_PATH]: 'range/max' },
                            },
                        },
                    },
                },
                data: {
                    valid: (): unknown[] => [
                        {
                            range: { max: 12 },
                            username: 'SuperUser',
                        },
                        {
                            range: { min: 3 },
                            username: 'Max',
                        },
                        {
                            username: 'Max',
                        },
                    ],
                    invalid: (): unknown[] => [
                        {
                            range: { min: 5, max: 4 },
                            username: '12345',
                        },
                        {
                            range: { min: 5, max: 7 },
                            username: 'SuperUser',
                        },
                        {
                            range: { min: 10, max: 5 },
                            username: '12345',
                        },
                    ],
                },
                options: { handleResolvedPaths: PathResolutionStrategy.Skip },
            },
            {
                schema: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        username: {
                            [TYPE]: TYPE_STRING,
                            [LEN]: {
                                min: {
                                    [PROP_DATA_PATH]: 'range/min',
                                    [TYPE]: TYPE_NUMBER,
                                    [VALUE]: {
                                        min: 0,
                                        max: { [PROP_DATA_PATH]: 'range/max' },
                                    },
                                },
                                max: {
                                    [PROP_DATA_PATH]: 'range/max',
                                    [TYPE]: TYPE_NUMBER,
                                    [VALUE]: {
                                        min: { [PROP_DATA_PATH]: 'range/min' },
                                    },
                                },
                            },
                        },
                    },
                },
                data: {
                    valid: (): unknown[] => [
                        {
                            range: { min: 6, max: 12 },
                            username: 'SuperUser',
                        },
                        {
                            range: { min: 3, max: 3 },
                            username: 'Max',
                        },
                    ],
                    invalid: (): unknown[] => [
                        {
                            range: { min: 5, max: 4 },
                            username: '12345',
                        },
                        {
                            range: { min: 5, max: 7 },
                            username: 'SuperUser',
                        },
                        {
                            range: { min: 10, max: 5 },
                            username: '12345',
                        },
                    ],
                },
                options: { handleResolvedPaths: PathResolutionStrategy.Schema },
            },
            {
                schema: {
                    [TYPE]: TYPE_OBJECT,
                    [SYM_SCHEMA_PROPERTIES]: {
                        username: {
                            [TYPE]: TYPE_STRING,
                            [LEN]: {
                                min: {
                                    [PROP_DATA_PATH]: 'range/min',
                                },
                                max: {
                                    [PROP_DATA_PATH]: 'range/max',
                                },
                            },
                        },
                    },
                },
                data: {
                    valid: (): unknown[] => [
                        {
                            range: { min: 6, max: 12 },
                            username: 'SuperUser',
                        },
                        {
                            range: { min: 3, max: 3 },
                            username: 'Max',
                        },
                    ],
                    invalid: (): unknown[] => [
                        {
                            range: { min: 5 },
                            username: '12345',
                        },
                        {
                            range: { max: 7 },
                            username: 'SuperUser',
                        },
                        {
                            username: '12345',
                        },
                        {
                            username: '123123',
                            range: { min: 10, max: 3 },
                        },
                    ],
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
