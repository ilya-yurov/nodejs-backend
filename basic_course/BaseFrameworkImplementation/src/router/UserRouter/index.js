const Router = require('../../entity/Router');
const UserController = require('../../controller/UserController')

const router = new Router();
const { getUsers, createUser } = UserController;


router.get('/users', getUsers)

router.post('/users', createUser)

module.exports = router;
