import { SYM_TYPE_EXTERNAL, SYM_TYPE_NAME, SYM_TYPE_VALIDATE } from '../constants';
import { E, isType } from '../utils/index';

type TypeProtoValidationMethod = (...args: any[]) => void;
type TypeProtoMethod = (...args: any[]) => void;
interface ITypeProtoValidation {
    [method: string]: TypeProtoValidationMethod;
}
export interface ITypeProto {
    [SYM_TYPE_EXTERNAL]?: string[];
    [SYM_TYPE_VALIDATE]: ITypeProtoValidation;
    [method: string]: TypeProtoMethod;
}
export interface IType extends ITypeProto {
    [SYM_TYPE_NAME]: string;
}

export class TypeWrapper {
    private types: Map<string, IType> = new Map();

    public has (name: string) {
        return this.types.has(name);
    }

    public set (name: string, type: ITypeProto, protoName?: string) {
        if (!isType.string(name)) E.invalidArgument('name', 'string', typeof name);
        if (this.types.has(name)) E.typeAlreadyDefined(name);
        if (!Object.keys(type).length) E.invalidTypeProto(name);
        if (type[SYM_TYPE_EXTERNAL] && !Array.isArray(type[SYM_TYPE_EXTERNAL]))
            E.invalidTypeProp(name, SYM_TYPE_EXTERNAL.toString(), 'array');
        if (protoName) {
            if (!this.types.has(protoName)) E.missingType(name, protoName);
            const proto = this.types.get(protoName)!;
            Object.setPrototypeOf(type, proto);
            Object.setPrototypeOf(type[SYM_TYPE_VALIDATE], proto[SYM_TYPE_VALIDATE]);
        }
        for (const key of Object.keys(type))
            if (!isType.objectInstance(type[SYM_TYPE_VALIDATE][key], 'Function'))
                E.missingTypeValidationMethod(name, key);
        (type as IType)[SYM_TYPE_NAME] = name;
        this.types.set(name, type as IType);
        return this;
    }

    public get (name: string) {
        return this.types.get(name);
    }
}
