export class PrintToken {
    public static typePrototype(typeName: string): string {
        return `<${typeName}>`;
    }

    public static property(propertyName: string): string {
        return `[${propertyName}]`;
    }

    public static type(typeName: string): string {
        return `"${typeName}"`;
    }
}
