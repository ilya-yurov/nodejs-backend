const User = require('../../model/user')

const getUsers = async (req, res) => {
    if (req.params.id) {
        res.send(await User.findOne({'id': req.params.id}));
    } else {
        res.send(await User.find());
    }
}

const createUser = async (req, res) => {
    const user = await User.create(req.body);

    res.send(user);
}

module.exports = {
    getUsers,
    createUser,
}
