import { ICreateInputSchema } from '../create';

export interface ITestSuite {
    name: string;
    valid: boolean;
    schema: ICreateInputSchema;
}
