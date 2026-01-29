import { ZodType } from 'zod';
import type { Validator } from './validator';

export const zodValidator: Validator = {
    validate<T>(schema: unknown, data: unknown): T {
        return (schema as ZodType<T>).parse(data);
    }
};