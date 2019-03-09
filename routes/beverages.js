const Router = require('express').Router;
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const nanoid = require('nanoid');
const get = require('lodash/get');
const isBoolean = require('lodash/isBoolean');
const isEqual = require('lodash/isEqual');
const isNumber = require('lodash/isNumber');
const isEmpty = require('lodash/isEmpty');
const set = require('lodash/set');

const db = require('../db');
const verifyToken = require('../utils/verifyToken');

const router = Router();
const Decimal128 = mongodb.Decimal128;
const ObjectId = mongodb.ObjectId;

router.get('/list', (req, res) => {
	const beverages = [];

	db.getDb()
		.db()
		.collection('beverages')
		.aggregate([
			{
				$project: {
					_id: 0,
					badge: 1,
					label: {
						brand: 1,
						name: 1,
					},
					id: '$_id',
					'short_id': 1,
				}
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'label.brand',
					foreignField: '_id',
					as: 'label.brand_info'
				}
			},
			{
				$unwind: '$label.brand_info'
			},
			{
				$project: {
					badge: 1,
					label: {

						brand: 0,
						brand: {
							badge: '$label.brand_info.badge',
							name: '$label.brand_info.name'
						},
						name: 1,
					},
					id: 1,
					'short_id': 1,
				}
			},
		])
		.forEach((beverage) => {
			beverages.push(beverage);
		})
		.then((result) => {
			res
				.status(200)
				.json(beverages);
		})
		.catch((err) => {
			res
				.status(500)
				.json({ message: 'An error occured' });
		});
});

router.get('/details/:short_id/:brand/:badge', (req, res) => {
	const beverages = [];

	db.getDb()
		.db()
		.collection('beverages')
		.aggregate([
			{
				$project: {
					_id: 0,
					added: 1,
					badge: 1,
					container: 1,
					id: '$_id',
					impressions: 1,
					label: 1,
					price: 1,
					'short_id': 1,
					updated: 1,
				}
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'label.brand',
					foreignField: '_id',
					as: 'brand_info'
				}
			},
			{
				$unwind: '$brand_info'
			},
			{
				$match: {
					badge: req.params.badge,
					'brand_info.badge': req.params.brand,
					short_id: req.params.short_id,
				}
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'label.contract',
					foreignField: '_id',
					as: 'brand_contract'
				}
			},
			{
				$unwind: {
					path: '$brand_contract',
					preserveNullAndEmptyArrays: true,
				}
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'label.cooperation',
					foreignField: '_id',
					as: 'brand_cooperation'
				}
			},
			{
				$lookup: {
					from: 'places',
					localField: 'label.placeOfProduction',
					foreignField: '_id',
					as: 'place'
				}
			},
			{
				$unwind: {
					path: '$place',
					preserveNullAndEmptyArrays: true,
				}
			},
			{
				$lookup: {
					from: 'countries',
					localField: 'place.country',
					foreignField: '_id',
					as: 'place.country'
				}
			},
			{
				$unwind: {
					path: '$place.country',
					preserveNullAndEmptyArrays: true,
				}
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'place.institution',
					foreignField: '_id',
					as: 'place.institution'
				}
			},
			{
				$unwind: {
					path: '$place.institution',
					preserveNullAndEmptyArrays: true,
				}
			},
			{
				$lookup: {
					from: 'ingredients',
					localField: 'label.ingredientsList',
					foreignField: '_id',
					as: 'rawIngredientsList'
				}
			},
			{
				$project: {
					added: 1,
					badge: 1,
					container: 1,
					id: 1,
					impressions: 1,
					label: {
						name: 1,
						series: 1,
						brand: {
							id: '$brand_info._id',
							short_id: '$brand_info.short_id',
							badge: '$brand_info.badge',
							name: '$brand_info.name',
							consortium: '$brand_info.consortium',
							website: '$brand_info.website',
						},
						cooperation: {
							$map: { 
								input: '$brand_cooperation', 
								as: 'coop', 
								in: {
									id: '$$coop._id',
									short_id: '$$coop.short_id',
									badge: '$$coop.badge',
									name: '$$coop.name',
									consortium: '$$coop.consortium',
									website: '$$coop.website',
								}
							}
						},
						contract: {
							id: '$brand_contract._id',
							short_id: '$brand_contract.short_id',
							badge: '$brand_contract.badge',
							name: '$brand_contract.name',
							consortium: '$brand_contract.consortium',
							website: '$brand_contract.website',
						},
						place: {
							id: '$place._id',
							city: '$place.city',
							country: {
								id: '$place.country._id',
								code: '$place.country.code',
								name: '$place.country.name',
							},
							institution: {
								id: '$place.institution._id',
								short_id: '$place.institution.short_id',
								badge: '$place.institution.badge',
								name: '$place.institution.name',
								consortium: '$place.institution.consortium',
								website: '$place.institution.website',
							},
							short_id: '$place.short_id',
							coordinates: '$place.location.coordinates',
						},
						fermentation: 1,
						style: 1,
						extract: 1,
						alcohol: 1,
						filtration: 1,
						pasteurization: 1,
						refermentation: 1,
						aged: 1,
						tale: 1,
						ingredients: 1,
						ingredientsList: {
							$map: { 
								input: '$rawIngredientsList', 
								as: 'ingredient', 
								in: {
									id: '$$ingredient._id',
									badge: '$$ingredient.badge',
									name: '$$ingredient.name',
									type: '$$ingredient.type',
								}
							}
						},
						areIngredientsComplete: 1,
						smokedMalt: 1,
						dryHopped: 1,
						impressions: 1,
						expirationDate: 1,
						barcode: 1,
					},
					price: 1,
					'short_id': 1,
					updated: 1,
				}
			},
	

		])
		.forEach((beverage) => {
			if (isEmpty(beverage.label.cooperation)) {
				delete beverage.label.cooperation;
			}

			if (isEmpty(beverage.label.contract)) {
				delete beverage.label.contract;
			}

			const coordinates = get(beverage, 'label.place.coordinates');

			if (coordinates) {
				const formattedCoordinates = coordinates.map(item => Number(item.toString()));
				set(beverage, 'label.place.coordinates', formattedCoordinates);
			}

			const place = get(beverage, 'label.place');
			const emptyPlace = {
				country: {},
				institution: {},
			};

			if (place && isEqual(place, emptyPlace)) {
				delete beverage.label.place;
			}

			const extractValue = get(beverage, 'label.extract.value');

			if (extractValue) {
				const formattedExtractValue = Number(extractValue.toString());
				set(beverage, 'label.extract.value', formattedExtractValue);
			}

			const alcoholValue = get(beverage, 'label.alcohol.value');

			if (alcoholValue) {
				const formattedAlcoholValue = Number(alcoholValue.toString());
				set(beverage, 'label.alcohol.value', formattedAlcoholValue);
			}

			if (isEmpty(beverage.label.ingredientsList)) {
				delete beverage.label.ingredientsList;
			}

			const bitterness = get(beverage, 'label.impressions.bitterness');
			const sweetness = get(beverage, 'label.impressions.sweetness');
			const fullness = get(beverage, 'label.impressions.fullness');
			const power = get(beverage, 'label.impressions.power');
			const hoppyness = get(beverage, 'label.impressions.hoppyness');

			if (bitterness) {
				const formatted = Number(bitterness.toString());
				set(beverage, 'label.impressions.bitterness', formatted);
			}

			if (sweetness) {
				const formatted = Number(sweetness.toString());
				set(beverage, 'label.impressions.sweetness', formatted);
			}

			if (fullness) {
				const formatted = Number(fullness.toString());
				set(beverage, 'label.impressions.fullness', formatted);
			}

			if (power) {
				const formatted = Number(power.toString());
				set(beverage, 'label.impressions.power', formatted);
			}

			if (hoppyness) {
				const formatted = Number(hoppyness.toString());
				set(beverage, 'label.impressions.hoppyness', formatted);
			}

			const temperature = get(beverage, 'label.impressions.temperature');

			if (temperature) {
				const from = Number(temperature.from.toString());
				set(beverage, 'label.impressions.temperature.from', from);

				const to = Number(temperature.to.toString());
				set(beverage, 'label.impressions.temperature.to', to);
			}

			const expirationDateValue = get(beverage, 'label.expirationDate.value');
		
			if (expirationDateValue) {
				const formatted = Number(expirationDateValue.toString());
				set(beverage, 'label.expirationDate.value', formatted);
			}

			const formattedContainerValue = Number(beverage.container.value.toString());
			set(beverage, 'container.value', formattedContainerValue);
		
			const price = get(beverage, 'price');

			if (price) {
				const formattedPrice = price.map((item) => ({
					...item,
					value: Number(item.value.toString())
				}));

				set(beverage, 'price', formattedPrice);
			}

			beverages.push(beverage);
		})
		.then((result) => {
			res
				.status(200)
				.json(beverages);
		})
		.catch((err) => {
			res
				.status(500)
				.json({ message: 'An error occured' });
		});
});

router.post('/', verifyToken, (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
		if (err) {
			res.sendStatus(403);
		} else {

			const {
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
			} = req.body;
		
			const newBeverage = {
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
				short_id: nanoid(6),
			};

			db.getDb()
				.db()
				.collection('beverages')
				.insertOne(newBeverage)
				.then((result) => {
					res
						.status(200)
						.json(result);
				})
				.catch((err) => {
					console.log('err', err);
					res
						.status(500)
						.json({ message: 'An error occured' });
				});
		}
	});
});

module.exports = router;
