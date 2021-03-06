import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import es6Promise from 'es6-promise';
import 'dotenv/config';
import 'isomorphic-fetch';

import v1 from './v1';

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

// app.use((req, res, next) => { setTimeout(next, 5000); });

app.use(cors({
	origin: CLIENT.split(', '),
	credentials: true,
}));

app.use('/api/v1/auth', v1.auth);
app.use('/api/v1/beverage', v1.beverage);
app.use('/api/v1/country', v1.country);
app.use('/api/v1/ingredient', v1.ingredient);
app.use('/api/v1/institution', v1.institution);
app.use('/api/v1/place', v1.place);

mongoose
	.connect(mongoDbUrl, { useNewUrlParser: true })
	.then(() => {
		app.listen(PORT || 3100);
	})
	.catch((err) => {
		// eslint-disable-next-line no-console
		console.log(err);
	});
