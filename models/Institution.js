const mongoose = require('mongoose');
const langValue = require('./fragments/langValueSchema');

const { Schema } = mongoose;

const institutionSchema = new Schema({
	badge: {
		type: String,
		required: true,
	},
	name: [langValue],
	shortId: {
		type: String,
		required: true,
	},
	website: String,
	consortium: {
		type: Schema.Types.ObjectId,
		ref: 'Institution',
	},
});

module.exports = mongoose.model('Institution', institutionSchema);
