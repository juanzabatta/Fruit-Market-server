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
        RUT: req.body.rut,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone
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
        res.json({
            status: 'user Registred',
            userDB
        });

    } catch (error) {
        const userDB2 = await User.findOne({ $or: [{ email: body.email }, { userName: body.userName }, { RUT: body.RUT }] });

        if (userDB2.email === body.email) {
            return res.status(500).json({
                message: 'El correo ya está en uso.',
                error
            })
        } else if (userDB2.userName === body.userName) {
            return res.status(500).json({
                message: 'El nombre de usuario ya está en uso.',
                error
            })
        } else if (userDB2.RUT === body.RUT) {
            return res.status(500).json({
                message: 'El RUT del usuario ya está en uso.',
                error
            })
        } else {
            return res.status(500).json({
                message: 'Ocurrió un error al intentar conectarse al servidor',
                error
            })
        }


    }
});

// Update User
router.put('/user/:id', verifyAuth, async (req, res) => {

    const _id = req.params.id
    const body = _.pick(req.body, [
        'name',
        'email',
        'phone',
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
        const userDB2 = await User.findOne({ $or: [{ email: body.email }, { userName: body.userName }, { RUT: body.RUT }] });

        if (userDB2.email === body.email) {
            return res.status(400).json({
                message: 'El correo ya está en uso.',
                error
            })
        } else if (userDB2.userName === body.userName) {
            return res.status(400).json({
                message: 'El nombre de usuario ya está en uso.',
                error
            })
        } else if (userDB2.RUT === body.RUT) {
            return res.status(400).json({
                message: 'El RUT del usuario ya está en uso.',
                error
            })
        } else {
            return res.status(400).json({
                message: 'Ocurrió un error al intentar conectarse al servidor',
                error
            })
        }
    }
});


module.exports = router;