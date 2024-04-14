const User = require('../models/User.model');

exports.register = async (req, res) => {
    const { login, password, avatar, phone } = req.body;

    if(login && typeof login === 'string' && password && typeof password == 'string' &&
       avatar && typeof avatar === 'string' && phone && typeof phone == 'number') {

        const userWithLogin = await User.findOne({ login });

        if(userWithLogin){
            res.status(409).send({ message: 'User with this login already exists'});
        }

    }
    res.send('register');
};

exports.login = async (req, res) => {};
exports.getUser = async (req, res) => {};
