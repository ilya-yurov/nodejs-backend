import express from 'express';
import mongoose from "mongoose";
import {MONGODB_URL} from "./constant/route.js";
import AuthRouter from "./router/AuthRouter.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json())
app.use('/auth', AuthRouter);

const start = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        app.listen(PORT, () => console.log(`Server starts on ${PORT} port`))
    } catch (e) {
        console.log(e);
    }
}

await start();
