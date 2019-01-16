db.createCollection("countries", {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			additionalProperties: false,
			required: ["_id", "code", "name"],
			properties: {
				_id: {
					bsonType: "objectId",
					description: "must be an objectId and is required"
				},
				code: {
					bsonType: "string",
					description: "must be a string and is required"
				},
				name: {
					bsonType: "object",
					additionalProperties: false,
					description: "must be an object and is required",
					required: ["en", "pl"],
					properties: {
						en: {
							bsonType: "string",
							description: "must be a string and is required"
						},
						pl: {
							bsonType: "string",
							description: "must be a string and is required"
						},
					}
				}
			}
		}
	}
});

const sample = {
	code: "PL",
	name: {
		en: "Poland",
		pl: "Polska"
	}
};