const express = require('express');
const router = express.Router();

// Hash Password
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Underscore
const _ = require('underscore');

// Schema BD
const User = require('../models/User');

// Middlewares Auth
const { verifyAuth } = require('../middlewares/auth');


// Register new user
router.post('/register', async (req, res) => {

    const body = {
        name: req.body.name,
        surnames: req.body.surnames,
        userName: req.body.userName,
        dateOfBirth: req.body.dateOfBirth,
        RUT: req.body.RUT,
        gender: req.body.gender,
        email: req.body.email,
    }

    if (req.body.address) {
        body.address = {
            country: req.body.address.country,
            region: req.body.address.region,
            city: req.body.address.city,
            street: req.body.address.street,
            local: req.body.address.local
        }
    }

    // Encrypt the password
    body.password = bcrypt.hashSync(req.body.password, saltRounds);

    try {

        const userDB = await User.create(body);
        res.json(userDB);

    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error',
            error
        })
    }
});

// Update User
router.put('/user/:id', verifyAuth, async (req, res) => {

    const _id = req.params.id
    const body = _.pick(req.body, [
        'name',
        'email',
        'password',
        'active',
        'surnames',
        'userName',
        'dateOfBirth',
        'RUT',
        'gender',
        'address'])


    // Encrypt the password
    if (body.password) {
        body.password = bcrypt.hashSync(req.body.password, saltRounds);
    }

    try {
        const userDB = await User.findByIdAndUpdate(_id, body, { new: true, runValidators: true })

        res.json({
            status: 'user Updated',
            userDB
        });

    } catch (error) {
        return res.status(400).json({
            message: 'Ocurrió un error',
            error
        })
    }
});


module.exports = router;