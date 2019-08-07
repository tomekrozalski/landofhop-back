const mongoose = require('mongoose');
const Int32 = require('mongoose-int32');
const langValue = require('./langValueSchema');
const brewingSchema = require('./brewingSchema');
const impressionsSchema = require('./impressionsSchema');
const ingredientsSchema = require('./ingredientsSchema');
const priceSchema = require('./priceSchema');

const { Schema } = mongoose;

const generalSchema = new Schema({
	name: {
		type: [langValue],
		required: true,
	},
	series: {
		type: [langValue],
		default: undefined,
	},
	brand: {
		type: Schema.Types.ObjectId,
		ref: 'Institution',
		required: true,
	},
	cooperation: {
		type: [{
			type: Schema.Types.ObjectId,
			ref: 'Institution',
		}],
		default: undefined,
	},
	contract: {
		type: Schema.Types.ObjectId,
		ref: 'Institution',
	},
	place: {
		type: Schema.Types.ObjectId,
		ref: 'Place',
	},
	tale: {
		type: [langValue],
		default: undefined,
	},
	barcode: String,
}, { _id: false });

const containerSchema = new Schema({
	color: {
		type: String,
		enum: ['brown', 'green', 'black', 'silver'],
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
	hasCapWireFlip: Boolean,
}, { _id: false });

const labelSchema = new Schema({
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

module.exports = labelSchema;
