import { jwtDecode } from "jwt-decode";


export class JwtAdapter {
    /**
      * Decodifica un token JWT y extrae su payload.
      * @param token El string del token JWT
      * @returns El payload tipado como T
      */
    static decodeToken<T>(token: string): T {
        try {
            return jwtDecode<T>(token);
        } catch (error) {
            console.error("Error al decodificar el token:", error);
            throw new Error("Token inválido o corrupto");
        }
    }
}