const mongoose = require('mongoose');
const Int32 = require('mongoose-int32');
const langValue = require('./langValueSchema');

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

const brewingSchema = new Schema({
	fermentation: {
		type: [{
			type: String,
			enum: ['top', 'bottom', 'spontaneous'],
		}],
		default: undefined,
	},
	extract: {
		relate: {
			type: String,
			enum: ['weight', 'blg', 'plato'],
			required() {
				return this.extract.unit || this.extract.value;
			},
		},
		unit: {
			type: String,
			enum: ['percent', 'degree'],
			required() {
				return this.extract.relate || this.extract.value;
			},
		},
		value: {
			type: Schema.Types.Decimal128,
			min: 0,
			max: 100,
			required() {
				return this.extract.relate || this.extract.unit;
			},
		},
	},
	alcohol: {
		relate: {
			type: String,
			enum: ['capacity', 'abv'],
			required() {
				return this.alcohol.unit || this.alcohol.value;
			},
		},
		unit: {
			type: String,
			enum: ['percent', 'degree'],
			required() {
				return this.alcohol.relate || this.alcohol.value;
			},
		},
		value: {
			type: Schema.Types.Decimal128,
			min: 0,
			max: 100,
			required() {
				return this.alcohol.relate || this.alcohol.unit;
			},
		},
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
			value: {
				type: Int32,
				min: 0,
				max: 10000,
			},
			unit: {
				type: String,
				enum: ['day', 'month', 'year'],
			},
		},
		previousContent: {
			type: [String],
			default: undefined,
		},
	}],
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
	expirationDate: {
		value: {
			type: Int32,
			min: 0,
			max: 10000,
			required() {
				return this.expirationDate.unit;
			},
		},
		unit: {
			type: String,
			enum: ['day', 'month', 'year'],
			required() {
				return this.expirationDate.value;
			},
		},
	},
}, { _id: false });

const ingredientsSchema = new Schema({
	description: {
		type: [{
			complete: Boolean,
			language: String,
			value: String,
		}],
		default: undefined,
	},
	list: {
		type: [{
			type: Schema.Types.ObjectId,
			ref: 'Ingredient',
		}],
		default: undefined,
	},
	smokedMalt: Boolean,
}, { _id: false });

const impressionsSchema = new Schema({
	bitterness: {
		type: Int32,
		min: 0,
		max: 100,
	},
	sweetness: {
		type: Int32,
		min: 0,
		max: 100,
	},
	fullness: {
		type: Int32,
		min: 0,
		max: 100,
	},
	power: {
		type: Int32,
		min: 0,
		max: 100,
	},
	hoppyness: {
		type: Int32,
		min: 0,
		max: 100,
	},
	temperature: {
		from: {
			type: Int32,
			min: 0,
			max: 100,
		},
		to: {
			type: Int32,
			min: 0,
			max: 100,
		},
		unit: {
			type: String,
			enum: ['celcius'],
		},
	},
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

const priceSchema = new Schema({
	date: {
		type: Date,
	},
	value: {
		type: Schema.Types.Decimal128,
		min: 0,
		max: 100000,
	},
	currency: {
		type: String,
		enum: ['PLN', 'EUR'],
	},
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
