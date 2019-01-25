db.createCollection("places", {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			additionalProperties: false,
			required: ["_id", "city", "country", "institution", "short_id"],
			properties: {
				_id: {
					bsonType: "objectId",
					description: "must be an objectId and is required"
				},
				city: {
					bsonType: "array",
					description: "must be an array and is required",
					items: {
						bsonType: "object",
						description: "must be an object",
						additionalProperties: false,
						required: ["language", "value"],
						properties: {
							"language": {
								enum: ["en", "pl"],
								description: "can only be one of the enum values and is required"
							},
							"value": {
								bsonType: "string",
								description: "must be a string and is required"
							}
						}
					}
				},
				country: {
					bsonType: "objectId",
					description: "must be an objectId and is required"
				},
				institution: {
					bsonType: "objectId",
					description: "must be an objectId and is required"
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
				},
				short_id: {
					bsonType: "string",
					description: "must be a string and is required"
				}
			}
		}
	}
});

const sample = {
	country: ObjectId("5c4b7d30ba9dac5be1f17613"),
	institution: ObjectId("5c4b85f2a9c7062b5e55cf18"),
	city: [
		{
			language: "pl",
			value: "Poznań"
		}
	],
	location: {
		type: "Point",
		coordinates: [
			NumberDecimal("17.0592778"),
			NumberDecimal("51.1317836")
		]
	},
	short_id: NanoId,
}
