import { SourceBuilderContext } from './source_builder_context.interface';

export interface SourceBuilderSnapshot extends SourceBuilderContext {
    restore (): void;
}
