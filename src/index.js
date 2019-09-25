import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import connectMongoSession from 'connect-mongodb-session';
import es6Promise from 'es6-promise';

import 'dotenv/config';
import 'isomorphic-fetch';

import {
	country,
	ingredient,
	institution,
	place,
} from './v1/resources';

es6Promise.polyfill();
const MongoDBStore = connectMongoSession(session);

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

app.use('/api/v1/country', country);
app.use('/api/v1/ingredient', ingredient);
app.use('/api/v1/institution', institution);
app.use('/api/v1/place', place);

mongoose
	.connect(mongoDbUrl)
	.then(() => {
		app.listen(PORT || 3100);
	})
	.catch((err) => {
		// eslint-disable-next-line no-console
		console.log(err);
	});
