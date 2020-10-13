const controller = {};

// Schema BD
const Product = require('../models/Product');

// Read products
controller.list = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    return res.status(400).json({
      message: 'Ocurrió un error',
      error
    })
  }
};

// Add Products
controller.add = async (req, res) => {
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
};

// Update products
controller.update =  async (req, res) => {
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
};

// Delete products
controller.delete =  async (req, res) => {
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
};

module.exports = controller;