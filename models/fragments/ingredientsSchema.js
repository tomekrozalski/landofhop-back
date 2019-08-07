const mongoose = require('mongoose');

const { Schema } = mongoose;

const ingredientsSchema = new Schema({
	description: {
		type: [{
			complete: Boolean,
			language: String,
			value: String,
		}],
		default: undefined,
	},
	list: {
		type: [{
			type: Schema.Types.ObjectId,
			ref: 'Ingredient',
		}],
		default: undefined,
	},
	smokedMalt: Boolean,
}, { _id: false });

module.exports = ingredientsSchema;
