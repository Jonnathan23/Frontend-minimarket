import { envs } from "../config/envs";
import { Api } from "./api";
import { zodValidator } from "./validators/zod-validator";


export const api = Api.getInstance(zodValidator, envs.BACKEND_URL);