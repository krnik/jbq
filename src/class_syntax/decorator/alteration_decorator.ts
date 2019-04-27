import { ClassValidatorBuilder } from '../class_validator_builder';

export class AlterationDecorator {
    public static transform(_builder: ClassValidatorBuilder): void {}
    public static default(_builder: ClassValidatorBuilder): void {}
}
