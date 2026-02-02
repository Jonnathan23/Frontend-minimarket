
export interface User {
    us_id?: string;
    us_username: string;
    us_password_encriptado: string;
    us_nombre_completo?: string;
    us_estado: boolean;
    us_createdAt?: Date;
    us_updatedAt?: Date;
}

export interface AuthResponse {
    token: string;
}

export type CreateUserDTO = Omit<User, 'us_id' | 'us_createdAt' | 'us_updatedAt'>;
export type LoginUserDTO = Omit<User, 'us_id' | 'us_createdAt' | 'us_updatedAt' | 'us_nombre_completo' | 'us_estado'>;