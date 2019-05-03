You can set the logging function/library using `setLogger` function.
Currently the logging functionality of JBQ is lacking but will be expanded in the future so it gives more diagnostic information.

Provided argument should match the following interface.
```typescript
interface Logger {
    debug(message: string, ...args: unknown[]): void;
}
```

{{example('logging')}}
