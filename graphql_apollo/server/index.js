import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import schema from "./shema.js";

const app = express();
app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema,
    // Включает графический интерфейс в браузере, чтобы мы могли тестировать и отправлять  запросы в браузере
    graphiql: true
}))

app.listen(5000, () => {
    console.log('Server started on port 5000');
})
