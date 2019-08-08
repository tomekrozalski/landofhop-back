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
	smokedMalt: {
		type: Boolean,
		validate: {
			validator(v) {
				return v;
			},
			message: props => `${props.value} need to be true or be undefined`,
		},
	},
}, { _id: false });

module.exports = ingredientsSchema;
