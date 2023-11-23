const PORT = process.env.PORT || 5000;
const Router = require('./Router')
const Application = require('./Application')

const app = new Application();
const router = new Router();

router.get('/users', (req, res) => {
    res.end('YOU SEND REQUEST TO USERS')
})

router.get('/posts', (req, res) => {
    res.end('YOU SEND REQUEST TO POSTS')
})

app.addRouter(router)
app.listen(PORT, () => console.log(`Server start on port ${PORT}`))
