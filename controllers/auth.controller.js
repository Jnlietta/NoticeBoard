const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { login, password, avatar, phone } = req.body;

        if(login && typeof login === 'string' && password && typeof password == 'string' &&
           avatar && typeof avatar === 'string' && phone && typeof phone === 'string') {
    
            const userWithLogin = await User.findOne({ login });
    
            if(userWithLogin){
                return res.status(409).send({ message: 'User with this login already exists'});
            }
    
            const user = await User.create({ login, password: await bcrypt.hash(password, 10),  avatar, phone });
            res.status(201).send({ message: 'User created: ' + user.login});

        } else {
            res.status(400).send({ message: 'Bad request' });
        }
        
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { login, password } = req.body;

        if(login && typeof login === 'string' && password && typeof password == 'string'){

            const user  = await User.findOne({ login });

            if(!user){
                res.status(400).send({ message: 'Login or password are incorrect' });
            }
            else {
                if(bcrypt.compareSync(password, user.password)){
                    req.session.login = user.login;
                    res.status(200).send({ message: 'Login successful' });
                }
                else {
                    res.status(400).send({ message: 'Login or password are incorrect' });
                }
            }

        } else {
            res.status(400).send({ message: 'Bad request' });
        }

    } catch(err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getUser = async (req, res) => {
    if(req.session.login){
        res.send({ login: req.session.login });
    }
    else {
        res.status(401).send({ message: 'You are not authorized' });
    }
};
