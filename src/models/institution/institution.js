import mongoose from 'mongoose';

import { langValue } from 'models/common';

const institutionSchema = new mongoose.Schema({
	badge: {
		type: String,
		required: true,
	},
	name: {
		type: [langValue],
		required: true,
	},
	shortId: {
		type: String,
		required: true,
	},
	website: String,
	consortium: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Institution',
	},
});

institutionSchema.index({ badge: 1, shortId: 1 }, { unique: true });

export default mongoose.model('Institution', institutionSchema);
