import { SCHEMA_PATH_SEPARATOR } from '../misc/constants';

interface Logger {
    debug(message: string, ...args: unknown[]): void;
}

let LOGGER: Logger = { debug: (): void => {} };

export class LogService {
    public static setLogger(logger: Logger): void {
        LOGGER = logger;
    }

    private active: boolean = false;
    private indent = 0;

    public constructor(active: boolean) {
        this.active = active;
    }

    public incIndent(this: LogService, v: number): void {
        this.indent += v;
    }

    public schema(this: LogService, schemaName: string): void {
        const name = schemaName.split(SCHEMA_PATH_SEPARATOR).pop();
        if (this.active) this.log(`\x1b[32m${''.padStart(this.indent, ' ')}${name}\x1b[0m`);
    }

    public property(this: LogService, propertyName: string): void {
        if (this.active) this.log(`\x1b[36m${''.padStart(this.indent, ' ')}${propertyName}\x1b[0m`);
    }

    public code(this: LogService, code: string): void {
        if (this.active) this.log(code);
    }

    private log(this: LogService, message: string): void {
        LOGGER.debug(message);
    }
}