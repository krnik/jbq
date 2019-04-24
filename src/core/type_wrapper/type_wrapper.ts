import { SYM_METHOD_CLOSURE, SYM_METHOD_MACRO, SYM_TYPE_KEY_ORDER, SYM_TYPE_VALIDATE } from '../../constants';
import { OmitSymbols } from '../../typings';
import { TypeReflect } from '../../utils/type_reflect';
import { TypeDefinition } from './interface/type_definition.interface';
import { TypeMethod, TypeValidationMethod } from './interface/type_method.interface';
import { TypePrototype } from './interface/type_prototype.interface';
import { TypeWrapperErorr } from './type_wrapper.error';

/**
 * Class responsible for storing all TypeDefinitions and supply
 * them to the code generator during schema parsing.
 */
export class TypeWrapper {
    private static Error = TypeWrapperErorr;

    private types: Map<string, TypeDefinition> = new Map();

    /**
     * Returns `true` if type exists.
     */
    public has (this: TypeWrapper, typeName: string): boolean {
        return this.types.has(typeName);
    }

    /**
     * Returns a TypeDefinition if exists.
     * Otherwise returns undefined.
     */
    public get (this: TypeWrapper, typeName: string): TypeDefinition | undefined {
        return this.types.get(typeName);
    }

    /**
     * Add new TypePrototype to the set of TypeDefinitions.
     * TypeDefinition is a name for a valid TypePrototype.
     */
    public set<T extends TypePrototype<T>> (
        this: TypeWrapper,
        typeName: string,
        typePrototype: T,
        extendTypeWith: { type?: string, overwriteKeyOrder?: boolean } = {},
    ): TypeWrapper {
        this.ensureTypeNameIsAvailable(typeName, extendTypeWith.type);
        this.ensureTypePrototypeIsValid(typeName, typePrototype);

        if (!typePrototype.hasOwnProperty(SYM_TYPE_KEY_ORDER))
            typePrototype[SYM_TYPE_KEY_ORDER] = [];

        if (extendTypeWith.type !== undefined) {
            const extendPrototype = this.types.get(extendTypeWith.type)!;

            Object.setPrototypeOf(typePrototype, extendPrototype);
            Object.setPrototypeOf(typePrototype[SYM_TYPE_VALIDATE], extendPrototype[SYM_TYPE_VALIDATE]);

            if (typePrototype.hasOwnProperty(SYM_TYPE_KEY_ORDER) && !extendTypeWith.overwriteKeyOrder)
                typePrototype[SYM_TYPE_KEY_ORDER] = this.mergeTypeKeyOrder(
                    extendPrototype[SYM_TYPE_KEY_ORDER],
                    typePrototype[SYM_TYPE_KEY_ORDER]!,
                );
        }

        this.types.set(typeName, typePrototype as unknown as TypeDefinition);
        return this;
    }

    /**
     * Adds method to the TypeDefinition.
     */
    public addMethod (
        this: TypeWrapper,
        typeName: string,
        methodName: string,
        method: TypeMethod,
        schemaValidationMethod: TypeValidationMethod,
    ): TypeWrapper {
        if (!this.types.has(typeName))
            throw TypeWrapper.Error.missingTypeToAddMethod(typeName, methodName);

        const typeDefinition = this.types.get(typeName)!;
        if (typeDefinition.hasOwnProperty(methodName))
            throw TypeWrapper.Error.typeAddMethodAlreadyExists(typeName, methodName);

        typeDefinition[methodName] = method;
        typeDefinition[SYM_TYPE_VALIDATE][methodName] = schemaValidationMethod;

        return this;
    }

    private ensureTypeNameIsAvailable (
        this: TypeWrapper,
        typeName: string,
        typeToExtendWith?: string,
    ): void {
        if (this.types.has(typeName))
            throw TypeWrapper.Error.typeAlreadyExists(typeName);

        if (typeToExtendWith !== undefined && !this.types.has(typeToExtendWith))
            throw TypeWrapper.Error.typeToExtendWithDoesntExists(typeName, typeToExtendWith);
    }

    private ensureTypePrototypeIsValid<T extends TypePrototype<T>, K extends keyof OmitSymbols<T>> (
        this: TypeWrapper,
        typeName: string,
        typePrototype: T,
    ): void {
        if (typePrototype.hasOwnProperty(SYM_TYPE_KEY_ORDER))
            if (!TypeReflect.arrayOf(typePrototype[SYM_TYPE_KEY_ORDER], TypeReflect.string))
                throw TypeWrapper.Error.invalidProperty(typeName, SYM_TYPE_KEY_ORDER.toString(), 'string[]');

        for (const propertyName of Object.getOwnPropertyNames(typePrototype)) {
            const method = typePrototype[propertyName as keyof T];

            if (method.hasOwnProperty(SYM_METHOD_MACRO) && method.hasOwnProperty(SYM_METHOD_CLOSURE))
                throw TypeWrapper.Error.invalidMethodSymbols(typeName, propertyName);

            if (!TypeReflect.instance(typePrototype[SYM_TYPE_VALIDATE][propertyName as K], Function))
                throw TypeWrapper.Error.missingSchemaValueValidaor(typeName, propertyName);
        }
    }

    private mergeTypeKeyOrder (
        this: TypeWrapper,
        primaryKeys: string[],
        secondaryKeys: string[],
    ): string[] {
        return [...primaryKeys, ...secondaryKeys].reduce(
            (acc, key) => acc.includes(key) ? acc : (acc.push(key), acc),
            [] as string[],
        );
    }
}
