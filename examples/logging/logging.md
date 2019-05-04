You can set the logging function/library using `setLogger` function.
Currently the JBQ logs only schema compilation progress but most probably it will be expanded in the future so it gives more information.

Provided argument should match the following interface.
```typescript
interface Logger {
    debug(message: string, ...args: unknown[]): void;
}
```

{{example('logging')}}
