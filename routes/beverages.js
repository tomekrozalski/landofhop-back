const { Router } = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const Beverage = require('../models/Beverage');
const shortIdGenerator = require('../utils/shortIdGenerator');
const verifyToken = require('../utils/verifyToken');
const normalizeBeverageToResponse = require('../normalizers/toResponse/beverage');
const normalizeToSave = require('../normalizers/toSave/beverage');
const {
	removeBeverage,
	removeCap,
	removeGallery,
	saveCap,
	saveCover,
	saveGallery,
} = require('../utils');

const router = Router();
const upload = multer({});

/*
 * ------------------------------------------------------------------
 * GET LIST OF BEVERAGES
 */

router.get('/list', (req, res) => {
	Beverage
		.aggregate([
			{
				$project: {
					_id: 0,
					added: 1,
					badge: 1,
					brand: '$label.general.brand',
					container: '$label.container',
					id: '$_id',
					name: '$label.general.name',
					shortId: 1,
				},
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'brand',
					foreignField: '_id',
					as: 'brand_info',
				},
			},
			{
				$unwind: '$brand_info',
			},
			{
				$project: {
					added: 1,
					badge: 1,
					brand: {
						badge: '$brand_info.badge',
						name: '$brand_info.name',
					},
					container: {
						type: 1,
						unit: 1,
						value: 1,
					},
					id: 1,
					name: 1,
					shortId: 1,
				},
			},
		])
		.then((result) => {
			const formattedResults = result.map(beverage => ({
				...beverage,
				container: {
					...beverage.container,
					value: Number(beverage.container.value.toString()),
				},
			}));

			res
				.status(200)
				.json(formattedResults);
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'An error occured' });
		});
});

/*
 * ------------------------------------------------------------------
 * GET BEVERAGE DETAILS
 */

router.get('/details/:shortId/:brand/:badge', (req, res) => {
	Beverage
		.aggregate([
			// ------------------------------------------------
			// Label - brand, contract, cooperation
			{
				$lookup: {
					from: 'institutions',
					localField: 'label.general.brand',
					foreignField: '_id',
					as: 'label.general.brand_info',
				},
			},
			{
				$unwind: '$label.general.brand_info',
			},
			{
				$match: {
					badge: req.params.badge,
					'label.general.brand_info.badge': req.params.brand,
					shortId: req.params.shortId,
				},
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'label.general.brand_info.consortium',
					foreignField: '_id',
					as: 'label.general.brand_info.consortium_info',
				},
			},
			{
				$unwind: {
					path: '$label.general.brand_info.consortium_info',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'label.general.contract',
					foreignField: '_id',
					as: 'label.general.contract_info',
				},
			},
			{
				$unwind: {
					path: '$label.general.contract_info',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'label.general.cooperation',
					foreignField: '_id',
					as: 'label.general.cooperation_info',
				},
			},
			// ------------------------------------------------
			// Label - place
			{
				$lookup: {
					from: 'places',
					localField: 'label.general.place',
					foreignField: '_id',
					as: 'label.general.place_info',
				},
			},
			{
				$unwind: {
					path: '$label.general.place_info',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$lookup: {
					from: 'countries',
					localField: 'label.general.place_info.country',
					foreignField: '_id',
					as: 'label.general.place_info.country',
				},
			},
			{
				$unwind: {
					path: '$label.general.place_info.country',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'label.general.place_info.institution',
					foreignField: '_id',
					as: 'label.general.place_info.institution',
				},
			},
			{
				$unwind: {
					path: '$label.general.place_info.institution',
					preserveNullAndEmptyArrays: true,
				},
			},
			// ------------------------------------------------
			// Label - dryHopped
			{
				$lookup: {
					from: 'ingredients',
					localField: 'label.brewing.dryHopped.hops',
					foreignField: '_id',
					as: 'label.brewing.dryHopped_info',
				},
			},
			// ------------------------------------------------
			// Label - ingredients
			{
				$lookup: {
					from: 'ingredients',
					localField: 'label.ingredients.list',
					foreignField: '_id',
					as: 'label.ingredients.list_info',
				},
			},
			// ------------------------------------------------
			// Producer - contract, cooperation
			{
				$lookup: {
					from: 'institutions',
					localField: 'producer.general.contract',
					foreignField: '_id',
					as: 'producer.general.contract_info',
				},
			},
			{
				$unwind: {
					path: '$producer.general.contract_info',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'producer.general.cooperation',
					foreignField: '_id',
					as: 'producer.general.cooperation_info',
				},
			},
			// ------------------------------------------------
			// Producer - place
			{
				$lookup: {
					from: 'places',
					localField: 'producer.general.place',
					foreignField: '_id',
					as: 'producer.general.place_info',
				},
			},
			{
				$unwind: {
					path: '$producer.general.place_info',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$lookup: {
					from: 'countries',
					localField: 'producer.general.place_info.country',
					foreignField: '_id',
					as: 'producer.general.place_info.country',
				},
			},
			{
				$unwind: {
					path: '$producer.general.place_info.country',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'producer.general.place_info.institution',
					foreignField: '_id',
					as: 'producer.general.place_info.institution',
				},
			},
			{
				$unwind: {
					path: '$producer.general.place_info.institution',
					preserveNullAndEmptyArrays: true,
				},
			},
			// ------------------------------------------------
			// Producer - dryHopped
			{
				$lookup: {
					from: 'ingredients',
					localField: 'producer.brewing.dryHopped.hops',
					foreignField: '_id',
					as: 'producer.brewing.dryHopped_info',
				},
			},
			// ------------------------------------------------
			// Producer - ingredients
			{
				$lookup: {
					from: 'ingredients',
					localField: 'producer.ingredients.list',
					foreignField: '_id',
					as: 'producer.ingredients.list_info',
				},
			},
			// ------------------------------------------------
			// Editorial - contract, cooperation
			{
				$lookup: {
					from: 'institutions',
					localField: 'editorial.general.contract',
					foreignField: '_id',
					as: 'editorial.general.contract_info',
				},
			},
			{
				$unwind: {
					path: '$editorial.general.contract_info',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'editorial.general.cooperation',
					foreignField: '_id',
					as: 'editorial.general.cooperation_info',
				},
			},
			// ------------------------------------------------
			// Editorial - place
			{
				$lookup: {
					from: 'places',
					localField: 'editorial.general.place',
					foreignField: '_id',
					as: 'editorial.general.place_info',
				},
			},
			{
				$unwind: {
					path: '$editorial.general.place_info',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$lookup: {
					from: 'countries',
					localField: 'editorial.general.place_info.country',
					foreignField: '_id',
					as: 'editorial.general.place_info.country',
				},
			},
			{
				$unwind: {
					path: '$editorial.general.place_info.country',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$lookup: {
					from: 'institutions',
					localField: 'editorial.general.place_info.institution',
					foreignField: '_id',
					as: 'editorial.general.place_info.institution',
				},
			},
			{
				$unwind: {
					path: '$editorial.general.place_info.institution',
					preserveNullAndEmptyArrays: true,
				},
			},
			// ------------------------------------------------
			// Producer - dryHopped
			{
				$lookup: {
					from: 'ingredients',
					localField: 'editorial.brewing.dryHopped.hops',
					foreignField: '_id',
					as: 'editorial.brewing.dryHopped_info',
				},
			},
			// ------------------------------------------------
			{
				$project: {
					_id: 0,
					id: '$_id',
					shortId: 1,
					badge: 1,
					label: {
						general: {
							name: 1,
							series: 1,
							brand: {
								id: '$label.general.brand_info._id',
								shortId: '$label.general.brand_info.shortId',
								badge: '$label.general.brand_info.badge',
								name: '$label.general.brand_info.name',
								consortium: '$label.general.brand_info.consortium_info.name',
								website: '$label.general.brand_info.website',
							},
							cooperation: {
								$map: {
									input: '$label.general.cooperation_info',
									as: 'coop',
									in: {
										id: '$$coop._id',
										shortId: '$$coop.shortId',
										badge: '$$coop.badge',
										name: '$$coop.name',
										consortium: '$$coop.consortium',
										website: '$$coop.website',
									},
								},
							},
							contract: {
								id: '$label.general.contract_info._id',
								shortId: '$label.general.contract_info.shortId',
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
									shortId: '$label.general.place_info.institution.shortId',
									badge: '$label.general.place_info.institution.badge',
									name: '$label.general.place_info.institution.name',
									consortium: '$label.general.place_info.institution.consortium',
									website: '$label.general.place_info.institution.website',
								},
								shortId: '$label.general.place_info.shortId',
								coordinates: '$label.general.place_info.location.coordinates',
							},
							tale: 1,
							barcode: 1,
						},
						brewing: {
							fermentation: 1,
							extract: 1,
							alcohol: 1,
							filtration: 1,
							pasteurization: 1,
							aged: 1,
							style: 1,
							dryHopped: {
								isTrue: {
									$cond: [
										{ $eq: ['$label.brewing.dryHopped', true] },
										true,
										false,
									],
								},
								hops: {
									$map: {
										input: '$label.brewing.dryHopped_info',
										as: 'hop',
										in: {
											id: '$$hop._id',
											badge: '$$hop.badge',
											name: '$$hop.name',
											type: '$$hop.type',
										},
									},
								},
							},
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
									},
								},
							},
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
										shortId: '$$coop.shortId',
										badge: '$$coop.badge',
										name: '$$coop.name',
										consortium: '$$coop.consortium',
										website: '$$coop.website',
									},
								},
							},
							contract: {
								id: '$producer.general.contract_info._id',
								shortId: '$producer.general.contract_info.shortId',
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
									shortId: '$producer.general.place_info.institution.shortId',
									badge: '$producer.general.place_info.institution.badge',
									name: '$producer.general.place_info.institution.name',
									consortium: '$producer.general.place_info.institution.consortium',
									website: '$producer.general.place_info.institution.website',
								},
								shortId: '$producer.general.place_info.shortId',
								coordinates: '$producer.general.place_info.location.coordinates',
							},
							tale: 1,
						},
						brewing: {
							fermentation: 1,
							extract: 1,
							alcohol: 1,
							filtration: 1,
							pasteurization: 1,
							aged: 1,
							style: 1,
							dryHopped: {
								empty: {
									$cond: [
										{ $eq: ['$producer.brewing.dryHopped', {}] },
										true,
										false,
									],
								},
								hops: {
									$map: {
										input: '$producer.brewing.dryHopped_info',
										as: 'hop',
										in: {
											id: '$$hop._id',
											badge: '$$hop.badge',
											name: '$$hop.name',
											type: '$$hop.type',
										},
									},
								},
							},
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
									},
								},
							},
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
										shortId: '$$coop.shortId',
										badge: '$$coop.badge',
										name: '$$coop.name',
										consortium: '$$coop.consortium',
										website: '$$coop.website',
									},
								},
							},
							contract: {
								id: '$editorial.general.contract_info._id',
								shortId: '$editorial.general.contract_info.shortId',
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
									shortId: '$editorial.general.place_info.institution.shortId',
									badge: '$editorial.general.place_info.institution.badge',
									name: '$editorial.general.place_info.institution.name',
									consortium: '$editorial.general.place_info.institution.consortium',
									website: '$editorial.general.place_info.institution.website',
								},
								shortId: '$editorial.general.place_info.shortId',
								coordinates: '$editorial.general.place_info.location.coordinates',
							},
						},
						brewing: {
							fermentation: 1,
							alcohol: 1,
							filtration: 1,
							pasteurization: 1,
							aged: 1,
							style: 1,
							dryHopped: {
								empty: {
									$cond: [
										{ $eq: ['$editorial.brewing.dryHopped', {}] },
										true,
										false,
									],
								},
								hops: {
									$map: {
										input: '$editorial.brewing.dryHopped_info',
										as: 'hop',
										in: {
											id: '$$hop._id',
											badge: '$$hop.badge',
											name: '$$hop.name',
											type: '$$hop.type',
										},
									},
								},
							},
						},
						impressions: {
							color: 1,
							clarity: 1,
						},
						price: 1,
						images: 1,
						cap: 1,
						notes: 1,
					},
					added: 1,
					updated: 1,
				},
			},
		])
		.then((result) => {
			res
				.status(200)
				.json(normalizeBeverageToResponse(result[0]));
		})
		.catch(() => {
			res
				.status(500)
				.json({ message: 'An error occured' });
		});
});

/*
 * ------------------------------------------------------------------
 * ADD NEW BEVERAGE
 */

router.post('/', verifyToken, (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (err) => {
		if (err) {
			res.sendStatus(403);
		} else {
			const beverage = new Beverage({
				...normalizeToSave(req.body),
				shortId: shortIdGenerator(),
			});

			beverage
				.save()
				.then((result) => {
					res
						.status(200)
						.json(result);
				})
				.catch(() => {
					res
						.status(500)
						.json({ message: 'An error occured' });
				});
		}
	});
});

/*
 * ------------------------------------------------------------------
 * UPDATE A BEVERAGE
 */

router.put('/', verifyToken, (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (err) => {
		if (err) {
			res.sendStatus(403);
		} else {
			console.log('normalizeToSave(req.body)', normalizeToSave(req.body));

			Beverage
				.replaceOne({
					_id: req.body.id,
				}, normalizeToSave(req.body))
				.then((result) => {
					res
						.status(200)
						.json(result);
				})
				.catch(() => {
					res
						.status(500)
						.json({ message: 'An error occured' });
				});
		}
	});
});

/*
 * ------------------------------------------------------------------
 * REMOVE A BEVERAGE
 */

router.delete('/', verifyToken, (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (err) => {
		if (err) {
			res.sendStatus(403);
		} else {
			const { files, id, params } = req.body;
			const { badge, brand, shortId } = params;

			removeBeverage({
				badge,
				brand,
				files,
				shortId,
			}, res, () => {
				Beverage
					.deleteOne({ _id: id })
					.then((result) => {
						res
							.status(200)
							.json(result);
					})
					.catch(() => {
						res
							.status(500)
							.json({ message: 'An error occured' });
					});
			});
		}
	});
});

/*
 * ------------------------------------------------------------------
 * SAVE COVER
 */

router.post('/cover', verifyToken, upload.single('image'), (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (authErr) => {
		if (authErr) {
			res.sendStatus(403);
		} else {
			const { buffer } = req.file;
			const {
				brand,
				badge,
				shortId,
			} = req.body;

			const coverPath = `${brand}/${badge}/${shortId}/cover`;

			saveCover(buffer, coverPath, () => {
				res.status(200).json({ success: true });
			});
		}
	});
});

/*
 * ------------------------------------------------------------------
 * SAVE GALLERY
 */

router.post('/gallery', verifyToken, upload.array('image'), (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (err) => {
		if (err) {
			res.sendStatus(403);
		} else {
			const {
				brand,
				badge,
				id,
				shortId,
			} = req.body;

			saveGallery(req.files, { brand, badge, shortId }, () => {
				Beverage
					.findByIdAndUpdate(id, {
						'editorial.images': req.files.length,
					}, { useFindAndModify: false })
					.then((result) => {
						res
							.status(200)
							.json(result);
					})
					.catch(() => {
						res
							.status(500)
							.json({ message: 'An error occured' });
					});
			});
		}
	});
});

/*
 * ------------------------------------------------------------------
 * REMOVE GALLERY
 */

router.delete('/gallery', verifyToken, (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (err) => {
		if (err) {
			res.sendStatus(403);
		} else {
			const {
				badge,
				brand,
				files,
				id,
				shortId,
			} = req.body;

			removeGallery({
				brand,
				badge,
				files,
				shortId,
			}, res, () => {
				Beverage
					.findByIdAndUpdate(id, {
						$unset: { 'editorial.images': '' },
					}, { useFindAndModify: false })
					.then((result) => {
						res
							.status(200)
							.json(result);
					})
					.catch(() => {
						res
							.status(500)
							.json({ message: 'An error occured' });
					});
			});
		}
	});
});

/*
 * ------------------------------------------------------------------
 * SAVE CAP
 */

router.post('/cap', verifyToken, upload.single('image'), (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (authErr) => {
		if (authErr) {
			res.sendStatus(403);
		} else {
			const { buffer } = req.file;
			const {
				brand,
				badge,
				id,
				shortId,
			} = req.body;

			const capPath = `${brand}/${badge}/${shortId}/cap`;

			saveCap(buffer, capPath, () => {
				Beverage
					.findByIdAndUpdate(id, { 'editorial.cap': true }, { useFindAndModify: false })
					.then((result) => {
						res
							.status(200)
							.json(result);
					})
					.catch(() => {
						res
							.status(500)
							.json({ message: 'An error occured' });
					});
			});
		}
	});
});

/*
 * ------------------------------------------------------------------
 * REMOVE CAP
 */

router.delete('/cap', verifyToken, (req, res) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (authErr) => {
		if (authErr) {
			res.sendStatus(403);
		} else {
			const {
				badge,
				brand,
				id,
				shortId,
			} = req.body;

			removeCap({ badge, brand, shortId }, res, () => {
				Beverage
					.findByIdAndUpdate(id, {
						$unset: { 'editorial.cap': '' },
					}, { useFindAndModify: false })
					.then((result) => {
						res
							.status(200)
							.json(result);
					})
					.catch(() => {
						res
							.status(500)
							.json({ message: 'An error occured' });
					});
			});
		}
	});
});

module.exports = router;
