export function Validator(_constructor: Function): void {
    console.log('> Validator');
    // Compile schema
    // Overwrite constructor so it
    _constructor.prototype.constructor = (_data: unknown): void => {
        // test data
        // throw on error
        // return class on OK
    };
}
