import { jbq, jbqTypes } from '../../src/main';

function example () {
    const PROPS = Symbol.for('schema_properties');
    const schemas = {
        Menu: {
            type: 'object',
            [PROPS]: {
                colors: {
                    type: 'array',
                    includes: {
                        $dataPath: 'mainColor',
                    },
                },
            },
        },
    };
    const validator = jbq(jbqTypes, schemas);
    const dataValid = {
        colors: ['red', 'green', 'blue'],
        mailColor: 'red',
    };
    validator.Menu(dataValid);
    // -> undefined

    const dataInvalid = {
        colors: ['yellow', 'blue'],
        mainColor: 'red',
    };
    validator.Menu(dataInvalid);
    // -> error message
}
