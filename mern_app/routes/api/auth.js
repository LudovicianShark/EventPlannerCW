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

//Authentication Middleware
const auth = require('../../middleware/auth');

// @route   Post api/auth
// @desc    Authentic user
// @access  Public
router.post('/', (req, res) => {
    const {email, password } = req.body;    

//All fields have been entered validation
if(!email || !password)
    return res.status(400).json({msg: 'Please enter all fields'})

//Check for existing user
User.findOne({ email })
.then(user => {
    if(!user) return res.status(400).json({mgs: 'User does not exist'});

    //Validate Password
    bcrypt.compare(password, user.password)
    .then(isMatch => {
        //Passwords do not match
        if(!isMatch) return res.status(400).json({msg: 'Invalid Credentials'});

        //Passwords do match
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
});

// @route   Get api/auth/user
// @desc    Authentic user
// @access  Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;