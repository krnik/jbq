import Types from 'types/Wrapper';
import { SYM, TYPE_METHOD } from '../constants';
import { E } from '../utils/index';
import parsePattern, { IPattern, IPatternConfig, IPatterns, IPatternsInput, IProperty } from './PatternParser';
const { TYPE } = TYPE_METHOD;

const PATTERNS = Symbol('validator_patterns');
interface IValidatorParam<T> {
    [k: string]: T | undefined;
}
interface IValidationError {
    val: any;
    msg: string;
}
type ValidatorResult<T> = [(undefined | IValidationError), T];

export default class Validator {
    public static validateSync<T extends IValidatorParam<T>> (pattern: IPattern | IProperty, data: T): void {
        function invokeChecks<Y> (pattern: IPattern | IProperty, data: Y): void {
            // Data has additional properties not specified in pattern? What to do?
            // Data does not have properties specified in pattern? What to do?
            console.log((pattern as IProperty)[TYPE].check(pattern[TYPE].base, data));
            for (const [key, req] of Object.entries(pattern))
                console.log(key, data, req.check(req.base, data));
            if (pattern[SYM.OBJECT])
                Validator.validateSync(pattern[SYM.OBJECT] as IPattern, data);
            if (pattern[SYM.COLLECTION])
                if (!(data as any)[Symbol.iterator]) throw new ValidationError(E.msg.nonIterable(), data);
                for (const val of data)
                    Validator.validateSync(pattern[SYM.COLLECTION] as IPattern, val);
        }
        if (pattern[SYM.FLAT])
            return invokeChecks(pattern, data);
        else {
            if (data == null) throw { msg: E.msg.nullValue(), val: data } as IValidationError;
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
            Validator.validateSync(pattern, data);
            return [undefined, data];
        } catch (err) {
            return [err, data];
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
