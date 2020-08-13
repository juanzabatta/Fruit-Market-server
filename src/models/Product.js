// Enter Database Schema
const mongoose = require('mongoose');

const { Schema } = mongoose;

const Product = new Schema({
    code: String,
    title: String,
    category: String,
    subCategory: String,
    price: Number,
    priceKg: Number,
    description: String,
    company: String,
    img: Array,
    stock: Number,
    offer: Number,
    deliveryTime: Number,
    guaranty: Number,
    manufacturer: String,
    additional: Array,
    details: {
        visits: Number,
        sold: Number,
        ratings: [{
            userID: String,
            userName: String,
            score: Number,
            message: String,
            date: String
        }]
    }

});

module.exports = mongoose.model('Product', Product);