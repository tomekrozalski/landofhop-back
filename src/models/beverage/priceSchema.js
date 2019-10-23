import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema({
	date: {
		type: Date,
	},
	value: {
		type: mongoose.Schema.Types.Decimal128,
		min: 0,
		max: 100000,
	},
	currency: {
		type: String,
		enum: ['PLN', 'EUR'],
	},
}, { _id: false });

export default priceSchema;
