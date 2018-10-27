db.createCollection("institutions", {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			additionalProperties: false,
			required: ["_id", "badge", "name"],
			properties: {
				_id: {
					bsonType: "objectId",
					description: "must be an objectId and is required"
				},
				badge: {
					bsonType: "string",
					description: "must be a string and is required"
				},
				name: {
					bsonType: "object",
					additionalProperties: false,
					description: "must be an object and is required",
					required: ["phrase"],
					properties: {
						phrase: {
							bsonType: "string",
							description: "must be a string and is required"
						},
						language: {
							bsonType: "string",
							description: "must be a string"
						}
					}
				},
				website: {
					bsonType: "string",
					description: "must be a string"
				},
				consortium: {
					bsonType: "objectId",
					description: "must be an objectID"
				}
			}
		}
	}
});
