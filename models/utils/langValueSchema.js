const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const langValueSchema = new Schema({
	language: {
		type: String,
		required: false,
	},
	value: {
		type: String,
		required: true,
	},
}, { _id : false });

module.exports = langValueSchema;
