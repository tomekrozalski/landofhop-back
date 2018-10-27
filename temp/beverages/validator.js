db.createCollection("beverages", {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			additionalProperties: false,
			required: ["_id", "badge", "label", "container", "added"],
			properties: {
				_id: {
					bsonType: "objectId",
					description: "must be an objectId and is required"
				},
				badge: {
					bsonType: "string",
					description: "must be a string and is required"
				},
				label: {
					bsonType: "object",
					additionalProperties: false,
					description: "must be an object and is required",
					required: ["name", "brand"],
					properties: {
						name: {
							bsonType: "string",
							description: "must be a string and is required"
						},
						brand: {
							bsonType: "objectId",
							description: "must be an objectId and is required"
						},
						cooperation: {
							bsonType: ["objectId"],
							minimum: 1,
							description: "must be an array of objectIds",
						},
						contract: {
							bsonType: "objectId",
							description: "must be an objectId"
						},
						placeOfProduction: {
							bsonType: "objectId",
							description: "must be an objectId"
						},
						fermentation: {
							enum: ["top", "bottom", "spontaneous"],
							description: "can only be one of the enum values"
						},
						style: {
							bsonType: ["string"],
							minimum: 1,
							description: "must be an array of strings",
						},
						filtered: {
							bsonType: "bool",
							description: "must be a boolean"
						},
						pasteurized: {
							bsonType: "bool",
							description: "must be a boolean"
						},
						containsSmokedMalt: {
							bsonType: "bool",
							description: "must be a boolean"
						},
						refermentedInContainer: {
							bsonType: "bool",
							description: "must be a boolean"
						},
						dryHopped: {
							bsonType: "bool",
							description: "must be a boolean"
						},
						extract: {
							bsonType: "object",
							additionalProperties: false,
							description: "must be an object",
							required: ["relate", "unit", "value"],
							properties: {
								relate: {
									enum: ["weight", "blg", "plato"],
									description: "can only be one of the enum values and is required"
								},
								unit: {
									enum: ["percent", "degree"],
									description: "can only be one of the enum values and is required"
								},
								value: {
									bsonType: "decimal",
									description: "must be a decimal and is required"
								}
							}
						},
						alcohol: {
							bsonType: "object",
							additionalProperties: false,
							description: "must be an object",
							required: ["relate", "unit", "value"],
							properties: {
								relate: {
									enum: ["capacity", "abv"],
									description: "can only be one of the enum values and is required"
								},
								unit: {
									enum: ["percent", "degree"],
									description: "can only be one of the enum values and is required"
								},
								value: {
									bsonType: "decimal",
									description: "must be a decimal and is required"
								},
								scope: {
									enum: ["-0.5", "+/-0.5", "+/-1.0"],
									description: "can only be one of the enum values"
								}
							}
						},
						tale: {
							bsonType: "object",
							additionalProperties: false,
							description: "must be an object",
							properties: {
								pl: {
									bsonType: "string",
									description: "must be a string"
								},
								en: {
									bsonType: "string",
									description: "must be a string"
								}
							}
						},
						ingredients: {
							bsonType: "object",
							additionalProperties: false,
							description: "must be an object",
							properties: {
								complete: {
									bsonType: "bool",
									description: "must be a boolean"
								},
								pl: {
									bsonType: "string",
									description: "must be a string"
								},
								en: {
									bsonType: "string",
									description: "must be a string"
								}
							}
						},
						impressions: {
							bsonType: "object",
							additionalProperties: false,
							description: "must be an object",
							properties: {
								bitterness: {
									bsonType: "int",
									minimum: 0,
									maximum: 100,
									description: "must be an integer in [ 0, 100 ]"
								},
								sweetness: {
									bsonType: "int",
									minimum: 0,
									maximum: 100,
									description: "must be an integer in [ 0, 100 ]"
								},
								fullness: {
									bsonType: "int",
									minimum: 0,
									maximum: 100,
									description: "must be an integer in [ 0, 100 ]"
								},
								power: {
									bsonType: "int",
									minimum: 0,
									maximum: 100,
									description: "must be an integer in [ 0, 100 ]"
								},
								hoppyness: {
									bsonType: "int",
									minimum: 0,
									maximum: 100,
									description: "must be an integer in [ 0, 100 ]"
								},
								color: {
									bsonType: "string",
									description: "must be a string"
								},
								temperature: {
									bsonType: "object",
									additionalProperties: false,
									description: "must be an object",
									required: ["high", "low", "unit"],
									properties: {
										high: {
											bsonType: "int",
											minimum: 0,
											maximum: 100,
											description: "must be an integer in [ 0, 100 ] and is required"
										},
										low: {
											bsonType: "int",
											minimum: 0,
											maximum: 100,
											description: "must be an integer in [ 0, 100 ] and is required"
										},
										unit: {
											enum: ["celsius"],
											description: "can only be one of the enum values and is required"
										}
									}
								}
							}
						},
						expiration: {
							bsonType: "object",
							additionalProperties: false,
							description: "must be an object",
							required: ["value", "unit"],
							properties: {
								value: {
									bsonType: "int",
									description: "must be an integer and is required"
								},
								unit: {
									enum: ["day", "month", "year"],
									description: "can only be one of the enum values and is required"
								}
							}
						},
						cellared: {
							bsonType: "object",
							additionalProperties: false,
							description: "must be an object",
							required: ["value", "unit"],
							properties: {
								value: {
									bsonType: "int",
									description: "must be an integer and is required"
								},
								unit: {
									enum: ["day", "month", "year"],
									description: "can only be one of the enum values and is required"
								}
							}
						},
						barcode: {
							bsonType: "long",
							description: "must be a long"
						}
					}
				},
				price: {
					bsonType: "array",
					description: "must be an array",
					items: {
						bsonType: "object",
						additionalProperties: false,
						description: "must be an object",
						required: ["value", "currency"],
						properties: {
							value: {
								bsonType: "decimal",
								description: "must be a decimal and is required"
							},
							currency: {
								enum: ["PLN", "EUR"],
								description: "can only be one of the enum values and is required"
							}
						}
					}
				},
				container: {
					bsonType: "object",
					additionalProperties: false,
					description: "must be an object and is required",
					required: ["color", "material", "unit", "type", "value"],
					properties: {
						color: {
							enum: ["brown", "green", "black", "silver"],
							description: "can only be one of the enum values and is required"
						},
						material: {
							enum: ["glass", "aluminum"],
							description: "can only be one of the enum values and is required"
						},
						unit: {
							enum: ["ml"],
							description: "can only be one of the enum values and is required"
						},
						type: {
							enum: ["bottle", "can"],
							description: "can only be one of the enum values and is required"
						},
						value: {
							bsonType: "decimal",
							description: "must be a decimal and is required"
						}
					}
				},
				impressions: {
					bsonType: "object",
					additionalProperties: false,
					description: "must be an object",
					properties: {
						color: {
							bsonType: "string",
							pattern: "#([a-f\d]){6}",
							description: "must be a string"
						},
						clarity: {
							enum: ["crystalline", "clear", "opalescent", "misty", "hazy", "muddy"],
							description: "can only be one of the enum values"
						}
					}
				},
				added: {
					bsonType: "date",
					description: "must be a date and is required"
				},
				updated: {
					bsonType: "date",
					description: "must be a date"
				}
			}
		}
	}
})

const simple = {
	badge: "test-badge",
	label: {
		name: "test name",
		brand: ObjectId("5bbd04bc5433eca56a6c00cf")
	},
	container: {
		color: "brown",
		material: "glass",
		unit: "ml",
		type: "bottle",
		value: NumberDecimal("500")
	},
	added: new Date()
}

const sample = {
	"badge": "string",
	"label": {
		"name": "string",
		"brand": "objectId",
		"cooperation": ["objectId"],
		"contract": "objectId",
		"placeOfProduction": "objectId",
		"fermentation": enum("top", "bottom", "spontaneous"),
		"style": ["string"],
		"filtered": "bool",
		"pasteurized": "bool",
		"containsSmokedMalt": "bool",
		"refermentedInContainer": "bool",
		"dryHopped": "bool",
		"extract": {
			"relate": enum("weight", "blg", "plato"),
			"unit": enum("percent", "degree"),
	  		"value": NumberDecimal("5.30")
		},
		"alcohol": {
			"relate": enum("capacity", "abv"),
			"unit": enum("percent", "degree"),
			"value": NumberDecimal("5.30"),
			"scope": enum("-0.5", "+/-0.5", "+/-1.0")
		},
		"tale": {
			"en": "string",
			"pl": "string"
		},
		"ingredients": {
			"complete": "bool",
			"en": "string",
			"pl": "string",
		},
		"impressions": {
			"bitterness": NumberInt("50"),
			"sweetness": NumberInt("50"),
			"temperature": {
				"high": NumberInt("50"),
				"low": NumberInt("50"),
				"unit": enum("celsius")
			},
			"fullness": NumberInt("50"),
			"color": "string",
			"power": NumberInt("50"),
	  		"hoppyness": NumberInt("50")
		},
		"expiration": {
			"value": NumberInt("50"),
			"unit": enum("day", "month", "year")
		},
		"cellared": {
			"value": NumberInt("50"),
			"unit": enum("day", "month", "year")
		},
		"barcode": NumberLong("1234567890123")
	},
	"price": [{
		value: NumberDecimal("5.30"),
		currency: enum("PLN", "EUR")
	}],
	"container": {
		"color": enum("brown", "green", "black", "silver"),
		"material": enum("glass", "aluminum"),
		"unit": enum("ml"),
		"type": enum("bottle", "can"),
		"value": NumberDecimal("50")
	},
	"impressions": {
		"color": "#asdasd",
		"clarity": enum("crystalline", "clear", "opalescent", "misty", "hazy", "muddy"),
	},
	"added": "ISODate",
	"updated": "ISODate"
};
