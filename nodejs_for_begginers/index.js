import express from 'express';
import mongoose from 'mongoose';
import postsRouter from "./router/posts/index.js";
import fileUpload from "express-fileupload";
import {MONGODB_URL, PORT} from "./constant/route.js";

const app = express();

// Middleware
app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}));
app.use('/api', postsRouter);

const startApp = async () => {
    try {
        await mongoose.connect(MONGODB_URL)
        app.listen(PORT, () => console.log(`Server starts on port ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

await startApp();
