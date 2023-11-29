import express from 'express';
import userRouter from "./route/UserRouter.js";
import postRouter from "./route/PostRouter.js";

const PORT = process.env.PORT || 8080;

const app = express();

// Express по-умолчанию не может распарсить JSON-строку, для этого ему необходимо это указать как ниже
app.use(express.json());
app.use('/api', userRouter);
app.use('/api', postRouter);

app.listen(PORT, () => console.log(`Server starts on port ${PORT}`));
