import mongoose from 'mongoose';

import { langValue } from 'models/common';
import brewingSchema from './brewingSchema';
import impressionsSchema from './impressionsSchema';
import ingredientsSchema from './ingredientsSchema';
import priceSchema from './priceSchema';

const generalSchema = new mongoose.Schema({
	series: {
		type: [langValue],
		default: undefined,
	},
	brand: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Institution',
	},
	cooperation: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Institution',
		}],
		default: undefined,
	},
	contract: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Institution',
	},
	place: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Place',
	},
	tale: {
		type: [langValue],
		default: undefined,
	},
}, { _id: false });

const producerSchema = new mongoose.Schema({
	general: generalSchema,
	brewing: brewingSchema,
	ingredients: ingredientsSchema,
	impressions: impressionsSchema,
	price: {
		type: [priceSchema],
		default: undefined,
	},
}, { _id: false });

export default producerSchema;
