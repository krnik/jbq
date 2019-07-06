import { Option, PartialProps } from '../../misc/typings';
import { TypeInstanceError } from './type_instance/type_instance_error';
import {
    KeywordDescriptor,
    KeywordValidationFunctionKind,
} from './type_instance/type_instance_typings';

type Methods<T> = Exclude<T, undefined>;

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

    public derive<Derived extends string>(
        this: TypeInstance<N, M, undefined>,
        proto: TypeInstance<Derived, Option<string>, Option<string>>,
    ): TypeInstance<N, M, Derived> {
        this.deriveType = proto;
        return (this as unknown) as TypeInstance<N, M, Derived>;
    }

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

    public getKeyword(keyword: string): KeywordDescriptor {
        const descriptor = this.methods.get(keyword);

        if (descriptor === undefined) {
            const derivedKeyword = this.deriveType
                ? this.deriveType.getKeyword(keyword)
                : undefined;

            if (derivedKeyword !== undefined) return derivedKeyword;
            throw TypeInstanceError.keywordNotFound(keyword, this.name);
        }

        return descriptor;
    }

    public hasKeyword(keyword: string): boolean {
        return this.methods.has(keyword)
            ? true
            : this.deriveType
            ? this.deriveType.hasKeyword(keyword)
            : false;
    }

    public getKeywords(): string[] {
        const derivedKeywords = this.deriveType ? this.deriveType.getKeywords() : [];
        const deduped = new Set([...this.methods.keys(), ...derivedKeywords]);
        return Array.from(deduped);
    }

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

    public getKeywordOrder(): Option<string[]> {
        return this.keywordOrder || (this.deriveType && this.deriveType.getKeywordOrder());
    }

    public setUseForOfLoop(useForOfLoop: boolean): this {
        this.useForOfLoop = useForOfLoop;
        return this;
    }

    public getUseForOfLoop(): boolean {
        return this.useForOfLoop;
    }
}
