import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
	code: {
		type: String,
		required: false,
	},
	name: [{
		language: {
			type: String,
			required: false,
		},
		value: {
			type: String,
			required: true,
		},
	}],
});

export default mongoose.model('Country', countrySchema);
