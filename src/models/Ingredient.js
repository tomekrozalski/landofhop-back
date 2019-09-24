const mongoose = require('mongoose');
const langValue = require('./fragments/langValueSchema');

const { Schema } = mongoose;

const ingredientSchema = new Schema({
	badge: {
		type: String,
		required: true,
	},
	name: [langValue],
	type: {
		type: String,
		enum: ['malt', 'hop', 'yeast', 'appendix'],
		required: true,
	},
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
