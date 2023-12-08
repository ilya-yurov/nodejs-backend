import {FC, useContext, useState} from 'react';
import Context from "context";

const LoginForm: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { authRepository } = useContext(Context);

    return (
        <div>
            <form>
                <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='Email'
                />
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='Password'
                    autoComplete="off"
                />
                <button type="button" onClick={() => authRepository.login(email, password)}>
                    Login
                </button>
                <button type="button" onClick={() => authRepository.registration(email, password)}>
                    Register
                </button>
            </form>
        </div>
    )
};

export default LoginForm;
