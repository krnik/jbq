import { SYM_METHOD_CLOSURE, SYM_METHOD_MACRO, SYM_TYPE_FOR_LOOP, SYM_TYPE_KEY_ORDER, SYM_TYPE_VALIDATE } from '../constants';
import { OmitSymbols } from '../typings';
import { is } from '../utils/type';
import { WrapperError } from './error';

type TypeProtoValidationMethod = (v: any) => void;

export interface ITypeMethod {
    (...args: any[]): string | undefined | void;
    [SYM_METHOD_CLOSURE]?: boolean;
    [SYM_METHOD_MACRO]?: boolean;
}

export interface IType {
    [method: string]: ITypeMethod;
    [SYM_TYPE_VALIDATE]: {
        [method: string]: TypeProtoValidationMethod;
    };
    [SYM_TYPE_KEY_ORDER]: string[];
    [SYM_TYPE_FOR_LOOP]?: boolean;
}

type TypeInputMethods<T> = {
    [K in keyof T]: ITypeMethod;
};

interface ITypeInputSymbols<T> {
    [SYM_TYPE_VALIDATE]: {
        [K in keyof T]: TypeProtoValidationMethod;
    };
    [SYM_TYPE_FOR_LOOP]?: boolean;
    [SYM_TYPE_KEY_ORDER]?: string[];
}

type TypeInput<T> = TypeInputMethods<OmitSymbols<T>> & ITypeInputSymbols<OmitSymbols<T>>;

interface IExtendTypePrototype {
    type?: string;
    overwriteKeyOrder?: boolean;
}

export class TypeWrapper {
    private types: Map<string, IType> = new Map();

    public has (name: string) {
        return this.types.has(name);
    }

    public set<T extends TypeInput<T>, M extends keyof OmitSymbols<T>> (
        this: TypeWrapper,
        name: string,
        type: T,
        extendWith: IExtendTypePrototype = {},
    ) {
        this.validateName(name, extendWith.type);
        this.validateType(name, type);

        for (const key of Object.getOwnPropertyNames(type)) {
            this.validateMethod(name, key, type[key as keyof typeof type]);
            if (!is.objectInstance(type[SYM_TYPE_VALIDATE][key as M], 'Function'))
                throw WrapperError.missingSchemaValueValidaor(name, key);
        }

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

        this.types.set(name, type as unknown as IType);
        return this;
    }

    public get (name: string) {
        return this.types.get(name);
    }

    public addMethod (
        this: TypeWrapper,
        typeName: string,
        methodName: string,
        method: ITypeMethod,
        schemaValidationMethod: TypeProtoValidationMethod,
    ) {
        if (!this.has(typeName))
            throw WrapperError.missingTypeToAddMethod(typeName, methodName);
        const type = this.get(typeName)!;
        if (type.hasOwnProperty(methodName))
            throw WrapperError.typeAddMethodExists(typeName, methodName);
        if (!is.objectInstance(method, 'Function'))
            throw WrapperError.invalidMethodType(typeName, methodName, typeof method);
        if (!is.objectInstance(schemaValidationMethod, 'Function'))
            throw WrapperError.invalidMethodType(
                typeName,
                `[${SYM_TYPE_VALIDATE.toString()}]['${methodName}']`,
                typeof schemaValidationMethod,
            );
        Object.defineProperty(type, methodName, { value: method });
        Object.defineProperty(type[SYM_TYPE_VALIDATE], methodName, { value: schemaValidationMethod });
        return this;
    }

    private validateMethod (typeName: string, methodName: string, method: ITypeMethod) {
        if (method.hasOwnProperty(SYM_METHOD_CLOSURE)
            && method.hasOwnProperty(SYM_METHOD_MACRO))
            throw WrapperError.invalidMethodSymbols(typeName, methodName);
    }

    private validateName (name: string, protoName?: string) {
        if (!is.string(name))
            throw WrapperError.invalidTypeName(typeof name);
        if (this.types.has(name))
            throw WrapperError.typeAlreadyDefined(name);
        if (protoName)
            if (!this.types.has(protoName))
                throw WrapperError.missingTypeExtend(name, protoName);
    }

    private validateType<T extends TypeInput<T>> (name: string, type: T) {
        if (!is.object(type))
            throw WrapperError.typeNotAnObject(name, typeof type);
        if (type.hasOwnProperty(SYM_TYPE_KEY_ORDER)) {
            const value = type[SYM_TYPE_KEY_ORDER];
            if (!Array.isArray(value))
                throw WrapperError.invalidProperty(name, SYM_TYPE_KEY_ORDER.toString(), 'array');
            if (value!.some((e) => !is.string(e)))
                throw WrapperError.invalidProperty(name, SYM_TYPE_KEY_ORDER.toString(), 'string');
        }
    }

    private mergeKeyOrders (protoKeyOrder: string[], typeKeyOrder: string[]): string[] {
        return [...protoKeyOrder, ...typeKeyOrder].reduce(
            (acc, prop) => (acc.includes(prop) ? acc : (acc.push(prop), acc)),
            [] as string[],
        );
    }
}
