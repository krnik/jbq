import Types from 'types/Wrapper';
import { SYM } from '../constants';
import { E } from '../utils/index';
import parsePattern, { IPattern, IPatternConfig, IPatterns, IPatternsInput, IProperty } from './PatternParser';

const PATTERNS = Symbol('validator_patterns');
interface IValidationParam<T> {
    [k: string]: T | undefined;
}
class ValidationError extends Error {
    msg: string;
    val: any;
    constructor (msg: string, val: any) {
        super();
        this.msg = msg;
        this.val = val;
    }
}
type ValidatorResult<T> = [(undefined | ValidationError), T];

export default class Validator {
    public static validateSync<T extends IValidationParam<T>> (pattern: IPattern | IProperty, data: T): T {
        function invokeChecks<Y> (pattern: IPattern | IProperty, data: Y): Y {
            // Figure out something to check type first and then other properties
            for (const [key, req] of Object.entries(pattern))
                // check if any of entries evals to false
                // if false then break loop and return false
                console.log(key, data, req.check(req.base, data));
            if (pattern[SYM.OBJECT])
                // if false then return false
                Validator.validateSync(pattern[SYM.OBJECT] as IPattern, data);
            if (pattern[SYM.COLLECTION])
                if (!(data as any)[Symbol.iterator]) throw new ValidationError(E.msg.nonIterable(), data);
                for (const val of (data as any as Iterable<Y>))
                    // if any of iteration evals to false break and return false
                    Validator.validateSync(pattern[SYM.COLLECTION] as IPattern, val);
            return data;
        }
        if (pattern[SYM.FLAT])
            return invokeChecks(pattern, data);
        else {
            if (data == null) throw new ValidationError(E.msg.nullValue(), data);
            // What if data has additional keys
            // Copy object properties
            for (const [propName, requirements] of Object.entries(pattern))
                invokeChecks(requirements, data[propName]);
        }
    }

    // public static async validate (pattern: IPattern | IProperty, data: any) {
    //     async function invokeChecks (pattern: IPattern | IProperty, data: any) {
    //         for (const [key, req] of Object.entries(pattern))
    //             console.log(key, data, req.check(req.base, data));
    //     }
    //     if (pattern[SYM.FLAT])
    //         await invokeChecks(pattern, data);
    // }

    private [PATTERNS]: IPatterns;
    // [key: string]: (...args: any[]) => ValidatorResult | Promise<boolean>;

    constructor (type: Types, patterns: IPatternsInput, conf: IPatternConfig) {
        this[PATTERNS] = parsePattern(type, patterns, conf);
        for (const patternName of Object.keys(patterns)) {
            if (this.hasOwnProperty(`${patternName}Sync`) || this.hasOwnProperty(patternName))
                E.validatorDuplicateKeys(patternName);
            // this[`${patternName}Sync`] = (data: any) => this.validateSync(patternName, data);
            // this[patternName] = (data: any) => this.validate(patternName, data);
        }
    }

    public validateSync<T> (patternName: string, data: T): ValidatorResult<T> {
        const pattern = this[PATTERNS][patternName];
        try {
            const _data = Validator.validateSync(pattern, data);
            return [undefined, _data];
        } catch (err) {
            return [err as ValidationError, data];
        }
    }

    // public validate (patternName: string, data: any): Primise<boolean> {
    //     const pattern = this[PATTERNS][patternName];
    //     return Validator
    //         .validate(pattern, data)
    //         .then()
    //         .catch();
    // }
}
