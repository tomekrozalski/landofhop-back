db.createCollection("institutions", {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			additionalProperties: false,
			required: ["_id", "badge", "name", "short_id"],
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
					bsonType: "array",
					description: "must be an array and is required",
					items: {
						bsonType: "object",
						description: "must be an object",
						additionalProperties: false,
						required: ["value"],
						properties: {
							"language": {
								enum: ["en", "pl", "de"],
								description: "can only be one of the enum values"
							},
							"value": {
								bsonType: "string",
								description: "must be a string and is required"
							}
						}
					}
				},
				short_id: {
					bsonType: "string",
					description: "must be a string and is required"
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

const sample = {
	"badge": "misiowe",
	"name": [
		{
			"language": "pl",
			"value": "Browar Misiowy"
		},
		{
			"language": "en",
			"value": "Teddy Brewery"
		}
	],
	"short_id": "DdEeWw"
}