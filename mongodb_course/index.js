import {MongoClient} from "mongodb";
import {MONGODB_URL} from "./constant/route.js";

const client = new MongoClient(MONGODB_URL);

const start = async () => {
    try {
        await client.connect();

        console.log('Соединение установленно');

        // Создаем коллекцию
        await client.db().createCollection('users');

        // Выносим коллекцию в переменную
        const users = client.db().collection('users');

        await users.insertOne({name: 'Petya', age: 21})

        // Ищем добавленного пользователя
        const user = await users.findOne({name: 'Petya'})

        console.log(user);
    } catch (e) {
        console.log(e)
    }
}

start().then();
