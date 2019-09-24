const mongoose = require('mongoose');

const { Schema } = mongoose;

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

module.exports = priceSchema;
