import { Schema } from '../core/compilation/compilation_typings';
import { Any, Option } from '../misc/typings';

type DefaultCallback<D, R> = (data: D) => R;
type TransformCallback<P, D, R> = (propertyValue: P, data: D) => R;

export class PropertyMetadata {
    public frozen = false;
    public schema: Schema = {};
    public defaultFn: Option<DefaultCallback<Any, Any>>;
    public transformFn: Option<TransformCallback<Any, Any, Any>>;
    public Constructor: Option<Function>;
    public dataPropertyPath: Option<string>;
    public isConstructorForItems: boolean = false;

    public setValue<K extends keyof this>(property: K, value: this[K]): this {
        if (this[property] !== undefined) {
            // Warn
        }
        this[property] = value;
        return this;
    }

    public addKeyword(keyword: string, value: unknown): this {
        if (this.schema.hasOwnProperty(keyword)) {
            // Warn
        }
        this.schema[keyword] = value;
        return this;
    }

    public freeze(): this {
        this.frozen = true;
        Object.freeze(this.schema);
        Object.freeze(this);
        return this;
    }
}
