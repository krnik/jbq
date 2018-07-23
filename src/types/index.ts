import { TYPE } from '../constants';
import TypeArray from './Array';
import TypeBoolean from './Boolean';
import TypeNumber from './Number';
import TypeObject from './Object';
import TypeRoot from './Root';
import TypeString from './String';
import Wrapper from './Wrapper';

export interface IParsedProp {
    base: any;
    check: (...args: any[]) => boolean;
}

export type TypeMethod = (...args: any[]) => void | boolean | IParsedProp;

export interface IType {
    [methodName: string]: IType | TypeMethod;
}

export function types () {
    return new Wrapper(TypeRoot)
        .set(TYPE.STRING, TypeString)
        .set(TYPE.BOOLEAN, TypeBoolean)
        .set(TYPE.NUMBER, TypeNumber)
        .set(TYPE.OBJECT, TypeObject)
        .set(TYPE.ARRAY, TypeArray);
};
