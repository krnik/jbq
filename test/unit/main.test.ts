import { Compilation } from '../../src/core/_Compilation';
import { createTypes } from '../../src/types/main';

// import unitTestCompilation from './Compilation.test';
// import unitTestJbq from './jbq.test';
// import unitTestTypes from './Types/main.test';

export const unitTests = [
    // unitTestCompilation,
    // unitTestTypes,
    // unitTestJbq,
    () => {
        describe('_compilation', () => {
            it('it', () => {
                new Compilation(createTypes(), {
                    type: 'string',
                }, 'Namae', { debug: true }).execSync();
            });
        });
    }
];
