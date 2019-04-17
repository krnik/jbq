import { PathResolutionStrategy } from '../../../constants';

export interface CompilationOptions {
    debug?: boolean;
    handleResolvedPaths?: PathResolutionStrategy;
}
