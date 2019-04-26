import { DataPath } from '../../typings';

interface ResolvedPathVariable {
    variableName: string;
    schemaValue: DataPath;
}

export class ResolvedPathStore {
    private resolvedVariables: ResolvedPathVariable[];
    private state: boolean;

    public constructor() {
        this.state = false;
        this.resolvedVariables = [];
    }

    public open(this: ResolvedPathStore): void {
        this.state = true;
    }

    public close(this: ResolvedPathStore): void {
        this.resolvedVariables = [];
        this.state = false;
    }

    public add(this: ResolvedPathStore, variableName: string, schemaValue: DataPath): void {
        if (this.state) this.resolvedVariables.push({ variableName, schemaValue });
    }

    public consume(this: ResolvedPathStore): ResolvedPathVariable[] {
        const data = this.resolvedVariables;
        this.close();
        return data;
    }
}
