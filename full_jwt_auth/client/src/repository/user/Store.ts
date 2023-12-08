import User from "entity/user/User";
import {makeAutoObservable} from "mobx";

export default class Store {
    users: User[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    // Мутации для изменения полей стора
    setUsers(users: User[]) {
        this.users = users;
    }
}
