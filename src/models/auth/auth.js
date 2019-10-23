import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model('User', userSchema);
