import mongoose from 'mongoose';

import { langValue } from 'models/common';

const countrySchema = new mongoose.Schema({
	code: {
		type: String,
		required: true,
	},
	name: {
		type: [langValue],
		required: true,
	},
});

countrySchema.index({ code: 1 }, { unique: true });

export default mongoose.model('Country', countrySchema);
