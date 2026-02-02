
export interface Validator {
    validate<T>(schema: unknown, data: unknown): T;
}