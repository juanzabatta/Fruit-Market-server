const controller = {};

// Schema BD
const Product = require('../models/Product');

// Read products
controller.list = async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (error) {
		return res.status(500).json({
			message: 'Ocurrió un error',
			error,
		});
	}
};

// Add Products
controller.add = async (req, res) => {
	const product = new Product(req.body);
	try {
		if (
			!product.code ||
			!product.title ||
			!product.category ||
			!product.price ||
			!product.priceKg ||
			!product.description ||
			!product.company ||
			!product.img ||
			!product.stock ||
			!product.deliveryTime ||
			!product.manufacturer
		) {
			return res.status(400).send();
		}

		await product.save();

		res.json({
			message: 'Product Saved',
    });
    
	} catch (error) {
		return res.status(500).json({
			message: 'Ocurrió un error',
			error,
		});
	}
};

// Update products
controller.update = async (req, res) => {
	try {
		const productDB = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});

		res.json({
			message: 'Product Updated',
			productDB,
    });
    
	} catch (error) {
		return res.status(500).json({
			message: 'Ocurrió un error',
			error,
		});
	}
};

// Delete products
controller.delete = async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);

		res.json({
			message: 'Product Deleted',
		});
	} catch (error) {
		return res.status(500).json({
			message: 'Ocurrió un error',
			error,
		});
	}
};

module.exports = controller;
