const mongoose = require('mongoose');
const langValue = require('./fragments/langValueSchema');

const { Schema } = mongoose;

const countrySchema = new Schema({
	code: {
		type: String,
		required: false,
	},
	name: [langValue],
});

module.exports = mongoose.model('Country', countrySchema);
