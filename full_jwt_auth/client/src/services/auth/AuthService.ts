import { AxiosResponse } from 'axios'
import AuthResponse from "entity/response/AuthResponse";
import api from "api";
import {LOGIN_URL, LOGOUT_URL, REGISTRATION_URL} from "constant/api";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>(LOGIN_URL, {email, password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>(REGISTRATION_URL, {email, password})
    }

    static async logout(): Promise<void> {
        return api.post(LOGOUT_URL)
    }
}
