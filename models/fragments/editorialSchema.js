const mongoose = require('mongoose');
const Int32 = require('mongoose-int32');
const agedSchema = require('./agedSchema');
const langValue = require('./langValueSchema');
const priceSchema = require('./priceSchema');

const { Schema } = mongoose;

const generalSchema = new Schema({
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
}, { _id: false });

const brewingSchema = new Schema({
	fermentation: {
		type: [{
			type: String,
			enum: ['top', 'bottom', 'spontaneous'],
		}],
		default: undefined,
	},
	alcohol: {
		scope: {
			type: String,
			enum: ['<0.5%', '±0.5%', '±1.0%'],
		},
	},
	filtration: Boolean,
	pasteurization: Boolean,
	aged: {
		type: [agedSchema],
		default: undefined,
	},
	style: {
		type: [langValue],
		default: undefined,
	},
	dryHopped: {
		hops: {
			type: [{
				type: Schema.Types.ObjectId,
				ref: 'Ingredient',
			}],
			default: undefined,
		},
	},
}, { _id: false });

const impressionsSchema = new Schema({
	color: String,
	clarity: {
		type: String,
		enum: ['crystalline', 'clear', 'opalescent', 'misty', 'hazy', 'muddy'],
	},
}, { _id: false });

const editorialSchema = new Schema({
	general: generalSchema,
	brewing: brewingSchema,
	impressions: impressionsSchema,
	price: {
		type: [priceSchema],
		default: undefined,
	},
	images: Int32,
	cap: Boolean,
	notes: String,
}, { _id: false });

module.exports = editorialSchema;
