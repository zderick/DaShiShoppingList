const express = require('express');
const router = express.Router();

const User = require('../../models/UserSchema.js');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
        let { name, email, password } = req.body;
	email = email.toLowerCase();

        if(!name || !email || !password){
                return res.status(400).json({msg: 'Please enter all fields'});
        }

        User.findOne({email: email})
            .then(user => {
                if(user){
                    return res.status(400).json({msg: 'User already exists'});
                }

                const newUser = new User({
                    name: name,
                    email: email,
                    password: password,
                });

                //Create salt & hash
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                jwt.sign(
                                    {
                                        id: user.id
                                    }, 
                                    config.get('jwtSecret'),
                                    {
                                        expiresIn : 3600
                                    },
                                    (err, token) => {
                                        if(err) throw err;
                                        res.json({
                                            token: token,
                                            user:{
                                                id: user.id,
                                                name: user.name,
                                                email: user.email,
                                            }
                                        });
                                    }
                                );
                            })
                    });
                })
            });
	});

module.exports = router;
