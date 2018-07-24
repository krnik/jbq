export const TYPE_METHOD = {
    PERMISSION: 'permission',
    REQUIRED: 'required',
    TYPE: 'type',
    VALIDATE: Symbol.for('type_validate') as any,
    PARSE: Symbol.for('type_parse') as any,
    MIN_LEN: 'minLen',
    MAX_LEN: 'maxLen',
    LEN: 'len',
    MIN: 'min',
    MAX: 'max',
    REGEX: 'regex',
};

export const TYPE = {
    ROOT: 'root',
    STRING: 'string',
    NUMBER: 'number',
    BOOLEAN: 'boolean',
    OBJECT: 'object',
    ARRAY: 'array',
};

export const SYM = {
    OBJECT: Symbol.for('pattern_object') as any,
    COLLECTION: Symbol.for('pattern_collection') as any,
    FLAT: Symbol.for('pattern_flat') as any,
    CONFIG: Symbol.for('pattern_config') as any,
};
