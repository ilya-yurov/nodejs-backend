import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import router from './router/index.js';
import errorMiddleware from './middleware/Error.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
//Нужен, чтобы можно было работать с res.cookie
app.use(cookieParser());
// В настройках корса разрешаем обмен куками и указываем урл фронтенда
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    })
);
app.use('/api', router);
// Middleware для обработки ошибок обязательно должен идти последним
app.use(errorMiddleware);

const start = async () => {
    try {
        // Нужно указывать эти опции для корректной работы
        await mongoose.connect(process.env.DB_URL);
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

await start();
