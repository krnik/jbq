import { expect } from 'chai';
import prettier from 'prettier';

export const SYM_FAKER = Symbol.for('faker');

export function isErrJSON (str: any) {
    expect(str).to.be.a('string');
    const obj = JSON.parse(str);
    expect(obj).to.be.an('object').that.have.all.keys(['message', 'path']);
}

export function printCode (code: string) {
    console.log(prettier.format(code));
}
