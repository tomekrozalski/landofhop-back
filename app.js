require('dotenv/config');
require('es6-promise').polyfill();
require('isomorphic-fetch');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const authRoutes = require('./routes/auth');
const beverageRoutes = require('./routes/beverages');
const countryRoutes = require('./routes/countries');
const ingredientsRoutes = require('./routes/ingredients');
const institutionRoutes = require('./routes/institutions');
const placeRoutes = require('./routes/places');

const {
	CLIENT,
	MONGODB_PASSWORD,
	MONGODB_USERNAME,
	NODE_ENV,
	PORT,
	SESSION_SECRET,
} = process.env;

const mongoDbUrl = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@landofhop-ku9ye.mongodb.net/landofhop?retryWrites=true`;

const app = express();
const store = new MongoDBStore({
	uri: mongoDbUrl,
	collection: 'sessions',
});

app.use(bodyParser.json());
app.use(session({
	cookie: {
		maxAge: 30 * 60 * 1000,
		httpOnly: NODE_ENV === 'production',
	},
	name: 'session_auth',
	resave: true,
	rolling: true,
	saveUninitialized: false,
	secret: SESSION_SECRET,
	store,
	unset: 'destroy',
}));

app.use(cors({
	origin: CLIENT,
	credentials: true,
}));

app.use('/beverages', beverageRoutes);
app.use('/countries', countryRoutes);
app.use('/ingredients', ingredientsRoutes);
app.use('/institutions', institutionRoutes);
app.use('/places', placeRoutes);
app.use('/auth', authRoutes);

mongoose
	.connect(mongoDbUrl)
	.then(() => {
		app.listen(PORT || 3100);
	})
	.catch((err) => {
		// eslint-disable-next-line no-console
		console.log(err);
	});
