export const isType = {
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
};
