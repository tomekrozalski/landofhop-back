const mongoose = require('mongoose');
const Int32 = require('mongoose-int32');
const langValue = require('./langValueSchema');

const { Schema } = mongoose;

const producerSchema = new Schema({
	general: {
		series: [langValue],
		brand: {
			type: Schema.Types.ObjectId,
			ref: 'Institution',
		},
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
		tale: [langValue],
	},
	brewing: {
		fermentation: [{
			type: String,
			enum: ['top', 'bottom', 'spontaneous'],
		}],
		extract: {
			relate: {
				type: String,
				enum: ['weight', 'blg', 'plato'],
			},
			unit: {
				type: String,
				enum: ['percent', 'degree'],
			},
			value: Schema.Types.Decimal128,
		},
		alcohol: {
			relate: {
				type: String,
				enum: ['capacity', 'abv'],
			},
			unit: {
				type: String,
				enum: ['percent', 'degree'],
			},
			value: Schema.Types.Decimal128,
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
		expirationDate: {
			value: Int32,
			unit: {
				type: String,
				enum: ['day', 'month', 'year'],
			},
		},
	},
	ingredients: {
		description: [{
			complete: Boolean,
			language: String,
			value: String,
		}],
		list: [{
			type: Schema.Types.ObjectId,
			ref: 'Ingredient',
		}],
		smokedMalt: Boolean,
	},
	impressions: {
		bitterness: Int32,
		sweetness: Int32,
		fullness: Int32,
		power: Int32,
		hoppyness: Int32,
		temperature: {
			from: Int32,
			to: Int32,
			unit: {
				type: String,
				enum: ['celcius'],
			},
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
}, { _id: false });

module.exports = producerSchema;
