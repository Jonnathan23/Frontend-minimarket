import type { AxiosInstance } from "axios";
import axios from "axios";
import { zodValidator } from "./zod-validator";


type Operation<T> = () => Promise<{ data: T }>;

export class Api {
    private static instance: Api;
    private axiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
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
    }

    public static getInstance(): Api {
        if (!Api.instance) {
            Api.instance = new Api();
        }
        return Api.instance;
    }

    // Método genérico para evitar repetir lógica de validación
    private async request<T>(operation: Operation<T>, schema?: unknown): Promise<T> {
        const { data } = await operation();

        if (!schema) return data as T;

        return zodValidator.validate<T>(schema, data);
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