export type OmitSymbols<T> = Pick<T, { [K in keyof T]: K extends symbol ? never : K }[keyof T]>;
