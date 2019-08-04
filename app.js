require('dotenv/config');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
// const beverageRoutes = require('./routes/beverages');
const countryRoutes = require('./routes/countries');
// const ingredientsRoutes = require('./routes/ingredients');
const institutionRoutes = require('./routes/institutions');
const placeRoutes = require('./routes/places');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, PATCH, DELETE, OPTIONS'
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization'
	);
	next();
});

// app.use('/beverages', beverageRoutes);
app.use('/countries', countryRoutes);
// app.use('/ingredients', ingredientsRoutes);
app.use('/institutions', institutionRoutes);
app.use('/places', placeRoutes);
app.use('/', authRoutes);

const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const mongoDbUrl = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@landofhop-ku9ye.mongodb.net/landofhop?retryWrites=true`;

mongoose
	.connect(mongoDbUrl)
	.then((result) => {
		app.listen(3100);
	})
	.catch(err => {
		console.log(err);
	});
