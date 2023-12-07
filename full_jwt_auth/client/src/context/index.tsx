import AuthRepository from "repository/auth/AuthRepository";
import UserRepository from "repository/user/UserRepository";
import {createContext} from "react";

interface IRepository {
    authRepository: AuthRepository;
    userRepository: UserRepository;
}

export const store: IRepository = {
    authRepository: new AuthRepository(),
    userRepository: new UserRepository(),
}

const Context = createContext<IRepository>(store);

export default Context;
