import { DataPath } from './compilation_typings';

interface ResolvedPathVariable {
    variableName: string;
    schemaValue: DataPath;
}

/**
 * Stores collection of variables resolved from `$dataPath`.
 * Instance of this class is shared between `Compilation` and `SourceBuilder`
 * instances.
 */
export class ResolvedPathStore {
    private resolvedVariables: ResolvedPathVariable[];
    private isOpen: boolean;

    public constructor() {
        this.isOpen = false;
        this.resolvedVariables = [];
    }

    public open(this: ResolvedPathStore): void {
        this.isOpen = true;
    }

    public close(this: ResolvedPathStore): void {
        this.resolvedVariables = [];
        this.isOpen = false;
    }

    public add(this: ResolvedPathStore, variableName: string, schemaValue: DataPath): void {
        if (this.isOpen) this.resolvedVariables.push({ variableName, schemaValue });
    }

    public consume(this: ResolvedPathStore): ResolvedPathVariable[] {
        const data = this.resolvedVariables;
        this.close();
        return data;
    }
}
