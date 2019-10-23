import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import es6Promise from 'es6-promise';
import 'dotenv/config';
import 'isomorphic-fetch';

import version1 from './v1/resources';

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
	origin: CLIENT.split(', '),
	credentials: true,
}));

app.use('/api/v1/auth', version1.auth);
app.use('/api/v1/beverage', version1.beverage);
app.use('/api/v1/country', version1.country);
app.use('/api/v1/ingredient', version1.ingredient);
app.use('/api/v1/institution', version1.institution);
app.use('/api/v1/place', version1.place);

mongoose
	.connect(mongoDbUrl)
	.then(() => {
		app.listen(PORT || 3100);
	})
	.catch((err) => {
		// eslint-disable-next-line no-console
		console.log(err);
	});
