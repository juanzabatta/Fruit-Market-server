// Define your routes
const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

// Leer Tareas
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Agregar Tareas
router.post('/', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json({
    status: 'Product Saved'
  });
});

// Actualizar Tareas
router.put('/:id', async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body)

  res.json({
    status: 'Product Updated'
  });
});

// Borrar Tareas
router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)

  res.json({
    status: 'Product Deleted'
  });
});

module.exports = router;
