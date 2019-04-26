import { expect } from 'chai';
import prettier from 'prettier';

export const SYM_FAKER = Symbol.for('faker');

export function isErrJSON(str: string | undefined): void {
    expect(str).to.be.a('string');
    const obj = JSON.parse(str as string);
    expect(obj)
        .to.be.an('object')
        .that.have.all.keys(['message', 'path']);
}

export function printCode(code: string): void {
    console.log(prettier.format(code));
}
