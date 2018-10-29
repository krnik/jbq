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
    symbol (value: any) {
        return typeof value === 'symbol';
    },
    object (value: any) {
        return value instanceof Object;
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
};
