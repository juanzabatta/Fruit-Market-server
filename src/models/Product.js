// Enter Database Schema
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Product = new Schema({
    code: { type: String, required: [true, 'El código es necesario'] },
    title: { type: String, required: [true, 'El título es necesario'] },
    category: { type: String, required: [true, 'La categoría es necesaria'] },
    subCategory: { type: String },
    price: { type: Number, required: [true, 'El precio es necesario'] },
    priceKg: { type: Number, required: [true, 'El precio por kilo es necesario'] },
    description: { type: String, required: [true, 'La descripción es necesaria'] },
    company: { type: String, required: [true, 'La compañía es necesaria'] },
    img: { type: Array, required: [true, 'Se necesitan imagenes'] },
    stock: { type: Number, required: [true, 'El stock disponible es necesario'] },
    offer: { type: Number, default: 0 },
    deliveryTime: { type: Number, required: [true, 'El tiempo de entrega es necesario'] },
    guaranty: { type: Number, default: 30 },
    manufacturer: { type: String, required: [true, 'El fabricante es necesario'] },
    additional: { type: Array },
    details: {
        visits: { type: Number, default: 0 },
        sold: { type: Number, default: 0 },
        ratings: [{
            userID: { type: String, default: "" },
            userName: { type: String, default: "" },
            score: { type: Number, default: 0 },
            message: { type: String, default: "" },
            date: { type: Date, default: "" }
        }]
    }

});

module.exports = mongoose.model('Product', Product);