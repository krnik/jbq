import { SYM_TYPE_USES_EXTERNALS, SYM_TYPE_VALIDATE } from '../constants';
import { E, isType } from '../utils/index';

type TypePrototypeValidateMethod = (...args: any[]) => void;
type TypePrototypeMethod = (...args: any[]) => void;
interface ITypePrototypeValidate {
    [method: string]: TypePrototypeValidateMethod;
}
export interface ITypePrototype {
    [SYM_TYPE_USES_EXTERNALS]?: boolean;
    [SYM_TYPE_VALIDATE]: ITypePrototypeValidate;
    [method: string]: TypePrototypeMethod;
}
type mapKey = string | symbol;

export class TypeWrapper {
    private types: Map<mapKey, ITypePrototype> = new Map();

    public has (name: string) {
        return this.types.has(name);
    }

    public set (name: string, type: ITypePrototype) {
        if (!isType.string(name)) E.param('name', 'string primitive', typeof(name));
        for (const key of Object.keys(type))
            if (!isType.objectInstance(type[SYM_TYPE_VALIDATE][key], 'Function'))
                E.typeProtoInvalidMethod(name, key, typeof(type[SYM_TYPE_VALIDATE][key]));
        this.types.set(name, type);
        return this;
    }

    public get (name: mapKey) {
        return this.types.get(name);
    }
}
