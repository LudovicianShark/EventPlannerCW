//Express
const express = require('express');

//Router
const router = express.Router();

//bcrypt
const bcrypt = require('bcryptjs');

//JWT Webtoken
const jwt = require('jsonwebtoken');

//Take in the config file
const config = require('config');

//Item Model
const User = require('../../models/User');

// @route   Post api/users
// @desc    Register users
// @access  Public
router.post('/', (req, res) => {
    const {uName, email, password } = req.body;    

//All fields have been entered validation
if(!uName || !email || !password)
    return res.status(400).json({msg: 'Please enter all fields'})

//Check for existing user
User.findOne({ email })
.then(user => {
    if(user) return res.status(400).json({mgs: 'User already exists'});

    //Create new user object
    const newUser = new User({
        uName,
        email,
        password
    });

    //Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
                .then(user => {
                   jwt.sign(
                       { id: user.id },
                       config.get('jwtSecret'), 
                       { expiresIn: 3600 },
                       (err, token) => {
                           if(err) throw err;
                           res.json({
                               token,
                                user: {
                                id:user.id,
                                uName: user.uName,
                                email:user.email
                            }
                        });
                       }
                   )
                    
                })
        })
    })
})
});
module.exports = router;