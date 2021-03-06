import mongoose from 'mongoose';
import Int32 from 'mongoose-int32';

import { langValue } from 'models/common';
import brewingSchema from './brewingSchema';
import impressionsSchema from './impressionsSchema';
import ingredientsSchema from './ingredientsSchema';
import priceSchema from './priceSchema';

const generalSchema = new mongoose.Schema({
	name: {
		type: [langValue],
		validate: {
			validator(v) {
				return v.length;
			},
			message: props => `${props.value} is empty`,
		},
		required: true,
	},
	series: {
		type: [langValue],
		default: undefined,
	},
	brand: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Institution',
		required: true,
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
		validate: {
			validator(v) {
				return !v.find(({ value }) => value.length < 5);
			},
			message: props => `${props.value} has less then 4 signs`,
		},
		default: undefined,
	},
	barcode: String,
}, { _id: false });

const containerSchema = new mongoose.Schema({
	color: {
		type: String,
		enum: ['brown', 'green', 'black', 'silver', 'transparent'],
	},
	material: {
		type: String,
		enum: ['glass', 'aluminum'],
	},
	unit: {
		type: String,
		enum: ['ml'],
	},
	type: {
		type: String,
		enum: ['bottle', 'can'],
	},
	value: {
		type: Int32,
		min: 0,
		max: 100000,
	},
	hasCapWireFlip: {
		type: Boolean,
		validate: {
			validator(v) {
				return v;
			},
			message: props => `${props.value} need to be true or be undefined`,
		},
	},
}, { _id: false });

const labelSchema = new mongoose.Schema({
	general: {
		type: generalSchema,
		required: true,
	},
	brewing: brewingSchema,
	ingredients: ingredientsSchema,
	impressions: impressionsSchema,
	container: {
		type: containerSchema,
		required: true,
	},
	price: {
		type: [priceSchema],
		default: undefined,
	},
}, { _id: false });

export default labelSchema;
