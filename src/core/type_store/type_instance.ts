import { Option, PartialProps, Some } from '../../misc/typings';
import { TypeInstanceError } from './type_instance/type_instance_error';
import {
    KeywordDescriptor,
    KeywordValidationFunctionKind,
} from './type_instance/type_instance_typings';

type Methods<T> = Some<T>;

/**
 * `TypeInstance<N, M, D>`. Generic class over validation type definition.
 *
 * Generic parameters parameters:
 *   - `N`: string - type name
 *   - `M`: Option<string> - union of strings methods
 *   - `D`: Option<string> - name of type to derive from
 *
 * # Examples
 * #example:type_instance_class
 */
export class TypeInstance<
    N extends string,
    M extends Option<string> = undefined,
    D extends Option<string> = undefined
> {
    public name: N;
    private methods: Map<string, KeywordDescriptor> = new Map();
    private deriveType?: TypeInstance<string, Option<string>, Option<string>>;
    private keywordOrder?: string[];
    private useForOfLoop: boolean = true;

    public constructor(name: N) {
        this.name = name;
    }

    /**
     * Sets the derived type of the instance.
     * Derived type acts as a 'backup' when compilator is looking for keywords.
     *
     * For example if `TypeA` derives from `Type0` then if `TypeA` does not have keyword
     * `Key0` defined then `Type0` will be checked in order to find this keyword.
     *
     * # Example
     * #example:type_instance_derive
     */
    public derive<Derived extends string>(
        this: TypeInstance<N, M, undefined>,
        proto: TypeInstance<Derived, Option<string>, Option<string>>,
    ): TypeInstance<N, M, Derived> {
        if (this.deriveType !== undefined) {
            throw TypeInstance.Error.typeAlreadyDerives(
                this.name,
                this.deriveType.name,
                proto.name,
            );
        }

        this.deriveType = proto;
        return (this as unknown) as TypeInstance<N, M, Derived>;
    }

    /**
     * Adds a keyword to the instance.
     */
    public setKeyword<V extends string>(
        this: TypeInstance<N, M, D>,
        methodName: V,
        descriptor: PartialProps<KeywordDescriptor, 'kind' | 'acceptDataPath'>,
    ): TypeInstance<N, Methods<V | M>, D> {
        if (descriptor.kind === undefined) descriptor.kind = KeywordValidationFunctionKind.Function;
        if (descriptor.acceptDataPath === undefined) descriptor.acceptDataPath = false;

        this.methods.set(methodName, descriptor as KeywordDescriptor);
        return this as TypeInstance<N, Methods<V | M>, D>;
    }

    /**
     * Returns `KeywordDescriptor` for `keyword` if exists.
     * Otherwise throws an error.
     */
    public getKeyword(keyword: string): KeywordDescriptor {
        const descriptor = this.methods.get(keyword);

        if (descriptor === undefined) {
            const derivedKeyword = this.deriveType
                ? this.deriveType.getKeyword(keyword)
                : undefined;

            if (derivedKeyword !== undefined) return derivedKeyword;
            throw TypeInstance.Error.keywordNotFound(keyword, this.name);
        }

        return descriptor;
    }

    /**
     * Returns true if instance has `keyword` keyword defined.
     */
    public hasKeyword(keyword: string): boolean {
        return this.methods.has(keyword)
            ? true
            : this.deriveType
            ? this.deriveType.hasKeyword(keyword)
            : false;
    }

    /**
     * Returns list of all keywords instance has access to. Includes also keywords
     * from derived types.
     */
    public getKeywords(): string[] {
        const derivedKeywords = this.deriveType ? this.deriveType.getKeywords() : [];
        const deduped = new Set([...this.methods.keys(), ...derivedKeywords]);
        return Array.from(deduped);
    }

    /**
     * Defines an order in which keywords should be validated during
     * validation function execution.
     *
     * # Example
     * #example:type_instance_set_keyword_order
     */
    public setKeywordOrder(keywords: string[]): this {
        keywords.forEach(
            (keyword): void => {
                if (!this.hasKeyword(keyword)) {
                    throw TypeInstanceError.unrecognizedKeywordInKeywordOrder(
                        keywords,
                        keyword,
                        this.name,
                        this.getKeywords(),
                    );
                }
            },
        );

        this.keywordOrder = keywords;
        return this;
    }

    /**
     * Returns the desired order of keywords.
     */
    public getKeywordOrder(): Option<string[]> {
        return this.keywordOrder || (this.deriveType && this.deriveType.getKeywordOrder());
    }

    /**
     * Boolean flag that defines whether instance types should use `for..of` loop
     * when validating the elements of this type. Default value: `true`.
     *
     * In other words: validator will assume that this type implements `Iterable Protocol`.
     *
     * If this flag is set to true then all elements of this type is `integer` indexable.
     *
     * # Example
     * #example:type_instance_set_use_for_of_loop
     */
    public setUseForOfLoop(useForOfLoop: boolean): this {
        this.useForOfLoop = useForOfLoop;
        return this;
    }

    /**
     * Returns current use `for..of` loop flag value setting.
     */
    public getUseForOfLoop(): boolean {
        return this.useForOfLoop;
    }

    private static Error = TypeInstanceError;
}
