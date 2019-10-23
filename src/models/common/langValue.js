import mongoose from 'mongoose';

export default new mongoose.Schema({
	language: {
		type: String,
		required: false,
	},
	value: {
		type: String,
		required: true,
	},
}, { _id: false });
