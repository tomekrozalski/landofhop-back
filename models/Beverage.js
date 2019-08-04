const mongoose = require('mongoose');
const langValue = require('./utils/langValueSchema');

const { Schema } = mongoose;

const beverageSchema = new Schema({
	shortId: {
		type: String,
		required: true,
	},
	badge: {
		type: String,
		required: true,
	},
	label: {
		general: {
			name: [langValue],
			series: [langValue],
			brand: {
				type: Schema.Types.ObjectId,
				ref: 'Institution',
				required: true,
			},
			cooperation: [{
				type: Schema.Types.ObjectId,
				ref: 'Institution',
			}],
			contract: {
				type: Schema.Types.ObjectId,
				ref: 'Institution',
			},
			place: {
				type: Schema.Types.ObjectId,
				ref: 'Place',
			},
			tale: [langValue],
			barcode: String,
		},
		brewing: {
			fermentation: [{
				type: String,
				enum: ['top', 'bottom', 'spontaneous'],
			}],
			extract: {
				relate: {
					type: String,
					enum: ['weight', 'blg', 'plato'],
					required: true,
				},
				unit: {
					type: String,
					enum: ['percent', 'degree'],
					required: true,
				},
				value: {
					type: Schema.Types.Decimal128,
					required: true,
				},
			},
			alcohol: {
				relate: {
					type: String,
					enum: ['capacity', 'abv'],
					required: true,
				},
				unit: {
					type: String,
					enum: ['percent', 'degree'],
					required: true,
				},
				value: {
					type: Schema.Types.Decimal128,
					required: true,
				},
				scope: {
					type: String,
					enum: ['<0.5%', '±0.5%', '±1.0%'],
				},
			},
			filtration: Boolean,
			pasteurization: Boolean,
			aged: [{
				type: {
					type: String,
					enum: ['barrel', 'wood'],
				},
				wood: String,
				time: {
					value: {
						type: Number,
						required: true,
					},
					unit: {
						type: String,
						enum: ['day', 'month', 'year'],
						required: true,
					},
				},
				previousContent: [String],
			}],
			style: [langValue],
			dryHopped: {
				hops: [{
					type: Schema.Types.ObjectId,
					ref: 'Ingredient',
				}],
			},
			expirationDate: {
				value: {
					type: Number,
					required: true,
				},
				unit: {
					type: String,
					enum: ['day', 'month', 'year'],
					required: true,
				},
			},
		},
		ingredients: {
			description: [{
				complete: {
					type: Boolean,
					required: true,
				},
				language: {
					type: String,
					required: false,
				},
				value: {
					type: String,
					required: true,
				},
			}],
			list: [{
				type: Schema.Types.ObjectId,
				ref: 'Ingredient',
			}],
			smokedMalt: Boolean,
		},
		impressions: {
			bitterness: Number,
			sweetness: Number,
			fullness: Number,
			power: Number,
			hoppyness: Number,
			temperature: {
				from: {
					type: Number,
					required: true,
				},
				to: {
					type: Number,
					required: true,
				},
				unit: {
					type: String,
					enum: ['celcius'],
					required: true,
				},
			},
		},
		container: {
			color: {
				type: String,
				enum: ['brown', 'green', 'black', 'silver'],
				required: true,
			},
			material: {
				type: String,
				enum: ['glass', 'aluminum'],
				required: true,
			},
			unit: {
				type: String,
				enum: ['ml'],
				required: true,
			},
			type: {
				type: String,
				enum: ['bottle', 'can'],
				required: true,
			},
			value: {
				type: Number,
				required: true,
			},
			hasCapWireFlip: Boolean,
		},
		price: [{
			date: {
				type: Date,
				required: true,
			},
			value: {
				type: Schema.Types.Decimal128,
				required: true,
			},
			currency: {
				type: String,
				enum: ['PLN', 'EUR'],
				required: true,
			},
		}],
	},
	producer: {
		general: {
			series: [langValue],
			brand: {
				type: Schema.Types.ObjectId,
				ref: 'Institution',
				required: true,
			},
			cooperation: [{
				type: Schema.Types.ObjectId,
				ref: 'Institution',
			}],
			contract: {
				type: Schema.Types.ObjectId,
				ref: 'Institution',
			},
			place: {
				type: Schema.Types.ObjectId,
				ref: 'Place',
			},
			tale: [langValue],
		},
		brewing: {
			fermentation: [{
				type: String,
				enum: ['top', 'bottom', 'spontaneous'],
			}],
			extract: {
				relate: {
					type: String,
					enum: ['weight', 'blg', 'plato'],
					required: true,
				},
				unit: {
					type: String,
					enum: ['percent', 'degree'],
					required: true,
				},
				value: {
					type: Schema.Types.Decimal128,
					required: true,
				},
			},
			alcohol: {
				relate: {
					type: String,
					enum: ['capacity', 'abv'],
					required: true,
				},
				unit: {
					type: String,
					enum: ['percent', 'degree'],
					required: true,
				},
				value: {
					type: Schema.Types.Decimal128,
					required: true,
				},
				scope: {
					type: String,
					enum: ['<0.5%', '±0.5%', '±1.0%'],
				},
			},
			filtration: Boolean,
			pasteurization: Boolean,
			aged: [{
				type: {
					type: String,
					enum: ['barrel', 'wood'],
				},
				wood: String,
				time: {
					value: {
						type: Number,
						required: true,
					},
					unit: {
						type: String,
						enum: ['day', 'month', 'year'],
						required: true,
					},
				},
				previousContent: [String],
			}],
			style: [langValue],
			dryHopped: {
				hops: [{
					type: Schema.Types.ObjectId,
					ref: 'Ingredient',
				}],
			},
			expirationDate: {
				value: {
					type: Number,
					required: true,
				},
				unit: {
					type: String,
					enum: ['day', 'month', 'year'],
					required: true,
				},
			},
		},
		ingredients: {
			description: [{
				complete: {
					type: Boolean,
					required: true,
				},
				language: {
					type: String,
					required: false,
				},
				value: {
					type: String,
					required: true,
				},
			}],
			list: [{
				type: Schema.Types.ObjectId,
				ref: 'Ingredient',
			}],
			smokedMalt: Boolean,
		},
		impressions: {
			bitterness: Number,
			sweetness: Number,
			fullness: Number,
			power: Number,
			hoppyness: Number,
			temperature: {
				from: {
					type: Number,
					required: true,
				},
				to: {
					type: Number,
					required: true,
				},
				unit: {
					type: String,
					enum: ['celcius'],
					required: true,
				},
			},
		},
		price: [{
			date: {
				type: Date,
				required: true,
			},
			value: {
				type: Schema.Types.Decimal128,
				required: true,
			},
			currency: {
				type: String,
				enum: ['PLN', 'EUR'],
				required: true,
			},
		}],
	},
	editorial: {
		general: {
			cooperation: [{
				type: Schema.Types.ObjectId,
				ref: 'Institution',
			}],
			contract: {
				type: Schema.Types.ObjectId,
				ref: 'Institution',
			},
			place: {
				type: Schema.Types.ObjectId,
				ref: 'Place',
			},
		},
		brewing: {
			fermentation: [{
				type: String,
				enum: ['top', 'bottom', 'spontaneous'],
			}],
			alcohol: {
				scope: {
					type: String,
					enum: ['<0.5%', '±0.5%', '±1.0%'],
				},
			},
			filtration: Boolean,
			pasteurization: Boolean,
			aged: [{
				type: {
					type: String,
					enum: ['barrel', 'wood'],
				},
				wood: String,
				time: {
					value: {
						type: Number,
						required: true,
					},
					unit: {
						type: String,
						enum: ['day', 'month', 'year'],
						required: true,
					},
				},
				previousContent: [String],
			}],
			style: [langValue],
			dryHopped: {
				hops: [{
					type: Schema.Types.ObjectId,
					ref: 'Ingredient',
				}],
			},
		},
		impressions: {
			color: String,
			clarity: {
				type: String,
				enum: ['crystalline', 'clear', 'opalescent', 'misty', 'hazy', 'muddy'],
			},
		},
		price: [{
			date: {
				type: Date,
				required: true,
			},
			value: {
				type: Number,
				required: true,
			},
			currency: {
				type: String,
				enum: ['PLN', 'EUR'],
				required: true,
			},
		}],
		images: Number,
		cap: Boolean,
		notes: String,
	},
	added: {
		type: Date,
		required: true,
	},
	updated: Date,
});

module.exports = mongoose.model('Beverage', beverageSchema);
