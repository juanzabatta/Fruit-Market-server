const router = require('express').Router();

// Middlewares Auth
const { verifyAuth, verifyDirective } = require('../middlewares/auth');

const productsController = require('../controllers/products');

// Read products
router.get('/products', productsController.list);
// Add Products
router.post('/products', [verifyAuth, verifyDirective], productsController.add);
// Update products
router.put('/products/:id', verifyAuth, productsController.update);
// Delete products
router.put('/products/:id',  [verifyAuth, verifyDirective], productsController.delete);

const userController = require('../controllers/user');

// Register user
router.post('/users/register', userController.register);
// Update user
router.put('/users/user/:id', verifyAuth, userController.update);

const loginUserController = require('../controllers/login');

// Login user
router.post('/login', loginUserController.login);

module.exports = router;
