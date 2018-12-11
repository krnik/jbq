export class DebugLog {
    private active: boolean = false;

    constructor (active: boolean) {
        this.active = active;
    }

    public schema (schemaName: string, indent: number = 0) {
        if (this.active)
            this.log(`\x1b[32m${''.padStart(indent, ' ')}${schemaName}\x1b[0m`);
    }

    public property (propertyName: string, indent: number = 0) {
        if (this.active)
            this.log(`\x1b[36m${''.padStart(indent, ' ')}${propertyName}\x1b[0m`);
    }

    public code (code: string) {
        if (this.active)
            this.log(code);
    }

    private log (message: string) {
        // tslint:disable-next-line: no-console
        console.log(message);
    }
}
