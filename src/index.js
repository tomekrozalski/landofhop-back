import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import es6Promise from 'es6-promise';
import 'dotenv/config';
import 'isomorphic-fetch';

import {
	auth,
	beverage,
	country,
	ingredient,
	institution,
	place,
} from './v1/resources';

es6Promise.polyfill();

const {
	CLIENT,
	MONGODB_PASSWORD,
	MONGODB_USERNAME,
	PORT,
} = process.env;

const mongoDbUrl = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@landofhop-ku9ye.mongodb.net/landofhop?retryWrites=true`;

const app = express();

app.use(bodyParser.json());

app.use(cors({
	origin: CLIENT,
	credentials: true,
}));

app.use('/api/v1/auth', auth);
app.use('/api/v1/beverage', beverage);
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
