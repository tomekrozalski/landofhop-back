const mongoose = require('mongoose');
const name = require('./utils/langValueSchema');

const { Schema } = mongoose;

const institutionSchema = new Schema({
	badge: {
		type: String,
		required: true,
	},
	name: [name],
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
