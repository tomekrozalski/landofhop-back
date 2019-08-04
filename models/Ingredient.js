const mongoose = require('mongoose');
const name = require('./utils/langValueSchema');

const { Schema } = mongoose;

const ingredientSchema = new Schema({
	badge: {
		type: String,
		required: true,
	},
	name: [name],
	type: {
		type: String,
		enum: ['malt', 'hop', 'yeast', 'appendix'],
		required: true,
	},
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
