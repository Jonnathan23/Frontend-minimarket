import { ZodType } from 'zod';
import type { Validator } from '../validator';


export const zodValidator: Validator = {
    validate<T>(schema: unknown, data: unknown): T {
        if (schema && typeof schema === 'object' && 'parse' in schema) {
            return (schema as ZodType<T>).parse(data as T);
        }
        throw new Error('Esquema de validación inválido');
    }
};