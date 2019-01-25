require('dotenv/config');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const beverageRoutes = require('./routes/beverages');
const countryRoutes = require('./routes/countries');
const institutionRoutes = require('./routes/institutions');
const placeRoutes = require('./routes/places');

const db = require('./db');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join('backend/images')));

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

app.use('/', authRoutes);
app.use('/beverages', beverageRoutes);
app.use('/countries', countryRoutes);
app.use('/institutions', institutionRoutes);
app.use('/places', placeRoutes);

db.initDb((err, db) => {
	if(err) {
		console.log(err);
	} else {
		app.listen(3100);
	}
});
