import {MouseEventHandler, useContext, useEffect} from 'react';
import LoginForm from "presentation/components/feature/LoginForm";
import Context from "context";
import {observer} from "mobx-react-lite";

const App = observer(() => {
    const { authRepository, userRepository } = useContext(Context);
    const { fetchUsers, users } = userRepository;

    const handleFetchUsersButtonClick: MouseEventHandler<HTMLButtonElement> = async () => {
        await fetchUsers();
    }

    useEffect(() => {
        if(localStorage.getItem('token')) {
            authRepository.checkAuth().then();
        }
    }, []);

    if (authRepository.isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    if (!authRepository.isAuth) {
        return (
            <div>
                <h1>Пожалуйста, авторизуйтесь</h1>
                <LoginForm/>
                <button onClick={handleFetchUsersButtonClick}>Получить пользователей</button>
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => authRepository.logout()}>Выйти</button>
            <h1>{`Добро пожаловать, ${authRepository.user.email}`}</h1>
            <div>
                <button onClick={handleFetchUsersButtonClick}>Получить пользователей</button>
                {users.map(({email}) => <div key={email}>{email}</div>)}
            </div>
        </div>
    );
});

export default App;
