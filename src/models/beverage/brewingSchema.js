import mongoose from 'mongoose';
import Int32 from 'mongoose-int32';

import { langValue } from 'models/common';
import agedSchema from './agedSchema';

const brewingSchema = new mongoose.Schema({
	fermentation: {
		type: [{
			type: String,
			enum: ['top', 'bottom', 'spontaneous'],
		}],
		default: undefined,
	},
	extract: {
		relate: {
			type: String,
			enum: ['weight', 'blg', 'plato'],
			required() {
				return this.extract.unit || this.extract.value;
			},
		},
		unit: {
			type: String,
			enum: ['percent', 'degree'],
			required() {
				return this.extract.relate || this.extract.value;
			},
		},
		value: {
			type: mongoose.Schema.Types.Decimal128,
			min: 0,
			max: 100,
			required() {
				return this.extract.relate || this.extract.unit;
			},
		},
	},
	alcohol: {
		relate: {
			type: String,
			enum: ['capacity', 'abv'],
			required() {
				return this.alcohol.unit || this.alcohol.value;
			},
		},
		unit: {
			type: String,
			enum: ['percent', 'degree'],
			required() {
				return this.alcohol.relate || this.alcohol.value;
			},
		},
		value: {
			type: mongoose.Schema.Types.Decimal128,
			min: 0,
			max: 100,
			required() {
				return this.alcohol.relate || this.alcohol.unit;
			},
		},
		scope: {
			type: String,
			enum: ['<0.5%', '±0.5%', '±1.0%'],
		},
	},
	filtration: Boolean,
	pasteurization: Boolean,
	aged: {
		type: [agedSchema],
		default: undefined,
	},
	style: {
		type: [langValue],
		default: undefined,
	},
	isDryHopped: Boolean,
	dryHopped: {
		hops: {
			type: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Ingredients',
			}],
			default: undefined,
		},
	},
	expirationDate: {
		value: {
			type: Int32,
			min: 0,
			max: 10000,
			required() {
				return this.expirationDate.unit;
			},
		},
		unit: {
			type: String,
			enum: ['day', 'month', 'year'],
			required() {
				return this.expirationDate.value;
			},
		},
	},
}, { _id: false });

export default brewingSchema;
