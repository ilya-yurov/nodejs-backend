import User from "entity/user/User";
import {makeAutoObservable} from "mobx";

export default class Store {
    user: User = User.CreateEmpty();
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this)
    }

    // Мутации для изменения полей стора
    setAuth(isAuth: boolean) {
        this.isAuth = isAuth
    }

    setUser(user: User) {
        this.user = user;
    }

    setIsLoading(isLoading: boolean) {
        this.isLoading = isLoading;
    }
}
