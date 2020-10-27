// Enter Database Schema
const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

// Define Roles
const roles = {
	values: ['DIRECTIVE', 'USER'],
	message: '{VALUE} rol no válido',
};

// Define Gender
const genders = {
	values: ['hombre', 'mujer', 'otro'],
	message: '{VALUE} genero no válido',
};

// Define User Schema
const UserSchema = new Schema({
	name: { type: String, required: [true, 'El nombre es necesario'] },
	surnames: { type: String, required: [true, 'Los apellidos son necesarios'] },
	userName: {
		type: String,
		required: [true, 'El nombre de usuario es necesario'],
		unique: true,
	},
	dateOfBirth: {
		type: Date,
		required: [true, 'La fecha de nacimiento es necesaria'],
	},
	RUT: {
		type: String,
		required: [true, 'El rut es necesario'],
		unique: true,
	},
	gender: {
		type: String,
		required: [true, 'El rut es necesario'],
		enum: genders,
	},
	email: {
		type: String,
		required: [true, 'El correo es necesario'],
		unique: true,
	},
	phone: {
		type: String,
		required: [true, 'El número de telefono es necesario'],
	},
	password: { type: String, required: [true, 'La contraseña es necesaria'] },
	date: { type: Date, default: Date.now },
	role: { type: String, default: 'USER', enum: roles },
	active: { type: Boolean, default: true },
	address: {
		country: { type: String },
		region: { type: String },
		city: { type: String },
		street: { type: String },
		local: { type: String },
	},
});

// Validate email for no repeat
UserSchema.plugin(uniqueValidator, {
	message: 'Error, el correo {dato} ya esta siendo utilizado',
});

// Hidden password in response
UserSchema.methods.toJSON = function () {
	const obj = this.toObject();
	delete obj.password;
	return obj;
};

module.exports = mongoose.model('User', UserSchema);
