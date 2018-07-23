import Types from 'types/Wrapper';
import { SYM } from '../constants';
import parsePattern, { IPattern, IPatternConfig, IPatterns, IPatternsInput, IProperty } from './PatternParser';

const PATTERNS = Symbol('validator_patterns');
export default class Validator {
    public static validateSync (pattern: IPattern | IProperty, data: any) {
        function invokeChecks (pattern: IPattern | IProperty, data: any) {
            // Figure out something to check type first and then other properties
            for (const [key, req] of Object.entries(pattern))
                // check if any of entries evals to false
                // if false then break loop and return false
                console.log(key, data, req.check(req.base, data));
            if (pattern[SYM.OBJECT])
                // if false then return false
                Validator.validateSync(pattern[SYM.OBJECT] as IPattern, data);
            if (pattern[SYM.COLLECTION])
                for (const val of data)
                    // if any of iteration evals to false break and return false
                    Validator.validateSync(pattern[SYM.COLLECTION] as IPattern, val);
        }
        if (pattern[SYM.FLAT])
            return invokeChecks(pattern, data);
        else for (const [propName, requirements] of Object.entries(pattern))
            invokeChecks(requirements, data[propName]);
    }

    public static async validate (pattern: IPattern | IProperty, data: any) {
        async function invokeChecks (pattern: IPattern | IProperty, data: any) {
            for (const [key, req] of Object.entries(pattern))
                console.log(key, data, req.check(req.base, data));
        }
        if (pattern[SYM.FLAT])
            await invokeChecks(pattern, data);
    }

    private [PATTERNS]: IPatterns;
    [key: string]: (...args: any[]) => boolean;

    constructor (type: Types, patterns: IPatternsInput, conf: IPatternConfig) {
        this[PATTERNS] = parsePattern(type, patterns, conf);
        for (const patternName of Object.keys(patterns)) {
            this[`${patternName}Sync`] = (data: any) => this.validateSync(patternName, data);
            this[patternName] = (data: any) => this.validate(patternName, data);
        }
    }

    public validateSync (patternName: string, data: any) {
        const pattern = this[PATTERNS][patternName];
        Validator.validateSync(pattern, data);
            // this._validate must be async
            // .then((d) => data)
            // .catch((err) => err);
        return true;
    }

    public validate (patternName: string, data: any) {
        const pattern = this[PATTERNS][patternName];
        return Validator
            .validate(pattern, data)
            .then()
            .catch();
    }
}
