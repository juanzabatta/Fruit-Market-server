// Enter Database Schema
const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

// Define Roles
const roles = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} rol no válido'
};

// Define User Schema
const UserSchema = new Schema({

    name: { type: String, required: [true, 'El nombre es necesario'] },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true

    },
    password: { type: String, required: [true, 'La contraseña es necesaria'] },
    date: { type: Date, default: Date.now },
    role: { type: String, default: 'USER', enum: roles },
    activo: { type: Boolean, default: true }

});

// Validate email for no repeat
UserSchema.plugin(uniqueValidator, { message: 'Error, el correo {email} ya esta siendo utilizado' });

// Hidden password in response
UserSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
}

module.exports = mongoose.model('User', UserSchema);
