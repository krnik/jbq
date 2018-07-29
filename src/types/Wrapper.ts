import { SYM_TYPE_VALIDATE, TYPE_NAME } from '../constants';
import { E, isType } from '../utils/index';


type TypePrototypeValidateMethod = (...args: any[]) => void;
type TypePrototypeMethod = (...args: any[]) => void;
interface ITypePrototypeValidate {
    [method: string]: TypePrototypeValidateMethod;
}
export interface ITypePrototype {
    [SYM_TYPE_VALIDATE]: ITypePrototypeValidate;
    [method: string]: TypePrototypeMethod;
}
type key = string | symbol;

export class TypeWrapper {
    private types: Map<key, ITypePrototype> = new Map();

    constructor (root: ITypePrototype) {
        this.types.set(TYPE_NAME.ROOT, root);
    }

    public has (name: string) {
        return this.types.has(name);
    }

    public set (name: string, type: ITypePrototype) {
        if (!isType.string(name)) E.param('name', 'string primitive', typeof(name));
        const ROOT = this.get(TYPE_NAME.ROOT) as ITypePrototype;
        Object.setPrototypeOf(type, ROOT);
        const proto = Object.getPrototypeOf(type);
        type[SYM_TYPE_VALIDATE] = new Proxy(type[SYM_TYPE_VALIDATE], {
            get (target, key: string) {
                if (target.hasOwnProperty(key)) return target[key];
                return proto[SYM_TYPE_VALIDATE][key];
            },
        });
        for (const key of Object.keys(type))
            if (!isType.objectInstance(type[SYM_TYPE_VALIDATE][key], 'Function'))
                E.typeProtoInvalidMethod(name, key, typeof(type[SYM_TYPE_VALIDATE][key]));
        this.types.set(name, type);
        return this;
    }

    public get (name: key) {
        return this.types.get(name);
    }
}
