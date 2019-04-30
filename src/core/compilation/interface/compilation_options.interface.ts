import { PathResolutionStrategy } from '../../../misc/constants';

export interface CompilationOptions {
    debug?: boolean;
    handleResolvedPaths?: PathResolutionStrategy;
    async?: boolean;
}
