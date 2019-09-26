import mongoose from 'mongoose';

const langValueCompleteSchema = new mongoose.Schema({
	complete: Boolean,
	language: String,
	value: String,
}, { _id: false });

const ingredientsSchema = new mongoose.Schema({
	description: {
		type: [langValueCompleteSchema],
		default: undefined,
	},
	list: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
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

export default ingredientsSchema;
