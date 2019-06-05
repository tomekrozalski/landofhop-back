// db.createCollection("places", {
db.runCommand({ collMod: "places",
	validator: {
		$jsonSchema: {
			bsonType: "object",
			additionalProperties: false,
			required: ["_id", "city", "country", "institution", "shortId"],
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
				shortId: {
					bsonType: "string",
					description: "must be a string and is required"
				}
			}
		}
	}
});
