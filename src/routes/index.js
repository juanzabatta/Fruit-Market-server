// Define your routes
const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

// Read products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add Products
router.post('/', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json({
    status: 'Product Saved'
  });
});

// Update products
router.put('/:id', async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body)

  res.json({
    status: 'Product Updated'
  });
});

// Delete products
router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)

  res.json({
    status: 'Product Deleted'
  });
});

module.exports = router;
