import { IDataPathSchemaValue } from '../typings';

interface IResolvedVar {
    resolvedVar: string;
    schemaValue: IDataPathSchemaValue;
}

export class ResolvedStore {
    private resolvedVars: IResolvedVar[] = [];
    private acceptResolvedVars: boolean = false;

    public openVars () {
        this.acceptResolvedVars = true;
    }

    public addVar (resolvedVar: string, schemaValue: IDataPathSchemaValue) {
        if (this.acceptResolvedVars)
            this.resolvedVars.push({ resolvedVar, schemaValue });
    }

    public consumeVars () {
        const names = this.resolvedVars.slice();
        this.purgeVars();
        return names;
    }

    private purgeVars () {
        this.resolvedVars = [];
        this.acceptResolvedVars = false;
    }
}
