export type Option<T> = T | undefined;
export type Some<T> = Exclude<T, undefined>;

export type PartialProps<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Partial<Pick<T, K>>;

export type OmitSymbols<T> = Pick<T, { [K in keyof T]: K extends symbol ? never : K }[keyof T]>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;
export type RestParams = Any[];
export type AnyArray = Any[];

export interface Constructor<T = unknown> {
    new (...args: RestParams): T;
}

export type ArrIterCallback<R = unknown, T = unknown> = (elem: T, index: number, arr: T[]) => R;
