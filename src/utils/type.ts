export const is = {
    boolean (value: any) {
        return value === true || value === false;
    },
    number (value: any) {
        return typeof value === 'number' && value === value;
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
        return value == null
            ? value
            : Object.getPrototypeOf(value).constructor.name === constructorName;
    },
    array (value: any, canBeEmpty?: boolean) {
        return Array.isArray(value) && (canBeEmpty || value.length);
    },
    arrayOf (value: any, check: (...a: any[]) => boolean, canBeEmpty?: boolean) {
        return Array.isArray(value) && value.every(check) && Boolean(canBeEmpty || value.length);
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

export const as = {
    string (str: string) {
        return `\`${str.replace(/`/g, '\\`')}\``;
    },
};
