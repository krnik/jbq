import { TYPE, TYPE_METHOD } from '../constants';
import { E, isType } from '../utils/index';
import { IType, TypeMethod } from './index';
const { VALIDATE, PARSE } = TYPE_METHOD;

export default class Types {
    private types: Map<string, IType> = new Map();

    constructor (root: IType) {
        this.types.set(TYPE.ROOT, root);
    }

    public has (name: string): boolean {
        return this.types.has(name);
    }

    public get (name: string): IType | undefined {
        return this.types.get(name);
    }

    public set (name: string, type: IType) {
        const ROOT = this.get(TYPE.ROOT) as IType;
        Object.setPrototypeOf(type, ROOT);
        const proto = Object.getPrototypeOf(type);
        type[VALIDATE] = new Proxy(type[VALIDATE], {
            get (target: IType, key: string) {
                if (key in target) return target[key];
                return proto[VALIDATE][key];
            },
        });
        type[PARSE] = new Proxy(type[PARSE], {
            get (target: IType, key: string) {
                if (key in target && target[key]) {
                    const prop = target[key];
                    return isType.objectInstance(target[key], 'Function') ? (prop as TypeMethod).bind(type) : prop;
                }
                return isType.objectInstance(proto[PARSE][key], 'Function')
                    ? (proto[PARSE][key] as TypeMethod).bind(type)
                    : proto[PARSE][key];
            },
        });
        for (const key of Object.keys(type))
            if (!isType.objectInstance((type[VALIDATE] as IType)[key], 'Function') ||
                !isType.objectInstance((type[PARSE] as IType)[key], 'Function'))
                E.typeProtoInvalidMethod(name, key, typeof((type[VALIDATE] as IType)[key]));
        this.types.set(name, type);
        return this;
    }
}
