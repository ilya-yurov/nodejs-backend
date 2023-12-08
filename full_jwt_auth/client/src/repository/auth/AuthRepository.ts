import Store from "./Store";
import AuthService from "services/auth/AuthService";
import User from "entity/user/User";
import axios from "axios";
import AuthResponse from "entity/response/AuthResponse";
import {REFRESH_URL} from "constant/api";

export default class AuthRepository {
    private readonly store = new Store();

    public get isAuth (): boolean {
        return this.store.isAuth;
    }

    public get isLoading (): boolean {
        return this.store.isLoading;
    }

    public get user(): User {
        return this.store.user;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);

            console.log(response);
            // Сохраняем токен в localStorage, чтобы затем добавлять его к каждому запросу
            localStorage.setItem('token', response.data.accessToken);
            this.store.setAuth(true);
            this.store.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);

            console.log(response);
            // Сохраняем токен в localStorage, чтобы затем добавлять его к каждому запросу
            localStorage.setItem('token', response.data.accessToken);
            this.store.setAuth(true);
            this.store.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();

            // Сохраняем токен в localStorage, чтобы затем добавлять его к каждому запросу
            localStorage.removeItem('token');
            this.store.setAuth(false);
            this.store.setUser(User.CreateEmpty());
        } catch (e) {
            console.log(e);
        }
    }

    async checkAuth() {
        try {
            this.store.setIsLoading(true);

            // Адрес по которому идет выдача access и refresh токенов
            const response = await axios.get<AuthResponse>(REFRESH_URL, {
                withCredentials: true,
            })

            // Если запрос отрабатывает успешно, то пользователь авторизован и его рефреш токен еще валиден
            localStorage.setItem('token', response.data.accessToken);
            this.store.setAuth(true);
            this.store.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        } finally {
            this.store.setIsLoading(false);
        }
    }
}
