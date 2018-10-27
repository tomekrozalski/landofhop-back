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
				city: {
					bsonType: "string",
					description: "must be a string"
				},
				country: {
					bsonType: "string",
					description: "must be a string and is required"
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
							bsonType: ["decimal"],
							minimum: 1,
							description: "must be an array of decimals and is required",
						}
					}
				}
			}
		}
	}
});

const sample = {
	city: "Wrocław",
	country: "PL",
	institution: ObjectId(),
	location: {
		type: "Point",
		coordinates: [
			17.0592778,
			51.1317836
		]
	}
}
