import mongoose from 'mongoose';

import { langValue } from 'utils/models';

const ingredientSchema = new mongoose.Schema({
	badge: {
		type: String,
		required: true,
	},
	name: {
		type: [langValue],
		required: true,
	},
	type: {
		type: String,
		enum: ['malt', 'hop', 'yeast', 'appendix'],
		required: true,
	},
});

export default mongoose.model('Ingredient', ingredientSchema);
