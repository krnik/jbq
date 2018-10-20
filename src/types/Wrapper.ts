import { SYM_TYPE_EXTERNAL, SYM_TYPE_FOR_LOOP, SYM_TYPE_KEY_ORDER, SYM_TYPE_VALIDATE } from '../constants';
import { E, is } from '../utils/index';

type TypeProtoValidationMethod = (...args: any[]) => void;
type TypeProtoMethod = (...args: any[]) => void;
interface ITypeProtoValidation {
    [method: string]: TypeProtoValidationMethod;
}
export interface IType {
    [SYM_TYPE_EXTERNAL]?: string[];
    [SYM_TYPE_FOR_LOOP]?: boolean;
    [SYM_TYPE_VALIDATE]: ITypeProtoValidation;
    [SYM_TYPE_KEY_ORDER]?: string[];
    [method: string]: TypeProtoMethod;
}

export class TypeWrapper {
    private types: Map<string, IType> = new Map();

    public has (name: string) {
        return this.types.has(name);
    }

    public set (name: string, type: IType, protoName?: string) {
        this.validateName(name, protoName);
        this.validateType(name, type);

        if (protoName) {
            const proto = this.types.get(protoName)!;
            Object.setPrototypeOf(type, proto);
            Object.setPrototypeOf(type[SYM_TYPE_VALIDATE], proto[SYM_TYPE_VALIDATE]);
        }

        for (const key of Object.getOwnPropertyNames(type))
            if (!is.objectInstance(type[SYM_TYPE_VALIDATE][key], 'Function'))
                throw E.wrapper.missingSchemaValueValidaor(name, key);

        this.types.set(name, type as IType);
        return this;
    }

    public get (name: string) {
        return this.types.get(name);
    }

    private validateName (name: string, protoName?: string) {
        if (!is.string(name))
            throw E.wrapper.invalidTypeName(typeof name);
        if (this.types.has(name))
            throw E.wrapper.typeAlreadyDefined(name);
        if (protoName)
            if (!this.types.has(protoName))
                throw E.wrapper.missingTypeExtend(name, protoName);
    }

    private validateType (name: string, type: IType) {
        if (!is.object(type))
            throw E.wrapper.typeNotAnObject(name, typeof type);
        type Sym = typeof SYM_TYPE_EXTERNAL | typeof SYM_TYPE_KEY_ORDER;
        for (const key of [SYM_TYPE_EXTERNAL, SYM_TYPE_KEY_ORDER])
            if (type.hasOwnProperty(key)) {
                const value = type[key as Sym];
                if (!Array.isArray(value))
                    throw E.wrapper.invalidProperty(name, key.toString(), 'array');
                if (value!.some((e) => !is.string(e)))
                    throw E.wrapper.invalidProperty(name, key.toString(), 'string');
            }
    }
}
