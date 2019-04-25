import { SCHEMA_PATH_SEPARATOR } from '../constants';

interface Logger {
    debug (message: string, ...args: any[]): void;
}

let LOGGER: Logger = { debug: () => { } };

export class LogService {
    public static setLogger (logger: Logger) {
        LOGGER = logger;
    }

    private active: boolean = false;
    private indent = 0;

    constructor (active: boolean) {
        this.active = active;
    }

    public incIndent (v: number) {
        this.indent += v;
    }

    public schema (schemaName: string) {
        const name = schemaName.split(SCHEMA_PATH_SEPARATOR).pop();
        if (this.active)
            this.log(`\x1b[32m${''.padStart(this.indent, ' ')}${name}\x1b[0m`);
    }

    public property (propertyName: string) {
        if (this.active)
            this.log(`\x1b[36m${''.padStart(this.indent, ' ')}${propertyName}\x1b[0m`);
    }

    public code (code: string) {
        if (this.active)
            this.log(code);
    }

    private log (message: string) {
        LOGGER.debug(message);
    }
}
