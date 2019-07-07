import { expect } from 'chai';
import prettier from 'prettier';

export const SYM_FAKER = Symbol.for('faker');

export function isValidationError(err: unknown): void {
    expect(err)
        .to.be.an('object')
        .that.have.all.keys(['message', 'path']);
}

export function printCode(code: string): void {
    console.log(prettier.format(code));
}

export function catchError(fn: Function): Error {
    expect(fn).to.throw();
    try {
        fn();
        throw new Error('Function passed to "catchError" function must throw.');
    } catch (error) {
        expect(error).to.be.instanceOf(Error);
        return error;
    }
}
