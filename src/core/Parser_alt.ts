import { SYM_SCHEMA_COLLECTION, SYM_SCHEMA_CONFIG, SYM_SCHEMA_PROPERTIES, TYPE } from '../constants';
import { TypeWrapper, IType } from '../types/Wrapper';
import { E } from '../utils/index';

const INDENT = Symbol('parser_indent');

export interface IConfig {
  [TYPE]?: string;
  [INDENT]?: string;
}

export interface ISchema {
  [SYM_SCHEMA_CONFIG]?: IConfig;
  [SYM_SCHEMA_PROPERTIES]?: ISchemas;
  [SYM_SCHEMA_COLLECTION]?: ISchema;
  [property: string]: any;
}

export interface ISchemas {
  [schema: string]: ISchema;
}

interface INames {
  var: string;
  prop: string;
  label: string;
}

type ValidateFn = (data: any) => string | undefined;

type OmitSymbols<T> = Pick<T, { [K in keyof T]: K extends symbol ? never : K }[keyof T]>;

type ParserResult<T> = { [P in keyof OmitSymbols<T>]: ValidateFn };

export const Parser = {
  schemaEntries<T extends ISchema> (schema: T, config: IConfig, indent: string = ' ') {
    const newConfig = {
      ...config,
      ...(schema[SYM_SCHEMA_CONFIG] || {}),
    };
    newConfig[INDENT] = (newConfig[INDENT] || '') + indent;
    return {
      config: newConfig,
      entries: Object.entries(schema),
    };
  },

  compile<T, K extends keyof OmitSymbols<T>> (types: TypeWrapper, schemas: T) {
    const patterns = {} as ParserResult<T>;
    const { config, entries } = this.schemaEntries(schemas, {}, '');
    for (const [name, schema] of entries) {
      const names = {
        prop: name,
        var: '$v',
        label: '$v_l',
      };
      const src = this.parseSchema(types, schema, config, names);
      const validate = () => ({});
      patterns[name as K] = validate.bind(undefined);
    }
    return patterns;
  },

  parseSchema (types: TypeWrapper, schema: ISchema, conf: IConfig, names: INames) {
    const typeName: string = schema[TYPE] || conf[TYPE];
    if (!types.has(typeName)) E.missingType(typeName);
    const type = types.get(typeName)!;
    const source = {
      code: '',
      args: [] as any[],
      params: [] as string[],
    };
    const { entries, config } = this.schemaEntries(schema, conf);
    for (const [prop, value] of entries) {
      this.parseProperty(type, prop, value, names);
    }
  },

  parseProperty (type: IType, value: any, names: INames) {
    // unimplemented;
  },
};

