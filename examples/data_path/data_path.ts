import { jbq, types } from '../../src/lib';
import { equal } from 'assert';

const settings = {
    globals: {
        requestRateLimit: 100,
    },
    premiumRequestRateLimit: 100,
    regularRequestRateLimit: 80,
};

const getOverallLimit = {
    // During validation this path will resolve
    // to settings.globals.requestRateLimit
    $dataPath: 'globals/requestRateLimit',
};

const getPremiumLimit = {
    // During validation this path will resolve
    // to settings.premiumRequestRateLimit
    $dataPath: 'premiumRequestRateLimit',
};

const schema = {
    type: 'object',
    [Symbol.for('schema_properties')]: {
        globals: {
            type: 'object',
            properties: ['requestRateLimit'],
            [Symbol.for('schema_properties')]: {
                requestRateLimit: {
                    type: 'number',
                    value: { min: 0 },
                    multipleOf: 1,
                },
            },
        },
        premiumRequestRateLimit: {
            type: 'number',
            multipleOf: 1,
            value: { min: 0, max: getOverallLimit },
        },
        regularRequestRateLimit: {
            type: 'number',
            multipleOf: 1,
            value: { min: 0, max: getPremiumLimit },
        },
    },
};

const { Settings } = jbq(types, { Settings: schema });

equal(Settings(settings), undefined);
equal(
    Settings({
        globals: { requestRateLimit: 100 },
        premiumRequestRateLimit: 80,
        regularRequestRateLimit: 40,
    }),
    undefined,
);

// Regular rate limit cannot be greater than premium rate limit.
equal(
    typeof Settings({
        globals: { requestRateLimit: 100 },
        premiumRequestRateLimit: 60,
        regularRequestRateLimit: 70,
    }),
    'object',
);
