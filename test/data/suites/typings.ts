import { CreateInputSchema } from '../create';

export interface TestSuite {
    name: string;
    valid: boolean;
    schema: CreateInputSchema;
}
