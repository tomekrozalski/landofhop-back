const mongoose = require('mongoose');
const Int32 = require('mongoose-int32');

const { Schema } = mongoose;

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

module.exports = impressionsSchema;
