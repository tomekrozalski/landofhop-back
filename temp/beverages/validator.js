db.runCommand({ collMod: "beverages", validator: {

}});

// db.createCollection("beverages", {
db.runCommand({ collMod: "beverages",
	validator: {
		$jsonSchema: {
			bsonType: "object",
			additionalProperties: false,
			required: ["_id", "badge", "label", "container", "added", "short_id"],
			properties: {
				_id: {
					bsonType: "objectId",
					description: "must be an objectId and is required"
				},
				short_id: {
					bsonType: "string",
					description: "must be a string and is required"
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
							bsonType: "array",
							minimum: 1,
							description: "must be an array and is required",
							items: {
								bsonType: "object",
								additionalProperties: false,
								description: "must be an object",
								required: ["value"],
								properties: {
									"language": {
										bsonType: "string",
										description: "must be a string"
									},
									"value": {
										bsonType: "string",
										description: "must be a string and is required"
									}
								}
							}	
						},
						series: {
							bsonType: "array",
							minimum: 1,
							description: "must be an array",
							items: {
								bsonType: "object",
								additionalProperties: false,
								description: "must be an object",
								required: ["value"],
								properties: {
									"language": {
										bsonType: "string",
										description: "must be a string"
									},
									"value": {
										bsonType: "string",
										description: "must be a string and is required"
									}
								}
							}
						},
						brand: {
							bsonType: "objectId",
							description: "must be an objectId and is required"
						},
						cooperation: {
							bsonType: "array",
							minimum: 1,
							description: "must be an array",
							items: {
								bsonType: "objectId",
								description: "must be an objectId",
							}
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
							bsonType: "array",
							minimum: 1,
							description: "must be an array",
							items: {
								enum: ["top", "bottom", "spontaneous"],
								description: "can only be one of the enum values",
							}
						},
						style: {
							bsonType: "array",
							minimum: 1,
							description: "must be an array",
							items: {
								bsonType: "object",
								additionalProperties: false,
								description: "must be an object",
								required: ["value"],
								properties: {
									"language": {
										bsonType: "string",
										description: "must be a string"
									},
									"value": {
										bsonType: "string",
										description: "must be a string and is required"
									}
								}
							}
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
									enum: ["<0.5%", "±0.5%", "±1.0%"],
									description: "can only be one of the enum values"
								}
							}
						},
						filtration: {
							bsonType: "bool",
							description: "must be a boolean"
						},
						pasteurization: {
							bsonType: "bool",
							description: "must be a boolean"
						},
						refermentation: {
							bsonType: "bool",
							description: "must be a boolean"
						},
						aged: {
							bsonType: "object",
							additionalProperties: false,
							description: "must be an object",
							required: ["type"],
							properties: {
								type: {
									bsonType: "array",
									minimum: 1,
									description: "must be an array",
									items: {
										enum: ["barrel", "wood"],
										description: "can only be one of the enum values"
									}
								},
							}
						},
						tale: {
							bsonType: "array",
							minimum: 1,
							description: "must be an array",
							items: {
								bsonType: "object",
								additionalProperties: false,
								description: "must be an object",
								required: ["value"],
								properties: {
									"language": {
										bsonType: "string",
										description: "must be a string"
									},
									"value": {
										bsonType: "string",
										description: "must be a string and is required"
									}
								}
							}
						},
						ingredients: {
							bsonType: "array",
							minimum: 1,
							description: "must be an array",
							items: {
								bsonType: "object",
								additionalProperties: false,
								description: "must be an object",
								required: ["value"],
								properties: {
									"language": {
										bsonType: "string",
										description: "must be a string"
									},
									"value": {
										bsonType: "string",
										description: "must be a string and is required"
									}
								}
							}
						},
						ingredientsList: {
							bsonType: "array",
							minimum: 1,
							description: "must be an array",
							items: {
								bsonType: "objectId",
								description: "must be an objectId"
							}
						},
						areIngredientsComplete: {
							bsonType: "bool",
							description: "must be a boolean"
						},
						smokedMalt: {
							bsonType: "bool",
							description: "must be a boolean"
						},
						dryHopped: {
							bsonType: "bool",
							description: "must be a boolean"
						},
						impressions: {
							bsonType: "object",
							additionalProperties: false,
							description: "must be an object",
							properties: {
								bitterness: {
									bsonType: "decimal",
									minimum: 0,
									maximum: 100,
									description: "must be an decimal in [ 0, 100 ]"
								},
								sweetness: {
									bsonType: "decimal",
									minimum: 0,
									maximum: 100,
									description: "must be an decimal in [ 0, 100 ]"
								},
								fullness: {
									bsonType: "decimal",
									minimum: 0,
									maximum: 100,
									description: "must be an decimal in [ 0, 100 ]"
								},
								power: {
									bsonType: "decimal",
									minimum: 0,
									maximum: 100,
									description: "must be an decimal in [ 0, 100 ]"
								},
								hoppyness: {
									bsonType: "decimal",
									minimum: 0,
									maximum: 100,
									description: "must be an decimal in [ 0, 100 ]"
								},
								temperature: {
									bsonType: "object",
									additionalProperties: false,
									description: "must be an object",
									required: ["from", "to", "unit"],
									properties: {
										from: {
											bsonType: "decimal",
											minimum: 0,
											maximum: 100,
											description: "must be an decimal in [ 0, 100 ] and is required"
										},
										to: {
											bsonType: "decimal",
											minimum: 0,
											maximum: 100,
											description: "must be an decimal in [ 0, 100 ] and is required"
										},
										unit: {
											enum: ["celcius"],
											description: "can only be one of the enum values and is required"
										}
									}
								}
							}
						},
						expirationDate: {
							bsonType: "object",
							additionalProperties: false,
							description: "must be an object",
							required: ["value", "unit"],
							properties: {
								value: {
									bsonType: "decimal",
									description: "must be an decimal and is required"
								},
								unit: {
									enum: ["day", "month", "year"],
									description: "can only be one of the enum values and is required"
								}
							}
						},
						barcode: {
							bsonType: "string",
							description: "must be a string"
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
						},
						hasCapWireFlip: {
							bsonType: "bool",
							description: "must be a boolean"
						}
					}
				},
				price: {
					bsonType: "array",
					minimum: 1,
					description: "must be an array",
					items: {
						bsonType: "object",
						additionalProperties: false,
						description: "must be an object",
						required: ["value", "currency", "date"],
						properties: {
							date: {
								bsonType: "date",
								description: "must be a date and is required"
							},
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
				impressions: {
					bsonType: "object",
					additionalProperties: false,
					description: "must be an object",
					properties: {
						color: {
							bsonType: "string",
							pattern: "^#([a-f0-9]){6}$",
							description: "must be a hex string and match the regular expression pattern"
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


const sample = {
	1)

	"badge": "piwo-misiowe",
	"label": {
		"name": [
			{
				language: "pl",
				value: "Piwo misiowe",
			},
			{
				value: "Teddy Beer",
			}
		],
		"series": [
			{
				language: "pl",
				value: "Niebieska",
			},
			{
				value: "Blue",
			}
		],
		"brand": "objectId",
		"cooperation": ["objectId"],
		"contract": "objectId",

		2)
		
		"placeOfProduction": "objectId",
		"fermentation": [enum("top", "bottom", "spontaneous")],
		"style": [
			{
				language: "pl",
				value: "Porzeczkowe Ale",
			},
			{
				value: "asdf",
			}
		],
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
		"filtration": "bool",
		"pasteurization": "bool",
		"refermentation": "bool",
		"aged": ["barrel"],

		3)

		"tale": [
			{
				language: "pl",
				value: "Lorem ipsum",
			}
		],
		"ingredients": [
			{
				language: "pl",
				value: "Lorem ipsum",
			}
		],
		"ingredientsList": [
			"objectId", "objectId"
		],
		"ingredientsComplete": "bool",
		"containsSmokedMalt": "bool",
		"dryHopped": "bool",

		4)
		
		"impressions": {
			"bitterness": NumberInt("50"),
			"sweetness": NumberInt("50"),
			"fullness": NumberInt("50"),
			"power": NumberInt("50"),
			"hoppyness": NumberInt("50"),
			"temperature": {
				"high": NumberInt("50"),
				"low": NumberInt("50"),
				"unit": enum("celsius")
			}
		},
		"expiration": {
			"value": NumberInt("50"),
			"unit": enum("day", "month", "year")
		},
		"barcode": "1234567890123"
	},
	"container": {
		"type": enum("bottle", "can"),
		"color": enum("brown", "green", "black", "silver"),
		"material": enum("glass", "aluminum"),
		"value": NumberDecimal("50"),
		"unit": enum("ml"),
		"hasCapWireFlip": "bool",
	},

	5)

	"impressions": {
		"color": "#asdasd",
		"clarity": enum("crystalline", "clear", "opalescent", "misty", "hazy", "muddy"),
	},
	"price": [{
		value: NumberDecimal("5.30"),
		currency: enum("PLN", "EUR"),
		date: date
	}],
	"added": "ISODate",
	"updated": "ISODate",

	"short_id": id
};


==================
NEW SCHEMA PROJECT
==================

_id
short_id
badge
label {
	brand {
		name
		series
		brand
		cooperation
		contract
		place
		tale
		barcode
	}
	brewing {
		fermentation
		extract
		alcohol
		filtration
		pasteurization
		refermentation
		aged
		style
		dryHopped
		expiration
	}
    ingredients {
		description
		list
		complete
		smokedMalt
	}
    impressions {
        bitterness
        sweetness
        fullness
        power
        hoppyness
        temperature
    }
	container
	price
}
producer {
	brand {
		series
		cooperation
		contract
		place
		tale
	}
	brewering {
		fermentation
		extract
		alcohol
		filtration
		pasteurization
		refermentation
		aged
		style
		dryHopped
		expiration
	}
    ingredients {
		description
		list
		complete
		smokedMalt
	}
    impressions {
        bitterness
        sweetness
        fullness
        power
        hoppyness
        temperature
    }
	price
}
editorial {
	brand {
		cooperation
		contract
		place
	}
	brewering {
		fermentation
		alcoholScope
		filtration
		pasteurization
		refermentation
		aged
		style
		dryHopped
	}
    impressions {
        color
		clarity
    }
	price
}
added
updated
