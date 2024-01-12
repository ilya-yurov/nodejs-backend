import './App.css';
import zalupa from './images/img.png';
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_USERS_QUERY} from "./query/getUsersQuery";
import {CREATE_USER_MUTATION} from "./mutations/createUserMutation";
import {GET_ONE_USER_QUERY} from "./query/getOneUserQuery";

function App() {
    // В квери возвращается следующее
    // pollInterval - определяет время в миллисекундах между запросами к базе данных
    const {data, loading, error, refetch} = useQuery(GET_USERS_QUERY);
    // В мутации возвращается кортеж где 1 элемент - функция вызывающая мутацию
    const [newUser] = useMutation(CREATE_USER_MUTATION);
    const {data: oneUser, loading: isOneUserLoading} = useQuery(GET_ONE_USER_QUERY, {
        variables: {
            id: 1
        }
    });
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [age, setAge] = useState(0);

    console.log(oneUser)

    useEffect(() => {
        if (!loading) {
            setUsers(data.getAllUsers);
        }
    }, [data]);

    const createUser = async () => {
        try {
            await newUser({
                variables: {
                    input: {
                        username,
                        age: Number(age)
                    }
                }
            })
            setUsername('')
            setAge(0)
        } catch (e) {
            console.log(e);
        }

    };

    const getUsers = async () => {
        const {data} = await refetch();

        setUsers(data.getAllUsers);
    }

    return (
        <div style={{height: "100vh", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <img style={{width: 500, height: 300}} src={zalupa} alt="Залупа иваныча"/>
            <div>
                <form style={{display: "grid", padding: "20px 0", rowGap: 20}}>
                    <input value={username} onChange={e => setUsername(e.target.value)} type="text"></input>
                    <input value={age} onChange={e => setAge(e.target.value)} type="number"></input>
                    <div style={{display: "flex", columnGap: 20, justifyContent: "center"}}>
                        <button type="button" onClick={createUser}>Создать залупыча</button>
                        <button type="button" onClick={getUsers}>Получить залупышей</button>
                    </div>
                </form>
                <div>
                    <table style={{width: 500}}>
                        <thead>
                        <tr>
                            <th style={{textAlign: "left", padding: 10}}>Имя</th>
                            <th style={{textAlign: "left", padding: 10}}>Возраст</th>
                        </tr>
                        </thead>
                        <tbody>
                        {loading && <tr><td>Loading...</td></tr>}
                        {!loading && users.map((user) => (
                            <tr key={user.id}>
                                <td style={{padding: 10}}>{user.username}</td>
                                <td style={{padding: 10}}>{user.age}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default App;
