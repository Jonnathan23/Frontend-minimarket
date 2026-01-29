// src/core/api/validator.adapter.ts
export interface Validator {
    validate<T>(schema: unknown, data: unknown): T;
}