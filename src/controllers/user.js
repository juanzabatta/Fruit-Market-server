const _ = require('underscore');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const controller = {};

// Register new user
controller.register = async (req, res) => {
	const body = {
		name: req.body.name,
		surnames: req.body.surnames,
		userName: req.body.userName,
		dateOfBirth: req.body.dateOfBirth,
		RUT: req.body.rut,
		gender: req.body.gender,
		email: req.body.email,
		phone: req.body.phone,
	};

	if (req.body.address) {
		body.address = req.body.address;
	}

	try {
    // Encrypt the password
    body.password = bcrypt.hashSync(req.body.password, saltRounds);

		if (
			!body.name ||
			!body.surnames ||
			!body.userName ||
			!body.dateOfBirth ||
			!body.RUT ||
			!body.gender ||
			!body.email ||
      !body.phone ||
      !body.password
		) {
			return res.status(400).send('Campos inválidos.');
		}


		const userDB = await User.create(body);

		res.json({
			message: 'Usuario registrado.',
			userDB,
		});
	} catch (error) {
		const userDB2 = await User.findOne({
			$or: [
				{ email: body.email },
				{ userName: body.userName },
				{ RUT: body.RUT },
			],
		});

		if (userDB2.email === body.email) {
			return res.status(400).json({
				message: 'El correo ya está en uso.',
				error,
			});
		} else if (userDB2.userName === body.userName) {
			return res.status(400).json({
				message: 'El nombre de usuario ya está en uso.',
				error,
			});
		} else if (userDB2.RUT === body.RUT) {
			return res.status(400).json({
				message: 'El RUT del usuario ya está en uso.',
				error,
			});
		} else {
			return res.status(500).json({
				message: 'Ocurrió un error al intentar conectarse al servidor',
				error,
			});
		}
	}
};

// Update User
controller.update = async (req, res) => {
	const _id = req.params.id;
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
		'address',
	]);

	try {
		// Encrypt the password
		if (body.password) {
			body.password = bcrypt.hashSync(req.body.password, saltRounds);
		}

		const userDB = await User.findByIdAndUpdate(_id, body, {
			new: true,
			runValidators: true,
		});

		res.json({
			message: 'Usuario actualizado.',
			userDB,
		});
	} catch (error) {
		const userDB2 = await User.findOne({
			$or: [
				{ email: body.email },
				{ userName: body.userName },
				{ RUT: body.RUT },
			],
		});

		if (userDB2.email === body.email) {
			return res.status(400).send('El correo ya está en uso.');
		} else if (userDB2.userName === body.userName) {
			return res.status(400).send('El nombre de usuario ya está en uso.');
		} else if (userDB2.RUT === body.RUT) {
			return res.status(400).send('El RUT del usuario ya está en uso.');
		} else {
			return res
				.status(500)
				.send('Ocurrió un error al intentar conectarse al servidor.');
		}
	}
};

module.exports = controller;
