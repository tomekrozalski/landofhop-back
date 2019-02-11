db.createCollection("ingredients", {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			additionalProperties: false,
			required: ["_id", "badge", "name", "type"],
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
				type: {
					enum: ["malt", "hop", "yeast", "appendix"],
					description: "can only be one of the enum values and is required"
				}
			}
		}
	}
});

const sample = {
	badge: "amarillo",
	name: [
		{
			value: "Amarillo" 
		}
	],
	type: "hop"
};
