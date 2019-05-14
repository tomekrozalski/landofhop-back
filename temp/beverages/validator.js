db.runCommand({ collMod: "beverages", validator: {

}});

// db.createCollection("beverages", {
db.runCommand({ collMod: "beverages",
	validator: {
		$jsonSchema: {
			bsonType: "object",
			additionalProperties: false,
			required: ["_id", "shortId", "badge", "label", "added"],
			properties: {
				_id: {
					bsonType: "objectId",
					description: "must be an objectId and is required"
				},
				shortId: {
					bsonType: "string",
					description: "must be a string and is required"
				},
				badge: {
					bsonType: "string",
					description: "must be a string and is required"
				},
				label: {
					bsonType: "object",
					additionalProperties: false,
					description: "must be an object and is required",
					required: ["general", "container"],
					properties: {
						general: {
							bsonType: "object",
							additionalProperties: false,
							description: "must be an object and is required",
							required: ["name", "brand"],
							properties: {
								name: {
									bsonType: "array",
									minimum: 1,
									description: "must be an array and is required",
									items: {
										bsonType: "object",
										additionalProperties: false,
										description: "must be an object",
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
								series: {
									bsonType: "array",
									minimum: 1,
									description: "must be an array",
									items: {
										bsonType: "object",
										additionalProperties: false,
										description: "must be an object",
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
								brand: {
									bsonType: "objectId",
									description: "must be an objectId and is required"
								},
								cooperation: {
									bsonType: "array",
									minimum: 1,
									description: "must be an array",
									items: {
										bsonType: "objectId",
										description: "must be an objectId",
									}
								},
								contract: {
									bsonType: "objectId",
									description: "must be an objectId"
								},
								place: {
									bsonType: "objectId",
									description: "must be an objectId"
								},
								tale: {
									bsonType: "array",
									minimum: 1,
									description: "must be an array",
									items: {
										bsonType: "object",
										additionalProperties: false,
										description: "must be an object",
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
								barcode: {
									bsonType: "string",
									description: "must be a string"
								}
							}
						},
						brewing: {
							bsonType: "object",
							additionalProperties: false,
							description: "must be an object",
							properties: {
								fermentation: {
									bsonType: "array",
									minimum: 1,
									description: "must be an array",
									items: {
										enum: ["top", "bottom", "spontaneous"],
										description: "can only be one of the enum values",
									}
								},
								extract: {
									bsonType: "object",
									additionalProperties: false,
									description: "must be an object",
									required: ["relate", "unit", "value"],
									properties: {
										relate: {
											enum: ["weight", "blg", "plato"],
											description: "can only be one of the enum values and is required"
										},
										unit: {
											enum: ["percent", "degree"],
											description: "can only be one of the enum values and is required"
										},
										value: {
											bsonType: "decimal",
											description: "must be a decimal and is required"
										}
									}
								},
								alcohol: {
									bsonType: "object",
									additionalProperties: false,
									description: "must be an object",
									required: ["relate", "unit", "value"],
									properties: {
										relate: {
											enum: ["capacity", "abv"],
											description: "can only be one of the enum values and is required"
										},
										unit: {
											enum: ["percent", "degree"],
											description: "can only be one of the enum values and is required"
										},
										value: {
											bsonType: "decimal",
											description: "must be a decimal and is required"
										},
										scope: {
											enum: ["<0.5%", "±0.5%", "±1.0%"],
											description: "can only be one of the enum values"
										}
									}
								},
								filtration: {
									bsonType: "bool",
									description: "must be a boolean"
								},
								pasteurization: {
									bsonType: "bool",
									description: "must be a boolean"
								},
								refermentation: {
									bsonType: "bool",
									description: "must be a boolean"
								},
								aged: {
									bsonType: "object",
									additionalProperties: false,
									description: "must be an object",
									required: ["type"],
									properties: {
										type: {
											bsonType: "array",
											minimum: 1,
											description: "must be an array",
											items: {
												enum: ["barrel", "wood"],
												description: "can only be one of the enum values"
											}
										},
									}
								},
								style: {
									bsonType: "array",
									minimum: 1,
									description: "must be an array",
									items: {
										bsonType: "object",
										additionalProperties: false,
										description: "must be an object",
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
								dryHopped: {
									bsonType: "object",
									additionalProperties: false,
									description: "must be an object",
									properties: {
										hops: {
											bsonType: "array",
											minimum: 1,
											description: "must be an array",
											items: {
												bsonType: "objectId",
												description: "must be an objectId"
											}
										},
									}
								},
								expirationDate: {
									bsonType: "object",
									additionalProperties: false,
									description: "must be an object",
									required: ["value", "unit"],
									properties: {
										value: {
											bsonType: "decimal",
											description: "must be an decimal and is required"
										},
										unit: {
											enum: ["day", "month", "year"],
											description: "can only be one of the enum values and is required"
										}
									}
								}
							}
						},
						ingredients: {
							bsonType: "object",
							additionalProperties: false,
							description: "must be an object",
							properties: {
								description: {
									bsonType: "array",
									minimum: 1,
									description: "must be an array",
									items: {
										bsonType: "object",
										additionalProperties: false,
										description: "must be an object",
										required: ["complete", "value"],
										properties: {
											"complete": {
												bsonType: "bool",
												description: "must be a boolean and is required"
											},
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
								list: {
									bsonType: "array",
									minimum: 1,
									description: "must be an array",
									items: {
										bsonType: "objectId",
										description: "must be an objectId"
									}
								},
								smokedMalt: {
									bsonType: "bool",
									description: "must be a boolean"
								}
							}
						},
						impressions: {
							bsonType: "object",
							additionalProperties: false,
							description: "must be an object",
							properties: {
								bitterness: {
									bsonType: "decimal",
									minimum: 0,
									maximum: 100,
									description: "must be an decimal in [ 0, 100 ]"
								},
								sweetness: {
									bsonType: "decimal",
									minimum: 0,
									maximum: 100,
									description: "must be an decimal in [ 0, 100 ]"
								},
								fullness: {
									bsonType: "decimal",
									minimum: 0,
									maximum: 100,
									description: "must be an decimal in [ 0, 100 ]"
								},
								power: {
									bsonType: "decimal",
									minimum: 0,
									maximum: 100,
									description: "must be an decimal in [ 0, 100 ]"
								},
								hoppyness: {
									bsonType: "decimal",
									minimum: 0,
									maximum: 100,
									description: "must be an decimal in [ 0, 100 ]"
								},
								temperature: {
									bsonType: "object",
									additionalProperties: false,
									description: "must be an object",
									required: ["from", "to", "unit"],
									properties: {
										from: {
											bsonType: "decimal",
											minimum: 0,
											maximum: 100,
											description: "must be an decimal in [ 0, 100 ] and is required"
										},
										to: {
											bsonType: "decimal",
											minimum: 0,
											maximum: 100,
											description: "must be an decimal in [ 0, 100 ] and is required"
										},
										unit: {
											enum: ["celcius"],
											description: "can only be one of the enum values and is required"
										}
									}
								}
							}
						},
						container: {
							bsonType: "object",
							additionalProperties: false,
							description: "must be an object and is required",
							required: ["color", "material", "unit", "type", "value"],
							properties: {
								color: {
									enum: ["brown", "green", "black", "silver"],
									description: "can only be one of the enum values and is required"
								},
								material: {
									enum: ["glass", "aluminum"],
									description: "can only be one of the enum values and is required"
								},
								unit: {
									enum: ["ml"],
									description: "can only be one of the enum values and is required"
								},
								type: {
									enum: ["bottle", "can"],
									description: "can only be one of the enum values and is required"
								},
								value: {
									bsonType: "decimal",
									description: "must be a decimal and is required"
								},
								hasCapWireFlip: {
									bsonType: "bool",
									description: "must be a boolean"
								}
							}
						},
						price: {
							bsonType: "array",
							minimum: 1,
							description: "must be an array",
							items: {
								bsonType: "object",
								additionalProperties: false,
								description: "must be an object",
								required: ["value", "currency", "date"],
								properties: {
									date: {
										bsonType: "date",
										description: "must be a date and is required"
									},
									value: {
										bsonType: "decimal",
										description: "must be a decimal and is required"
									},
									currency: {
										enum: ["PLN", "EUR"],
										description: "can only be one of the enum values and is required"
									}
								}
							}
						}
					}
				},
				producer: {
					bsonType: "object",
					additionalProperties: false,
					description: "must be an object",
					properties: {
						general: {
							bsonType: "object",
							additionalProperties: false,
							description: "must be an object",
							properties: {
								series: {
									bsonType: "array",
									minimum: 1,
									description: "must be an array",
									items: {
										bsonType: "object",
										additionalProperties: false,
										description: "must be an object",
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
								cooperation: {
									bsonType: "array",
									minimum: 1,
									description: "must be an array",
									items: {
										bsonType: "objectId",
										description: "must be an objectId",
									}
								},
								contract: {
									bsonType: "objectId",
									description: "must be an objectId"
								},
								place: {
									bsonType: "objectId",
									description: "must be an objectId"
								},
								tale: {
									bsonType: "array",
									minimum: 1,
									description: "must be an array",
									items: {
										bsonType: "object",
										additionalProperties: false,
										description: "must be an object",
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
						},
						brewing: {
							bsonType: "object",
							additionalProperties: false,
							description: "must be an object",
							properties: {
								fermentation: {
									bsonType: "array",
									minimum: 1,
									description: "must be an array",
									items: {
										enum: ["top", "bottom", "spontaneous"],
										description: "can only be one of the enum values",
									}
								},
								extract: {
									bsonType: "object",
									additionalProperties: false,
									description: "must be an object",
									required: ["relate", "unit", "value"],
									properties: {
										relate: {
											enum: ["weight", "blg", "plato"],
											description: "can only be one of the enum values and is required"
										},
										unit: {
											enum: ["percent", "degree"],
											description: "can only be one of the enum values and is required"
										},
										value: {
											bsonType: "decimal",
											description: "must be a decimal and is required"
										}
									}
								},
								alcohol: {
									bsonType: "object",
									additionalProperties: false,
									description: "must be an object",
									required: ["relate", "unit", "value"],
									properties: {
										relate: {
											enum: ["capacity", "abv"],
											description: "can only be one of the enum values and is required"
										},
										unit: {
											enum: ["percent", "degree"],
											description: "can only be one of the enum values and is required"
										},
										value: {
											bsonType: "decimal",
											description: "must be a decimal and is required"
										},
										scope: {
											enum: ["<0.5%", "±0.5%", "±1.0%"],
											description: "can only be one of the enum values"
										}
									}
								},
								filtration: {
									bsonType: "bool",
									description: "must be a boolean"
								},
								pasteurization: {
									bsonType: "bool",
									description: "must be a boolean"
								},
								refermentation: {
									bsonType: "bool",
									description: "must be a boolean"
								},
								aged: {
									bsonType: "object",
									additionalProperties: false,
									description: "must be an object",
									required: ["type"],
									properties: {
										type: {
											bsonType: "array",
											minimum: 1,
											description: "must be an array",
											items: {
												enum: ["barrel", "wood"],
												description: "can only be one of the enum values"
											}
										},
									}
								},
								style: {
									bsonType: "array",
									minimum: 1,
									description: "must be an array",
									items: {
										bsonType: "object",
										additionalProperties: false,
										description: "must be an object",
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
								dryHopped: {
									bsonType: "object",
									additionalProperties: false,
									description: "must be an object",
									properties: {
										hops: {
											bsonType: "array",
											minimum: 1,
											description: "must be an array",
											items: {
												bsonType: "objectId",
												description: "must be an objectId"
											}
										},
									}
								},
								expirationDate: {
									bsonType: "object",
									additionalProperties: false,
									description: "must be an object",
									required: ["value", "unit"],
									properties: {
										value: {
											bsonType: "decimal",
											description: "must be an decimal and is required"
										},
										unit: {
											enum: ["day", "month", "year"],
											description: "can only be one of the enum values and is required"
										}
									}
								}
							}
						},
						ingredients: {
							bsonType: "object",
							additionalProperties: false,
							description: "must be an object",
							properties: {
								description: {
									bsonType: "array",
									minimum: 1,
									description: "must be an array",
									items: {
										bsonType: "object",
										additionalProperties: false,
										description: "must be an object",
										required: ["complete", "value"],
										properties: {
											"complete": {
												bsonType: "bool",
												description: "must be a boolean and is required"
											},
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
								list: {
									bsonType: "array",
									minimum: 1,
									description: "must be an array",
									items: {
										bsonType: "objectId",
										description: "must be an objectId"
									}
								},
								smokedMalt: {
									bsonType: "bool",
									description: "must be a boolean"
								}
							}
						},
						impressions: {
							bsonType: "object",
							additionalProperties: false,
							description: "must be an object",
							properties: {
								bitterness: {
									bsonType: "decimal",
									minimum: 0,
									maximum: 100,
									description: "must be an decimal in [ 0, 100 ]"
								},
								sweetness: {
									bsonType: "decimal",
									minimum: 0,
									maximum: 100,
									description: "must be an decimal in [ 0, 100 ]"
								},
								fullness: {
									bsonType: "decimal",
									minimum: 0,
									maximum: 100,
									description: "must be an decimal in [ 0, 100 ]"
								},
								power: {
									bsonType: "decimal",
									minimum: 0,
									maximum: 100,
									description: "must be an decimal in [ 0, 100 ]"
								},
								hoppyness: {
									bsonType: "decimal",
									minimum: 0,
									maximum: 100,
									description: "must be an decimal in [ 0, 100 ]"
								},
								temperature: {
									bsonType: "object",
									additionalProperties: false,
									description: "must be an object",
									required: ["from", "to", "unit"],
									properties: {
										from: {
											bsonType: "decimal",
											minimum: 0,
											maximum: 100,
											description: "must be an decimal in [ 0, 100 ] and is required"
										},
										to: {
											bsonType: "decimal",
											minimum: 0,
											maximum: 100,
											description: "must be an decimal in [ 0, 100 ] and is required"
										},
										unit: {
											enum: ["celcius"],
											description: "can only be one of the enum values and is required"
										}
									}
								}
							}
						},
						price: {
							bsonType: "array",
							minimum: 1,
							description: "must be an array",
							items: {
								bsonType: "object",
								additionalProperties: false,
								description: "must be an object",
								required: ["value", "currency", "date"],
								properties: {
									date: {
										bsonType: "date",
										description: "must be a date and is required"
									},
									value: {
										bsonType: "decimal",
										description: "must be a decimal and is required"
									},
									currency: {
										enum: ["PLN", "EUR"],
										description: "can only be one of the enum values and is required"
									}
								}
							}
						}
					}
				},
				editorial: {
					bsonType: "object",
					additionalProperties: false,
					description: "must be an object",
					properties: {
						general: {
							bsonType: "object",
							additionalProperties: false,
							description: "must be an object",
							properties: {
								cooperation: {
									bsonType: "array",
									minimum: 1,
									description: "must be an array",
									items: {
										bsonType: "objectId",
										description: "must be an objectId",
									}
								},
								contract: {
									bsonType: "objectId",
									description: "must be an objectId"
								},
								place: {
									bsonType: "objectId",
									description: "must be an objectId"
								}
							}
						},
						brewing: {
							bsonType: "object",
							additionalProperties: false,
							description: "must be an object",
							properties: {
								fermentation: {
									bsonType: "array",
									minimum: 1,
									description: "must be an array",
									items: {
										enum: ["top", "bottom", "spontaneous"],
										description: "can only be one of the enum values",
									}
								},
								alcohol: {
									bsonType: "object",
									additionalProperties: false,
									description: "must be an object",
									properties: {
										scope: {
											enum: ["<0.5%", "±0.5%", "±1.0%"],
											description: "can only be one of the enum values"
										}
									}
								},
								filtration: {
									bsonType: "bool",
									description: "must be a boolean"
								},
								pasteurization: {
									bsonType: "bool",
									description: "must be a boolean"
								},
								refermentation: {
									bsonType: "bool",
									description: "must be a boolean"
								},
								aged: {
									bsonType: "object",
									additionalProperties: false,
									description: "must be an object",
									required: ["type"],
									properties: {
										type: {
											bsonType: "array",
											minimum: 1,
											description: "must be an array",
											items: {
												enum: ["barrel", "wood"],
												description: "can only be one of the enum values"
											}
										},
									}
								},
								style: {
									bsonType: "array",
									minimum: 1,
									description: "must be an array",
									items: {
										bsonType: "object",
										additionalProperties: false,
										description: "must be an object",
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
								dryHopped: {
									bsonType: "object",
									additionalProperties: false,
									description: "must be an object",
									properties: {
										hops: {
											bsonType: "array",
											minimum: 1,
											description: "must be an array",
											items: {
												bsonType: "objectId",
												description: "must be an objectId"
											}
										},
									}
								},
							}
						},
						impressions: {
							bsonType: "object",
							additionalProperties: false,
							description: "must be an object",
							properties: {
								color: {
									bsonType: "string",
									pattern: "^#([a-f0-9]){6}$",
									description: "must be a hex string and match the regular expression pattern"
								},
								clarity: {
									enum: ["crystalline", "clear", "opalescent", "misty", "hazy", "muddy"],
									description: "can only be one of the enum values"
								}
							}
						},
						price: {
							bsonType: "array",
							minimum: 1,
							description: "must be an array",
							items: {
								bsonType: "object",
								additionalProperties: false,
								description: "must be an object",
								required: ["value", "currency", "date"],
								properties: {
									date: {
										bsonType: "date",
										description: "must be a date and is required"
									},
									value: {
										bsonType: "decimal",
										description: "must be a decimal and is required"
									},
									currency: {
										enum: ["PLN", "EUR"],
										description: "can only be one of the enum values and is required"
									}
								}
							}
						},
						images: {
							bsonType: "decimal",
							description: "must be a decimal"
						},
						cap: {
							bsonType: "bool",
							description: "must be a boolean"
						},
					},
				},
				added: {
					bsonType: "date",
					description: "must be a date and is required"
				},
				updated: {
					bsonType: "date",
					description: "must be a date"
				}
			}
		}
	}
})
