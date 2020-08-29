// Define your routes
const express = require('express');
const router = express.Router();

// Schema BD
const Product = require('../models/Product');

// Middlewares Auth
const { verifyAuth, verifyDirective } = require('../middlewares/auth');

// Read products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    return res.status(400).json({
      message: 'Ocurrió un error',
      error
    })
  }

});

// Add Products
router.post('/', [verifyAuth, verifyDirective], async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.json({
      status: 'Product Saved'
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Ocurrió un error',
      error
    })
  }

});

// Update products
router.put('/:id', [verifyAuth], async (req, res) => {
  try {
    const productDB = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.json({
      status: 'Product Updated',
      productDB
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Ocurrió un error',
      error
    })
  }

});

// Delete products
router.delete('/:id', [verifyAuth, verifyDirective], async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)

    res.json({
      status: 'Product Deleted'
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Ocurrió un error',
      error
    })
  }

});

module.exports = router;
