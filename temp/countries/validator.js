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
					bsonType: "array",
					description: "must be an array",
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
								description: "must be a string"
							}
						}
					}
				}
			}
		}
	}
});

const sample = {
	code: "pl",
	name: [
		{
			language: "en",
			value: "Poland" 
		},
		{
			language: "pl",
			value: "Polska" 
		}
	]
};
