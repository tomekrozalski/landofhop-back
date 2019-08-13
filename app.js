require('dotenv/config');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const beverageRoutes = require('./routes/beverages');
const countryRoutes = require('./routes/countries');
const imagesRoutes = require('./routes/images');
const ingredientsRoutes = require('./routes/ingredients');
const institutionRoutes = require('./routes/institutions');
const placeRoutes = require('./routes/places');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, PATCH, DELETE, OPTIONS',
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization',
	);
	next();
});

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/images', imagesRoutes);
app.use('/beverages', beverageRoutes);
app.use('/countries', countryRoutes);
app.use('/ingredients', ingredientsRoutes);
app.use('/institutions', institutionRoutes);
app.use('/places', placeRoutes);
app.use('/', authRoutes);

const { MONGODB_PASSWORD, MONGODB_USERNAME, PORT } = process.env;
const mongoDbUrl = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@landofhop-ku9ye.mongodb.net/landofhop?retryWrites=true`;

mongoose
	.connect(mongoDbUrl)
	.then(() => {
		app.listen(PORT || 3100);
	})
	.catch((err) => {
		// eslint-disable-next-line no-console
		console.log(err);
	});
