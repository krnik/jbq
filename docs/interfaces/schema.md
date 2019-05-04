[jbq](../README.md) > [Schema](../interfaces/schema.md)

# Interface: Schema

Interface representing a Schema passed down to compilation functions.

Examples
========

```
 const schema1 = { type: 'any', required: false };

 const schema2 = {
     type: 'object',
     [Symbol.for('schema_properties')]: {
         firstName: { type: 'string', len: { min: 4 } },
         zip_code: { type: 'string', regex: /\d{3}-\d{2}/ },
     }
 };
```

## Hierarchy

**Schema**

## Indexable

\[property: `string`\]:&nbsp;`unknown`
Interface representing a Schema passed down to compilation functions.

Examples
========

```
 const schema1 = { type: 'any', required: false };

 const schema2 = {
     type: 'object',
     [Symbol.for('schema_properties')]: {
         firstName: { type: 'string', len: { min: 4 } },
         zip_code: { type: 'string', regex: /\d{3}-\d{2}/ },
     }
 };
```

## Index

### Properties

* [__computed](schema.md#__computed)

---

## Properties

<a id="__computed"></a>

### `<Optional>` __computed

**● __computed**: *[Schema](../enums/pathresolutionstrategy.md#schema)*

*Defined in [core/compilation/interface/schema.interface.ts:19](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/interface/schema.interface.ts#L19)*
*Defined in [core/compilation/interface/schema.interface.ts:22](https://github.com/krnik/vjs-validator/blob/15e769b/src/core/compilation/interface/schema.interface.ts#L22)*

___

