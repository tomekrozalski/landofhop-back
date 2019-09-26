import mongoose from 'mongoose';
import Int32 from 'mongoose-int32';

const agedSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ['barrel', 'wood'],
	},
	wood: String,
	time: {
		value: {
			type: Int32,
			min: 0,
			max: 10000,
		},
		unit: {
			type: String,
			enum: ['day', 'month', 'year'],
		},
	},
	previousContent: {
		type: [String],
		default: undefined,
	},
}, { _id: false });

export default agedSchema;
