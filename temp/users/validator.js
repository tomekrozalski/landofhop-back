db.createCollection("users", {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			additionalProperties: false,
			required: ["_id", "email", "password"],
			properties: {
				_id: {
					bsonType: "objectId",
					description: "must be an objectId and is required"
				},
				email: {
					bsonType: "string",
					description: "must be a string and is required"
				},
				password: {
					bsonType: "string",
					description: "must be a string and is required"
				}
			}
		}
	}
});

const sample = {
	email: "test@test.pl",
	password: "abcdefg",
}
