export const is = {
    boolean (value: any) {
        return value === true || value === false;
    },
    number (value: any) {
        return typeof value  === 'number' && value === value;
    },
    string (value: any) {
        return typeof value === 'string';
    },
    objectInstance (value: any, constructorName: string) {
        return value == null ? value : Object.getPrototypeOf(value).constructor.name === constructorName;
    },
    primitiveLiteral (value: any) {
        if (value == null) return true;
        switch (typeof value) {
            case 'string':
            case 'number':
            case 'boolean':
                return true;
            default:
                return false;
        }
    },
    toLiteral (value: any) {
        if (typeof value === 'string')
            return `'${value.replace('\'', '\\\'')}'`;
        return value;
    },
};
