import mongoose from 'mongoose';
import Int32 from 'mongoose-int32';

const impressionsSchema = new mongoose.Schema({
	bitterness: {
		type: Int32,
		min: 0,
		max: 100,
	},
	sweetness: {
		type: Int32,
		min: 0,
		max: 100,
	},
	fullness: {
		type: Int32,
		min: 0,
		max: 100,
	},
	power: {
		type: Int32,
		min: 0,
		max: 100,
	},
	hoppyness: {
		type: Int32,
		min: 0,
		max: 100,
	},
	temperature: {
		from: {
			type: Int32,
			min: 0,
			max: 100,
		},
		to: {
			type: Int32,
			min: 0,
			max: 100,
		},
		unit: {
			type: String,
			enum: ['celcius'],
		},
	},
}, { _id: false });

export default impressionsSchema;
