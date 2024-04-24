const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const deleteFile = require('../utils/deleteFile');

exports.register = async (req, res) => {
    try {
        const { login, password, phone } = req.body;
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
        const avatar = req.file.filename;

        if(login && typeof login === 'string' && password && typeof password == 'string' &&
            phone && typeof phone === 'string' && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
    
            const userWithLogin = await User.findOne({ login });
    
            if(userWithLogin){
                deleteFile(req.file.path);
                return res.status(409).send({ message: 'User with this login already exists'});
            }
    
            const user = await User.create({ login, password: await bcrypt.hash(password, 10),  avatar, phone });
            res.status(201).send({ message: 'User created: ' + user.login});

        } else {
            deleteFile(req.file.path);
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
                    req.session.user = { login: user.login, id: user._id };

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
    res.send('Yeah, I\'m logged' );
};

exports.logout = async (req, res) => {

    try {
        req.session.destroy();
        
        if (process.env.NODE_ENV !== "production"){
            await Session.deleteMany({});
        }

        res.status(200).json({ message: "Successfully logged out" });
        
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
};
