// db.createCollection("institutions", {
db.runCommand({ collMod: "institutions",
	validator: {
		$jsonSchema: {
			bsonType: "object",
			additionalProperties: false,
			required: ["_id", "badge", "name", "shortId"],
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
				shortId: {
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
	"shortId": "DdEeWw"
}