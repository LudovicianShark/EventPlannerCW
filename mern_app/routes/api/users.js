//Express
const express = require("express");

//Router
const router = express.Router();

//bcrypt
const bcrypt = require("bcryptjs");

//JWT Webtoken
const jwt = require("jsonwebtoken");

//Take in the config file
const config = require("config");

//User Model
const User = require("../../models/User");

// router.get("/", (req, res) => {
//   User.find().then((users) => res.json(users));
// });

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  //All fields have been entered validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //Check for existing user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    //Create new user object
    const newUser = new User({
      name,
      email,
      password,
    });

    //Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});
module.exports = router;
