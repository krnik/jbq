export class Print {
    public static typeDef(typeName: string): string {
        return `<${typeName}>`;
    }

    public static property(propertyName: string): string {
        return `[${propertyName}]`;
    }

    public static type(typeName: string): string {
        return `"${typeName}"`;
    }

    public static array(arr: string[]): string {
        return `[${arr.join(', ')}]`;
    }
}
