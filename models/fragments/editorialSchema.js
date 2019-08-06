const mongoose = require('mongoose');
const Int32 = require('mongoose-int32');
const langValue = require('./langValueSchema');

const { Schema } = mongoose;

const editorialSchema = new Schema({
	general: {
		cooperation: [{
			type: Schema.Types.ObjectId,
			ref: 'Institution',
		}],
		contract: {
			type: Schema.Types.ObjectId,
			ref: 'Institution',
		},
		place: {
			type: Schema.Types.ObjectId,
			ref: 'Place',
		},
	},
	brewing: {
		fermentation: [{
			type: String,
			enum: ['top', 'bottom', 'spontaneous'],
		}],
		alcohol: {
			scope: {
				type: String,
				enum: ['<0.5%', '±0.5%', '±1.0%'],
			},
		},
		filtration: Boolean,
		pasteurization: Boolean,
		aged: [{
			type: {
				type: String,
				enum: ['barrel', 'wood'],
			},
			wood: String,
			time: {
				value: Int32,
				unit: {
					type: String,
					enum: ['day', 'month', 'year'],
				},
			},
			previousContent: [String],
		}],
		style: [langValue],
		dryHopped: {
			hops: [{
				type: Schema.Types.ObjectId,
				ref: 'Ingredient',
			}],
		},
	},
	impressions: {
		color: String,
		clarity: {
			type: String,
			enum: ['crystalline', 'clear', 'opalescent', 'misty', 'hazy', 'muddy'],
		},
	},
	price: [{
		date: Date,
		value: Schema.Types.Decimal128,
		currency: {
			type: String,
			enum: ['PLN', 'EUR'],
		},
	}],
	images: Int32,
	cap: Boolean,
	notes: String,
}, { _id: false });

module.exports = editorialSchema;
