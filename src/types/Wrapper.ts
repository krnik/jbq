import { ITypePrototype, ITypePrototypeParse, ITypePrototypeValidate, SYM_TYPE_PARSE, SYM_TYPE_VALIDATE, TYPE_NAME } from '../constants';
import { E, isType } from '../utils/index';

type key = string | symbol;
export class TypeWrapper {
    private types: Map<key, ITypePrototype> = new Map();

    constructor (root: ITypePrototype) {
        this.types.set(TYPE_NAME.ROOT, root);
    }

    public has (name: string): boolean {
        return this.types.has(name);
    }

    public get (name: key): ITypePrototype | undefined {
        return this.types.get(name);
    }

    public set (name: string, type: ITypePrototype) {
        const ROOT = this.get(TYPE_NAME.ROOT) as ITypePrototype;
        Object.setPrototypeOf(type, ROOT);
        const proto = Object.getPrototypeOf(type);
        type[SYM_TYPE_VALIDATE] = new Proxy(type[SYM_TYPE_VALIDATE], {
            get (target, key: string) {
                if (target.hasOwnProperty(key)) return target[key];
                return proto[SYM_TYPE_VALIDATE][key];
            },
        });
        type[SYM_TYPE_PARSE] = new Proxy(type[SYM_TYPE_PARSE], {
            get (target, key: string) {
                if (target.hasOwnProperty(key)) {
                    const prop = target[key];
                    return isType.objectInstance(prop, 'Function')
                        ? prop.bind(type)
                        : prop;
                }
                return isType.objectInstance(proto[SYM_TYPE_PARSE][key], 'Function')
                    ? proto[SYM_TYPE_PARSE][key].bind(type)
                    : proto[SYM_TYPE_PARSE][key];
            },
        });
        for (const key of Object.keys(type))
            if (!isType.objectInstance(type[SYM_TYPE_VALIDATE][key], 'Function') ||
                !isType.objectInstance(type[SYM_TYPE_PARSE][key], 'Function'))
                E.typeProtoInvalidMethod(name, key, typeof(type[SYM_TYPE_VALIDATE][key]));
        this.types.set(name, type);
        return this;
    }
}
