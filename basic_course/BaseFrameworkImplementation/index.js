const mongoose = require('mongoose');
const MONGODB_URL = require('./src/constant/mongoUrl')
const Application = require('./src/entity/Application')
const userRouter = require('./src/router/UserRouter')
const jsonParser = require('./src/middleware/parseJson')
const bodyParser = require('./src/middleware/bodyParser')
const parseUrl = require('./src/middleware/parseUrl')

const PORT = process.env.PORT || 5000;
const BASE_URL = `http://localhost:${PORT}`;
const app = new Application();

app.use([jsonParser, bodyParser, parseUrl(BASE_URL)]);
app.addRouter(userRouter)

const start = async () => {
    try {
        await mongoose.connect(MONGODB_URL)
        app.listen(PORT, () => console.log(`Server start on port ${PORT}`))

    } catch (e) {
        console.log(e);
    }
}

start().then();
