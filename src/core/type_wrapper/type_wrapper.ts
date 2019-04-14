import { SYM_METHOD_CLOSURE, SYM_METHOD_MACRO, SYM_TYPE_FOR_LOOP, SYM_TYPE_KEY_ORDER, SYM_TYPE_VALIDATE } from '../../constants';
import { OmitSymbols } from '../../typings';
import { TypeReflect } from '../../utils/type_reflect';
import { TypeWrapperErorr } from './type_wrapper.error';

/**
 * Interface representing a shape of added to the type map type prototype.
 *
 * `[Symbol.for('type_key_order')]` - determines order in which the type
 * methods are used during creation of validation function. If not defined, the order
 * will depend on ECMASCript implementation.
 *
 * `[Symbol.for('type_validate')]` - must have as many methods as many methods
 * have TypeDefinition object. Methods in this object are used to validate if
 * value from schema can be accepted as an argument in TypeDefinition respective
 * method.
 *
 * # Example
 *
 *     const certainType = jbqTypes.get('any');
 *     // certain type shape
 *     {
 *        type (schemaValue, $DATA) {
 *          // method body used to create final validation function
 *        },
 *        required (schemaValue, $DATA) {
 *          // method body used to create final validation function
 *        },
 *        [Symbol.for('type_validate')]: {
 *            // method responsible for validation schema input
 *            // must throw on incorrect input
 *            type (schemaValue) {},
 *            required (schemaValue) {},
 *        },
 *        [Symbol.for('type_key_order')]: ['required', 'type'],
 *     }
 */
export interface TypeDefinition {
    [method: string]: TypeMethod;
    [SYM_TYPE_VALIDATE]: {
        [method: string]: TypePrototypeValidationMethod;
    };
    [SYM_TYPE_KEY_ORDER]: string[];
    [SYM_TYPE_FOR_LOOP]?: boolean;
}

/**
 * Interface representing a function that is a TypeDefinition validation method.
 * This function is used to build final validation function.
 *
 * Usually, during building of validation function, TypeMethod function is stringified
 * and its body is used to build a validation block in validation function.
 *
 * There are two exceptions. Symbols defined below determine behavior of code generator
 * when parsing TypeMethod with respective property.
 *
 * `[Symbol.for('type_method_closure')]` - If TypeMethod function have this property
 * set to true then code generator will use a reference to this function in validation
 * function instead of extracting its body. This allows to use external variables during
 * validation what would not be possible in some cases  if the function body
 * would be stringified.
 *
 * `[Symbol.for('type_method_macro')]` - Type of TypeMethod function that will return
 * a chunk of validation function. So instead of being parsed this function is simply
 * invoked with some Code Generator helper functions passed as arguments.
 * See [VALUE](https://github.com/krnik/jbq/blob/master/src/types/Number.ts) method example.
 */
export interface TypeMethod {
    (...args: any[]): string | undefined | void;
    [SYM_METHOD_CLOSURE]?: boolean;
    [SYM_METHOD_MACRO]?: boolean;
}

/**
 * Alias to any function that is used to validate schema input.
 */
type TypePrototypeValidationMethod = (v: any) => void;

/**
 * Type that represents all regular methods of TypePrototype that are used
 * during creation of validation function.
 */
type TypePrototypeMethods<T> = {
    [K in keyof T]: TypeMethod;
};

/**
 * Type that represents all symbol properties of TypePrototype.
 *
 *     Symbol.for('type_validate')
 *     Symbol.for('type_key_order')
 *     Symbol.for('type_for_loop')
 */
interface TypePrototypeSymbols<T> {
    [SYM_TYPE_VALIDATE]: {
        [K in keyof T]: TypePrototypeValidationMethod;
    };
    [SYM_TYPE_FOR_LOOP]?: boolean;
    [SYM_TYPE_KEY_ORDER]?: string[];
}

type TypePrototype<T> = TypePrototypeMethods<OmitSymbols<T>> & TypePrototypeSymbols<OmitSymbols<T>>;

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
        schemaValidationMethod: TypePrototypeValidationMethod,
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

            if (!TypeReflect.objectInstance(typePrototype[SYM_TYPE_VALIDATE][propertyName as K], Function))
                throw TypeWrapper.Error.missingSchemaValueValidaor(typeName, propertyName);
        }
    }

    private mergeTypeKeyOrder (primaryKeys: string[], secondaryKeys: string[]): string[] {
        return [...primaryKeys, ...secondaryKeys].reduce(
            (acc, key) => acc.includes(key) ? acc : (acc.push(key), acc),
            [] as string[],
        );
    }
}
