import { walkDir } from './common';
import { resolve, basename } from 'path';

walkDir(
    resolve(__dirname, '../examples'),
    (filePath: string): void => {
        if (!/(\.ts|.js)$/.test(filePath)) {
            return;
        }

        try {
            console.log(`Running: ${basename(filePath)}`);
            require(filePath);
        } catch (error) {
            console.error(`Example error: ${filePath}.`);
            throw error;
        }
    },
);
