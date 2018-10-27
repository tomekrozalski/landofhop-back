const Router = require('express').Router;
const mongodb = require('mongodb');

const db = require('../db');
const router = Router();

router.get('/', (req, res, next) => {
	const products = [];

	db.getDb()
		.db()
		.collection('beverages')
		.find()
		.forEach((product) => {
			product.container.value = product.container.value.toString();
			products.push(product);
		})
		.then((result) => {
			console.log('result', result);
			res
				.status(200)
				.json(products);
		})
		.catch((err) => {
			console.log('Error!', err);
			res
				.status(500)
				.json({ message: 'An error occured' });
		});
});

// Get single product
router.get('/:id', (req, res, next) => {
	const product = products.find(p => p._id === req.params.id);
	res.json(product);
});

// Add new product
// Requires logged in user
router.post('', (req, res, next) => {
	const newProduct = {
		name: req.body.name,
		description: req.body.description,
		price: parseFloat(req.body.price), // store this as 128bit decimal in MongoDB
		image: req.body.image
	};
	console.log(newProduct);
	res.status(201).json({ message: 'Product added', productId: 'DUMMY' });
});

// Edit existing product
// Requires logged in user
router.patch('/:id', (req, res, next) => {
	const updatedProduct = {
		name: req.body.name,
		description: req.body.description,
		price: parseFloat(req.body.price), // store this as 128bit decimal in MongoDB
		image: req.body.image
	};
	console.log(updatedProduct);
	res.status(200).json({ message: 'Product updated', productId: 'DUMMY' });
});

// Delete a product
// Requires logged in user
router.delete('/:id', (req, res, next) => {
	res.status(200).json({ message: 'Product deleted' });
});

module.exports = router;
