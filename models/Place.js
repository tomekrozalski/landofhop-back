const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const citySchema = new Schema({
	language: {
		type: String,
		required: false,
	},
	value: {
		type: String,
		required: true,
	},
}, { _id : false });

const locationSchema = mongoose.Schema({
	type: {
		type: String,
		enum: ['Point'],
	},
	coordinates: [mongoose.Decimal128],
}, { _id : false });

const placeSchema = new Schema({
	city: [citySchema],
	country: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	institution: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	location: locationSchema,
	shortId: {
		type: String,
		required: true,
	}
});

module.exports = mongoose.model('Place', placeSchema);
