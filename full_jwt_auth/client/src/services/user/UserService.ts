import {AxiosResponse} from "axios";
import User from "entity/user/User";
import api from "api";
import {USERS_URL} from "constant/api";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<User[]>> {
        return api.get<User[]>(USERS_URL)
    }
}
