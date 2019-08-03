require('dotenv/config');

const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const beverageRoutes = require('./routes/beverages');
const countryRoutes = require('./routes/countries');
const ingredientsRoutes = require('./routes/ingredients');
const institutionRoutes = require('./routes/institutions');
const placeRoutes = require('./routes/places');

const db = require('./db');

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

app.use('/beverages', beverageRoutes);
app.use('/countries', countryRoutes);
app.use('/ingredients', ingredientsRoutes);
app.use('/institutions', institutionRoutes);
app.use('/places', placeRoutes);
app.use('/', authRoutes);

db.initDb((err, db) => {
	if(err) {
		console.log(err);
	} else {
		app.listen(3100);
	}
});
