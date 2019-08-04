const mongoose = require('mongoose');
const name = require('./utils/langValueSchema');

const Schema = mongoose.Schema;

const countrySchema = new Schema({
	code: {
		type: String,
		required: false,
	},
	name: [name]
});

module.exports = mongoose.model('Country', countrySchema);
