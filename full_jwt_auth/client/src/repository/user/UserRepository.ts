import Store from "./Store";
import AuthService from "services/auth/AuthService";
import User from "entity/user/User";

export default class UserRepository {
    private readonly store = new Store();

    async logine(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);

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
}
