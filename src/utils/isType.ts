export const isType = {
    boolean (value: any) {
        return typeof(value) === 'boolean' && value !== Object(value);
    },
    number (value: any) {
        return typeof(value) === 'number' && value !== Object(value) && value === value;
    },
    objectInstance (value: any, constructorName: string) {
        return value == null ? value : Object.getPrototypeOf(value).constructor.name === constructorName;
    },
};
