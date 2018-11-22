import { SYM_TYPE_EXTERNAL, SYM_TYPE_FOR_LOOP, SYM_TYPE_KEY_ORDER, SYM_TYPE_VALIDATE } from '../constants';
import { OmitSymbols } from '../typings';
import { Err, is } from '../utils/main';

type TypeProtoValidationMethod = (...args: any[]) => void;

interface ITypeProtoMethod {
    (...args: any[]): void | string;
    [SYM_TYPE_EXTERNAL]?: boolean;
}

export interface IType {
    [method: string]: ITypeProtoMethod;
    [SYM_TYPE_VALIDATE]: {
        [method: string]: TypeProtoValidationMethod;
    };
    [SYM_TYPE_KEY_ORDER]: string[];
    [SYM_TYPE_FOR_LOOP]?: boolean;
}

interface ITypeInputSymbols<T> {
    [SYM_TYPE_VALIDATE]: {
        [K in keyof T]: TypeProtoValidationMethod;
    };
    [SYM_TYPE_FOR_LOOP]?: boolean;
    [SYM_TYPE_KEY_ORDER]?: string[];
}

interface IExtendTypePrototype {
    type?: string;
    overwriteKeyOrder?: boolean;
}

type TypeInput<T> = OmitSymbols<T> & ITypeInputSymbols<OmitSymbols<T>>;

export class TypeWrapper {
    private types: Map<string, IType> = new Map();

    public has (name: string) {
        return this.types.has(name);
    }

    public set<T extends TypeInput<T>, M extends keyof OmitSymbols<T>> (
        name: string,
        type: T,
        extendWith: IExtendTypePrototype = {},
    ) {
        this.validateName(name, extendWith.type);
        this.validateType(name, type);

        if (extendWith.type) {
            const proto = this.types.get(extendWith.type)!;
            Object.setPrototypeOf(type, proto);
            Object.setPrototypeOf(type[SYM_TYPE_VALIDATE], proto[SYM_TYPE_VALIDATE]);
            if (type.hasOwnProperty(SYM_TYPE_KEY_ORDER) && !extendWith.overwriteKeyOrder)
                type[SYM_TYPE_KEY_ORDER] = this.mergeKeyOrders(
                    proto[SYM_TYPE_KEY_ORDER],
                    type[SYM_TYPE_KEY_ORDER]!,
                );
        }

        for (const key of Object.getOwnPropertyNames(type))
            if (!is.objectInstance(type[SYM_TYPE_VALIDATE][key as M], 'Function'))
                throw Err.wrapper.missingSchemaValueValidaor(name, key);

        this.types.set(name, type as unknown as IType);
        return this;
    }

    public get (name: string) {
        return this.types.get(name);
    }

    private validateName (name: string, protoName?: string) {
        if (!is.string(name))
            throw Err.wrapper.invalidTypeName(typeof name);
        if (this.types.has(name))
            throw Err.wrapper.typeAlreadyDefined(name);
        if (protoName)
            if (!this.types.has(protoName))
                throw Err.wrapper.missingTypeExtend(name, protoName);
    }

    private validateType<T extends TypeInput<T>> (name: string, type: T) {
        if (!is.object(type))
            throw Err.wrapper.typeNotAnObject(name, typeof type);
        if (type.hasOwnProperty(SYM_TYPE_KEY_ORDER)) {
            const value = type[SYM_TYPE_KEY_ORDER];
            if (!Array.isArray(value))
                throw Err.wrapper.invalidProperty(name, SYM_TYPE_KEY_ORDER.toString(), 'array');
            if (value!.some((e) => !is.string(e)))
                throw Err.wrapper.invalidProperty(name, SYM_TYPE_KEY_ORDER.toString(), 'string');
        }
    }

    private mergeKeyOrders (protoKeyOrder: string[], typeKeyOrder: string[]): string[] {
        return [...protoKeyOrder, ...typeKeyOrder].reduce(
            (acc, prop) => (acc.includes(prop) ? acc : (acc.push(prop), acc)),
            [] as string[],
        );
    }
}
