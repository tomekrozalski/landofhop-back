const mongodb = require('mongodb');
const isBoolean = require('lodash/isBoolean');
const isNumber = require('lodash/isNumber');

const Decimal128 = mongodb.Decimal128;
const ObjectId = mongodb.ObjectId;

const beverage = ({
	added,
	aged,
	alcohol,
	areIngredientsComplete,
	badge,
	barcode,
	bitterness,
	brand,
	clarity,
	color,
	container,
	contract,
	cooperation,
	dryHopped,
	expirationDate,
	extract,
	fermentation,
	filtration,
	fullness,
	hoppyness,
	ingredients,
	ingredientsList,
	name,
	pasteurization,
	placeOfProduction,
	power,
	price,
	refermentation,
	series,
	smokedMalt,
	style,
	sweetness,
	tale,
	temperature,
	updated,
}) => ({
	badge,
	label: {
		name,
		...(series && { series }),
		brand: ObjectId(brand),
		...(cooperation && { cooperation: cooperation.map(item => ObjectId(item)) }),
		...(contract && { contract: ObjectId(contract) }),
		...(placeOfProduction && { placeOfProduction: ObjectId(placeOfProduction) }),
		...(fermentation && { fermentation }),
		...(style && { style }),
		...(extract && {
			extract: {
				...extract,
				value: Decimal128.fromString(extract.value.toString()),
			}
		}),
		...(alcohol && {
			alcohol: {
				...alcohol,
				value: Decimal128.fromString(alcohol.value.toString()),
			}
		}),
		...(isBoolean(filtration) && { filtration }),
		...(isBoolean(pasteurization) && { pasteurization }),
		...(isBoolean(refermentation) && { refermentation }),
		...(aged && { aged }),
		...(tale && { tale }),
		...(ingredients && { ingredients }),
		...(ingredientsList && { ingredientsList: ingredientsList.map(item => ObjectId(item)) }),
		...(isBoolean(areIngredientsComplete) && { areIngredientsComplete }),
		...(isBoolean(smokedMalt) && { smokedMalt }),
		...(isBoolean(dryHopped) && { dryHopped }),
		...((isNumber(bitterness) ||
			isNumber(sweetness) || 
			isNumber(fullness) || 
			isNumber(power) || 
			isNumber(hoppyness) ||
			temperature) && {
				impressions: {
					...(isNumber(bitterness) && { bitterness: Decimal128.fromString(bitterness.toString()) }),
					...(isNumber(sweetness) && { sweetness: Decimal128.fromString(sweetness.toString()) }),
					...(isNumber(fullness) && { fullness: Decimal128.fromString(fullness.toString()) }),
					...(isNumber(power) && { power: Decimal128.fromString(power.toString()) }),
					...(isNumber(hoppyness) && { hoppyness: Decimal128.fromString(hoppyness.toString()) }),
					...(temperature && {
						temperature: {
							from: Decimal128.fromString(temperature.from.toString()),
							to: Decimal128.fromString(temperature.to.toString()),
							unit: temperature.unit,
						}
					})
				}
			}
		),
		...(expirationDate && { expirationDate: {
			value: Decimal128.fromString(expirationDate.value.toString()),
			unit: expirationDate.unit,
		}}),
		...(barcode && { barcode }),
	},
	container: {
		...container,
		value: Decimal128.fromString(container.value.toString())
	},
	...(price && {
		price: price.map(({ currency, date, value }) => ({
			currency,
			date: new Date(date),
			value: Decimal128.fromString(value.toString())
		}))
	}),
	...((color || clarity) && {
		impressions: {
			...(color && { color }),
			...(clarity && { clarity }),
		}
	}),
	added: added ? new Date(added) : new Date(),
	...(updated && { updated: new Date(updated) }),
});

module.exports = beverage;
