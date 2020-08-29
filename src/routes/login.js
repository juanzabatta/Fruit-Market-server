const express = require('express');
const router = express.Router();

// Hash Password
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Tokens
const jwt = require('jsonwebtoken');

// Schema BD
const User = require('../models/User');

router.post('/', async (req, res) => {
    const body = {
        input: req.body.input,
        password: req.body.password
    };

    try {
        const userDB = await User.findOne({ $or: [{ email: body.input }, { userName: body.input }, { RUT: body.input }] });

        if (!userDB) {
            return res.status(400).json({
                message: 'Usuario no encontrado'
            })
        }

        // decrypt password and compare
        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                message: 'Contraseña incorrecta'
            })
        }

        // Generate token
        const token = jwt.sign({
            data: userDB
        }, 'FM-2020-Prod', { expiresIn: '3h' });

        res.json({
            userDB,
            token
        })

    } catch (error) {
        return res.status(400).json({
            message: 'Ocurrió un error',
            error
        })
    }

})

module.exports = router;