const mongoose = require('mongoose');
const name = require('./utils/langValueSchema');

const { Schema } = mongoose;

const locationSchema = mongoose.Schema({
	type: {
		type: String,
		enum: ['Point'],
	},
	coordinates: [mongoose.Decimal128],
}, { _id: false });

const placeSchema = new Schema({
	city: [name],
	country: {
		type: Schema.Types.ObjectId,
		ref: 'Country',
		required: true,
	},
	institution: {
		type: Schema.Types.ObjectId,
		ref: 'Institution',
		required: true,
	},
	location: locationSchema,
	shortId: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Place', placeSchema);
