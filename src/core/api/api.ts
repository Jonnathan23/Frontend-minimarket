import type { AxiosError, AxiosInstance } from "axios";
import axios from "axios";

import type { Validator } from "./validator";


type Operation<T> = () => Promise<{ data: T }>;

// Definimos la interfaz del error que viene de TU backend
interface BackendError {
    errors: { msg: string }[];
}

export class Api {
    private static instance: Api;
    private axiosInstance: AxiosInstance;
    private validator: Validator;

    private constructor(validator: Validator, backendUrl: string) {
        this.validator = validator;
        this.axiosInstance = axios.create({
            baseURL: backendUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // INTERCEPTOR: Inyecta el token dinámicamente en cada petición
        this.axiosInstance.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        this.axiosInstance.interceptors.response.use(
            (response) => response, 
            (error: AxiosError<BackendError>) => {                
                if (error.response?.data?.errors && error.response.data.errors.length > 0) {
                    const errorMessage = error.response.data.errors[0].msg;
                    return Promise.reject(new Error(errorMessage));
                }

                return Promise.reject(error);
            }
        );
    }

    public static getInstance(validator: Validator, backendUrl: string): Api {
        if (!Api.instance) {
            Api.instance = new Api(validator, backendUrl);
        }
        return Api.instance;
    }

    // Método genérico para evitar repetir lógica de validación
    private async request<T>(operation: Operation<T>, schema?: unknown): Promise<T> {
        const { data } = await operation();

        if (!schema) return data as T;

        return this.validator.validate<T>(schema, data);
    }

    public async get<T>(url: string, schema?: unknown): Promise<T> {
        return this.request<T>(() => this.axiosInstance.get(url), schema);
    }

    public async post<T, U>(url: string, body: U, schema?: unknown): Promise<T> {
        return this.request<T>(() => this.axiosInstance.post(url, body), schema);
    }

    public async put<T, U>(url: string, body: U, schema?: unknown): Promise<T> {
        return this.request<T>(() => this.axiosInstance.put(url, body), schema);
    }

    public async delete<T>(url: string, schema?: unknown): Promise<T> {
        return this.request<T>(() => this.axiosInstance.delete(url), schema);
    }
}