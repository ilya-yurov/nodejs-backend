import Store from "./Store";
import User from "entity/user/User";
import UserService from "services/user/UserService";

export default class UserRepository {
    private readonly store = new Store();

    public get users(): User[] {
        return this.store.users;
    }

    public fetchUsers = async () => {
        try {
            const response = await UserService.fetchUsers();

            this.store.setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }
}
