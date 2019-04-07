// db.createCollection("countries", {
db.runCommand({ collMod: "countries",
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
			value: "Polska" 
		}
	]
};
