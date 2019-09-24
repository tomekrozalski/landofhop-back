import mongoose from 'mongoose';

import { langValue } from 'utils/models';

const countrySchema = new mongoose.Schema({
	code: {
		type: String,
		required: false,
	},
	name: [langValue],
});

export default mongoose.model('Country', countrySchema);
