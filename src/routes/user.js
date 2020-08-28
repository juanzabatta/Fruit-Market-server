const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/User');
const { request } = require('../server');

// Add new user
router.post('/new-user', async (req, res) => {

    const body = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

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
router.put('/user/:id', async (req, res) => {

    await Product.findByIdAndUpdate(req.params.id, req.body)

    // const _id = request.params.id;
    // const body = req.body;
    // try {
    //     const userDB = await User.findByIdAndUpdate(_id, body, { new: true });
    //     return res.json(userDB);

    // } catch (error) {
    //     return res.status(400).json({
    //         message: 'Ocurrió un error',
    //         error
    //     })
    // }
});


module.exports = router;