import mongoose from 'mongoose';

import { langValue } from 'models/common';

const locationSchema = mongoose.Schema({
	type: {
		type: String,
		enum: ['Point'],
	},
	coordinates: [mongoose.Schema.Types.Decimal128],
}, { _id: false });

const placeSchema = new mongoose.Schema({
	city: [langValue],
	country: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Country',
		required: true,
	},
	institution: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Institution',
		required: true,
	},
	location: locationSchema,
	shortId: {
		type: String,
		required: true,
	},
});

placeSchema.index({ shortId: 1 }, { unique: true });

export default mongoose.model('Place', placeSchema);
