const Router = require('express').Router;
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const nanoid = require('nanoid');
const get = require('lodash/get');
const isEqual = require('lodash/isEqual');
const isEmpty = require('lodash/isEmpty');
const set = require('lodash/set');

const db = require('../db');
const verifyToken = require('../utils/verifyToken');
const normalizeBeverageFromResponse = require('../normalizers/fromResponse/beverage');
const normalizeBeverageToRequest = require('../normalizers/toRequest/beverage');

const router = Router();
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
					added: 1,
					badge: 1,
					brand: '$label.general.brand',
					name: '$label.general.name',
					id: '$_id',
					'short_id': 1,
				}
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'brand',
					foreignField: '_id',
					as: 'brand_info'
				}
			},
			{
				$unwind: '$brand_info'
			},
			{
				$project: {
					added: 1,
					badge: 1,
					brand: {
						badge: '$brand_info.badge',
						name: '$brand_info.name'
					},
					name: 1,
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
			// ------------------------------------------------
			// General - brand, contract, cooperation
			{
				$lookup: {
					from: 'institutions',
					localField: 'label.general.brand',
					foreignField: '_id',
					as: 'label.general.brand_info'
				}
			},
			{
				$unwind: '$label.general.brand_info'
			},
			{
				$match: {
					badge: req.params.badge,
					'label.general.brand_info.badge': req.params.brand,
					short_id: req.params.short_id,
				}
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'label.general.contract',
					foreignField: '_id',
					as: 'label.general.contract_info'
				}
			},
			{
				$unwind: {
					path: '$label.general.contract_info',
					preserveNullAndEmptyArrays: true,
				}
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'label.general.cooperation',
					foreignField: '_id',
					as: 'label.general.cooperation_info'
				}
			},
			// ------------------------------------------------
			// General - place
			{
				$lookup: {
					from: 'places',
					localField: 'label.general.place',
					foreignField: '_id',
					as: 'label.general.place_info'
				}
			},
			{
				$unwind: {
					path: '$label.general.place_info',
					preserveNullAndEmptyArrays: true,
				}
			},
			{
				$lookup: {
					from: 'countries',
					localField: 'label.general.place_info.country',
					foreignField: '_id',
					as: 'label.general.place_info.country'
				}
			},
			{
				$unwind: {
					path: '$label.general.place_info.country',
					preserveNullAndEmptyArrays: true,
				}
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'label.general.place_info.institution',
					foreignField: '_id',
					as: 'label.general.place_info.institution'
				}
			},
			{
				$unwind: {
					path: '$label.general.place_info.institution',
					preserveNullAndEmptyArrays: true,
				}
			},
			// ------------------------------------------------
			// General - ingredients
			{
				$lookup: {
					from: 'ingredients',
					localField: 'label.ingredients.list',
					foreignField: '_id',
					as: 'label.ingredients.list_info'
				}
			},
			// ------------------------------------------------
			// Producer - contract, cooperation
			{
				$lookup: {
					from: 'institutions',
					localField: 'producer.general.contract',
					foreignField: '_id',
					as: 'producer.general.contract_info'
				}
			},
			{
				$unwind: {
					path: '$producer.general.contract_info',
					preserveNullAndEmptyArrays: true,
				}
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'producer.general.cooperation',
					foreignField: '_id',
					as: 'producer.general.cooperation_info'
				}
			},
			// ------------------------------------------------
			// Producer - place
			{
				$lookup: {
					from: 'places',
					localField: 'producer.general.place',
					foreignField: '_id',
					as: 'producer.general.place_info'
				}
			},
			{
				$unwind: {
					path: '$producer.general.place_info',
					preserveNullAndEmptyArrays: true,
				}
			},
			{
				$lookup: {
					from: 'countries',
					localField: 'producer.general.place_info.country',
					foreignField: '_id',
					as: 'producer.general.place_info.country'
				}
			},
			{
				$unwind: {
					path: '$producer.general.place_info.country',
					preserveNullAndEmptyArrays: true,
				}
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'producer.general.place_info.institution',
					foreignField: '_id',
					as: 'producer.general.place_info.institution'
				}
			},
			{
				$unwind: {
					path: '$producer.general.place_info.institution',
					preserveNullAndEmptyArrays: true,
				}
			},
			// ------------------------------------------------
			// Producer - ingredients
			{
				$lookup: {
					from: 'ingredients',
					localField: 'producer.ingredients.list',
					foreignField: '_id',
					as: 'producer.ingredients.list_info'
				}
			},
			// ------------------------------------------------
			// Editorial - contract, cooperation
			{
				$lookup: {
					from: 'institutions',
					localField: 'editorial.general.contract',
					foreignField: '_id',
					as: 'editorial.general.contract_info'
				}
			},
			{
				$unwind: {
					path: '$editorial.general.contract_info',
					preserveNullAndEmptyArrays: true,
				}
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'editorial.general.cooperation',
					foreignField: '_id',
					as: 'editorial.general.cooperation_info'
				}
			},
			// ------------------------------------------------
			// Editorial - place
			{
				$lookup: {
					from: 'places',
					localField: 'editorial.general.place',
					foreignField: '_id',
					as: 'editorial.general.place_info'
				}
			},
			{
				$unwind: {
					path: '$editorial.general.place_info',
					preserveNullAndEmptyArrays: true,
				}
			},
			{
				$lookup: {
					from: 'countries',
					localField: 'editorial.general.place_info.country',
					foreignField: '_id',
					as: 'editorial.general.place_info.country'
				}
			},
			{
				$unwind: {
					path: '$editorial.general.place_info.country',
					preserveNullAndEmptyArrays: true,
				}
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'editorial.general.place_info.institution',
					foreignField: '_id',
					as: 'editorial.general.place_info.institution'
				}
			},
			{
				$unwind: {
					path: '$editorial.general.place_info.institution',
					preserveNullAndEmptyArrays: true,
				}
			},
			// ------------------------------------------------
			{
				$project: {
					_id: 0,
					id: '$_id',
					'short_id': 1,
					badge: 1,
					label: {
						general: {
							name: 1,
							series: 1,
							brand: {
								id: '$label.general.brand_info._id',
								short_id: '$label.general.brand_info.short_id',
								badge: '$label.general.brand_info.badge',
								name: '$label.general.brand_info.name',
								consortium: '$label.general.brand_info.consortium',
								website: '$label.general.brand_info.website',
							},
							cooperation: {
								$map: {
									input: '$label.general.cooperation_info', 
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
								id: '$label.general.contract_info._id',
								short_id: '$label.general.contract_info.short_id',
								badge: '$label.general.contract_info.badge',
								name: '$label.general.contract_info.name',
								consortium: '$label.general.contract_info.consortium',
								website: '$label.general.contract_info.website',
							},
							place: {
								id: '$label.general.place_info._id',
								city: '$label.general.place_info.city',
								country: {
									id: '$label.general.place_info.country._id',
									code: '$label.general.place_info.country.code',
									name: '$label.general.place_info.country.name',
								},
								institution: {
									id: '$label.general.place_info.institution._id',
									short_id: '$label.general.place_info.institution.short_id',
									badge: '$label.general.place_info.institution.badge',
									name: '$label.general.place_info.institution.name',
									consortium: '$label.general.place_info.institution.consortium',
									website: '$label.general.place_info.institution.website',
								},
								short_id: '$label.general.place_info.short_id',
								coordinates: '$label.general.place_info.location.coordinates',
							},
							tale: 1,
							barcode: 1
						},
						brewing: {
							fermentation: 1,
							extract: 1,
							alcohol: 1,
							filtration: 1,
							pasteurization: 1,
							refermentation: 1,
							aged: 1,
							style: 1,
							dryHopped: 1,
							expirationDate: 1,
						},
						ingredients: {
							description: 1,
							list: {
								$map: { 
									input: '$label.ingredients.list_info', 
									as: 'ingredient', 
									in: {
										id: '$$ingredient._id',
										badge: '$$ingredient.badge',
										name: '$$ingredient.name',
										type: '$$ingredient.type',
									}
								}
							},
							complete: 1,
							smokedMalt: 1,
						},
						impressions: {
							bitterness: 1,
							sweetness: 1,
							fullness: 1,
							power: 1,
							hoppyness: 1,
							temperature: 1,
						},
						container: 1,
						price: 1,
					},
					producer: {
						general: {
							series: 1,
							cooperation: {
								$map: { 
									input: '$producer.general.cooperation_info', 
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
								id: '$producer.general.contract_info._id',
								short_id: '$producer.general.contract_info.short_id',
								badge: '$producer.general.contract_info.badge',
								name: '$producer.general.contract_info.name',
								consortium: '$producer.general.contract_info.consortium',
								website: '$producer.general.contract_info.website',
							},
							place: {
								id: '$producer.general.place_info._id',
								city: '$producer.general.place_info.city',
								country: {
									id: '$producer.general.place_info.country._id',
									code: '$producer.general.place_info.country.code',
									name: '$producer.general.place_info.country.name',
								},
								institution: {
									id: '$producer.general.place_info.institution._id',
									short_id: '$producer.general.place_info.institution.short_id',
									badge: '$producer.general.place_info.institution.badge',
									name: '$producer.general.place_info.institution.name',
									consortium: '$producer.general.place_info.institution.consortium',
									website: '$producer.general.place_info.institution.website',
								},
								short_id: '$producer.general.place_info.short_id',
								coordinates: '$producer.general.place_info.location.coordinates',
							},
							tale: 1
						},
						brewing: {
							fermentation: 1,
							extract: 1,
							alcohol: 1,
							filtration: 1,
							pasteurization: 1,
							refermentation: 1,
							aged: 1,
							style: 1,
							dryHopped: 1,
							expirationDate: 1,
						},
						ingredients: {
							description: 1,
							list: {
								$map: { 
									input: '$producer.ingredients.list_info', 
									as: 'ingredient', 
									in: {
										id: '$$ingredient._id',
										badge: '$$ingredient.badge',
										name: '$$ingredient.name',
										type: '$$ingredient.type',
									}
								}
							},
							complete: 1,
							smokedMalt: 1,
						},
						impressions: {
							bitterness: 1,
							sweetness: 1,
							fullness: 1,
							power: 1,
							hoppyness: 1,
							temperature: 1,
						},
						price: 1,
					},
					editorial: {
						general: {
							cooperation: {
								$map: { 
									input: '$editorial.general.cooperation_info', 
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
								id: '$editorial.general.contract_info._id',
								short_id: '$editorial.general.contract_info.short_id',
								badge: '$editorial.general.contract_info.badge',
								name: '$editorial.general.contract_info.name',
								consortium: '$editorial.general.contract_info.consortium',
								website: '$editorial.general.contract_info.website',
							},
							place: {
								id: '$editorial.general.place_info._id',
								city: '$editorial.general.place_info.city',
								country: {
									id: '$editorial.general.place_info.country._id',
									code: '$editorial.general.place_info.country.code',
									name: '$editorial.general.place_info.country.name',
								},
								institution: {
									id: '$editorial.general.place_info.institution._id',
									short_id: '$editorial.general.place_info.institution.short_id',
									badge: '$editorial.general.place_info.institution.badge',
									name: '$editorial.general.place_info.institution.name',
									consortium: '$editorial.general.place_info.institution.consortium',
									website: '$editorial.general.place_info.institution.website',
								},
								short_id: '$editorial.general.place_info.short_id',
								coordinates: '$editorial.general.place_info.location.coordinates',
							}
						},
						brewing: {
							fermentation: 1,
							alcohol: 1,
							filtration: 1,
							pasteurization: 1,
							refermentation: 1,
							aged: 1,
							style: 1,
							dryHopped: 1
						},
						impressions: {
							color: 1,
							clarity: 1
						},
						price: 1
					},
					added: 1,
					updated: 1
				}
			}
		])
		.forEach((beverage) => {
			const formattedBeverage = normalizeBeverageFromResponse(beverage);
			beverages.push(formattedBeverage);
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
			const newBeverage = normalizeBeverageToRequest(req.body);
			newBeverage.short_id = nanoid(6);

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

router.put('/', verifyToken, (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
		if (err) {
			res.sendStatus(403);
		} else {
			const updatedBeverage = normalizeBeverageToRequest(req.body);

			console.log('updatedBeverage', updatedBeverage);
			console.log('req.body.id', req.body.id, req.body);

			db.getDb()
				.db()
				.collection('beverages')
				.updateOne({ _id: ObjectId(req.body.id) }, { $set: updatedBeverage })
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

router.delete('/', verifyToken, (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
		if (err) {
			res.sendStatus(403);
		} else {
			db.getDb()
				.db()
				.collection('beverages')
				.deleteOne({ _id: ObjectId(req.body.id) })
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
