db.createCollection("places", {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			additionalProperties: false,
			required: ["_id", "country", "location"],
			properties: {
				_id: {
					bsonType: "objectId",
					description: "must be an objectId and is required"
				},
				locality: {
					bsonType: "object",
					additionalProperties: false,
					description: "must be an object and is required",
					required: ["language", "phrase"],
					properties: {
						language: {
							enum: ["PL", "EN"],
							description: "can only be one of the enum values and is required"
						},
						phrase: {
							bsonType: "string",
							description: "must be a string and is required"
						},
					}
				},
				country: {
					bsonType: "objectId",
					description: "must be an objectId and is required"
				},
				institution: {
					bsonType: "objectId",
					description: "must be an objectId"
				},
				location: {
					bsonType: "object",
					additionalProperties: false,
					description: "must be an object and is required",
					required: ["type", "coordinates"],
					properties: {
						type: {
							enum: ["Point"],
							description: "can only be one of the enum values and is required"
						},
						coordinates: {
							bsonType: "array",
							minimum: 1,
							description: "must be an array of decimals and is required",
							items: {
								bsonType: "decimal"
							}
						}
					}
				}
			}
		}
	}
});

const sample = {
	country: ObjectId("5c17ab24edec5f6d01a75eb3"),
	institution: ObjectId("5bbd038f5433eca56a6c00cb"),
	locality: {
		phrase: "Poznań",
		language: "PL"
	},
	location: {
		type: "Point",
		coordinates: [
			NumberDecimal("17.0592778"),
			NumberDecimal("51.1317836")
		]
	}
}
