import { Schema } from '../core/compilation/compilation_typings';
import { SYM_PROPERTIES } from '../lib';
import { TYPE, TYPE_OBJECT } from '../misc/constants';
import { Constructor, Some } from '../misc/typings';
import { PropertyMetadata } from './property_metadata';

const SYM_BUILDER = Symbol('validator_builder');

type ClassWithBuilder = Constructor & {
    [SYM_BUILDER]: ValidatorBuilder;
};

interface ClassMetadata {
    frozen: boolean;
    schema: Schema;
}

export class ValidatorBuilder {
    /**
     * Appends ValidatorBuilder instance to the constructor if does not exists.
     * Returns ValidatorBuilder instance assigned to the provided class.
     */
    public static extract(ctr: Function): ValidatorBuilder {
        if (!ctr.hasOwnProperty(SYM_BUILDER)) {
            Object.defineProperty(ctr, SYM_BUILDER, {
                value: new ValidatorBuilder(),
            });
        }
        return (ctr as ClassWithBuilder)[SYM_BUILDER];
    }

    private metadata: ClassMetadata;
    private propertiesMetadata: Map<string | symbol, PropertyMetadata> = new Map();

    public constructor() {
        this.metadata = {
            frozen: false,
            // wasCompiled: false,
            schema: {
                [TYPE]: TYPE_OBJECT,
            },
        };
    }

    public getPropertyMetadata(property: string | symbol): PropertyMetadata {
        if (!this.propertiesMetadata.has(property)) {
            if (this.metadata.frozen) throw new Error();
            this.propertiesMetadata.set(property, new PropertyMetadata());
        }

        return this.propertiesMetadata.get(property) as PropertyMetadata;
    }

    public getMeta(): [ClassMetadata, Map<string | symbol, PropertyMetadata>] {
        return [this.metadata, this.propertiesMetadata];
    }

    public addKeyword(keyword: string, value: unknown): this {
        if (this.metadata.schema[keyword] !== undefined) {
            // Warn
        }
        this.metadata.schema[keyword] = value;
        return this;
    }

    public buildSchema(): this {
        if (this.metadata.frozen) return this;

        const schema = this.metadata.schema;
        for (const [propertyName, propMeta] of this.propertiesMetadata.entries()) {
            if (propMeta.Constructor) {
                ValidatorBuilder.extract(propMeta.Constructor).buildSchema();
            }

            /**
             * Assign `PropertyMetadata.schema` to `propSchema = schema[SYM_PROPERTIES][propertyName]`
             */
            const propertyPath = (propMeta.dataPropertyPath || propertyName) as string;

            if (propMeta.Constructor !== undefined && !propMeta.isConstructorForItems) {
                continue;
            }

            if (schema[SYM_PROPERTIES] === undefined) {
                schema[SYM_PROPERTIES] = {};
            }

            const symProperties = schema[SYM_PROPERTIES] as Some<Schema[typeof SYM_PROPERTIES]>;
            symProperties[propertyPath] = propMeta.schema;
        }

        this.freeze();
        return this;
    }

    private freeze(): void {
        this.metadata.frozen = true;

        Object.freeze(this);
        Object.freeze(this.metadata);
        for (const propMeta of this.propertiesMetadata.values()) Object.freeze(propMeta);
    }
}
