const controller = {};

// Hash Password
const bcrypt = require('bcrypt');

// Tokens
const jwt = require('jsonwebtoken');

// Schema BD
const User = require('../models/User');

controller.login = async (req, res) => {
	const body = {
		input: req.body.input,
		password: req.body.password,
	};

	try {
		if (!body.input || !body.password) {
			return res.status(400).send('Error en el formulario.');
		}

		const userDB = await User.findOne({
			$or: [
				{ email: body.input },
				{ userName: body.input },
				{ RUT: body.input },
			],
		});

		if (!userDB) {
			return res.status(404).send('Usuario no encontrado.');
		}

		// decrypt password and compare
		if (!bcrypt.compareSync(body.password, userDB.password)) {
			return res.status(400).send('Contraseña incorrecta.');
		}

		// Generate token
		const token = jwt.sign(
			{
				data: userDB,
			},
			'FM-2020-Prod',
			{ expiresIn: '3h' },
		);

		res.json({
			userDB,
			token,
		});
	} catch (error) {
		return res.status(500).send('Ocurrió un error en el servidor.');
	}
};

module.exports = controller;
