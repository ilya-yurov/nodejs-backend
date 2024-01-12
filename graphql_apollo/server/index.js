import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import schema from "./shema.js";

const USERS = [
    {
        id: 1,
        username: 'Ilya',
        age: 30
    },
    {
        id: 2,
        username: 'Alex',
        age: 25
    },
    {
        id: 3,
        username: 'Vova',
        age: 40
    }
];

const app = express();
app.use(cors())

const createUser = (input) => {
    return  {
        id: Date.now(),
        ...input
    }
}

//Создадим resolver, чтобы не париться с БД
const root = {
    getAllUsers: () => {
        return USERS
    },
    getUser: ({id}) => USERS.find(user => user.id === Number(id)),
    createUser: ({input}) => {
        const user = createUser(input)
        USERS.push(user);

        return user;
    }
}

app.use('/graphql', graphqlHTTP({
    schema,
    // Включает графический интерфейс в браузере, чтобы мы могли тестировать и отправлять  запросы в браузере
    graphiql: true,
    rootValue: root,
}))

app.listen(5000, () => {
    console.log('Server started on port 5000');
})
