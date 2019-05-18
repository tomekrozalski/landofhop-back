const get = require('lodash/get');
const isEmpty = require('lodash/isEmpty');
const isEqual = require('lodash/isEqual');
const isNumber = require('lodash/isNumber');
const set = require('lodash/set');

const beverage = (values) => {
	const updatedValues = { ...values };

	const cleanUp = (section) => {
		// ------------------------------------------------
		// General

		if (isEmpty(updatedValues[section].general.cooperation)) {
			delete updatedValues[section].general.cooperation;
		}
	
		if (isEmpty(updatedValues[section].general.contract)) {
			delete updatedValues[section].general.contract;
		}

		const coordinates = get(updatedValues, [section, 'general', 'place', 'coordinates']);

		if (coordinates) {
			const formatted = coordinates.map(item => Number(item.toString()));
			set(updatedValues, [section, 'general', 'place', 'coordinates'], formatted);
		}

		const place = get(updatedValues, [section, 'general', 'place']);

		const emptyPlace = {
			country: {},
			institution: {},
		};
	
		if (place && isEqual(place, emptyPlace)) {
			delete updatedValues[section].general.place;
		}

		const general = get(updatedValues, [section, 'general']);

		if (isEmpty(general)) {
			delete updatedValues[section].general;
		}

		// ------------------------------------------------
		// Brewering

		const dryHopped = {
			empty: get(updatedValues, [section, 'brewing', 'dryHopped', 'empty'], false),
			hops: get(updatedValues, [section, 'brewing', 'dryHopped', 'hops'], []),
		}

		if (!dryHopped.empty && isEmpty(dryHopped.hops)) {
			delete updatedValues[section].brewing.dryHopped;
		}

		if (dryHopped.empty && isEmpty(dryHopped.hops)) {
			set(updatedValues, [section, 'brewing', 'dryHopped'], true);
		}

		if (!dryHopped.empty && !isEmpty(dryHopped.hops)) {
			set(updatedValues, [section, 'brewing', 'dryHopped'], dryHopped.hops);
		}

		const brewing = get(updatedValues, [section, 'brewing']);

		if (isEmpty(brewing)) {
			delete updatedValues[section].brewing;
		}

		// ------------------------------------------------
		// Ingredients

		const ingredientsList = get(updatedValues, [section, 'ingredients', 'list']);

		if (ingredientsList && isEmpty(ingredientsList)) {
			delete updatedValues[section].ingredients.list;
		}

		const ingredients = get(updatedValues, [section, 'ingredients']);
	
		if (ingredients && isEmpty(ingredients)) {
			delete updatedValues[section].ingredients;
		}

		// ------------------------------------------------

		if (isEmpty(updatedValues[section])) {
			delete updatedValues[section];
		}
	}

	cleanUp('label');
	cleanUp('producer');
	cleanUp('editorial');

	const fixFormats = (section) => {
		// ------------------------------------------------
		// Brewing

		const extractValue = get(updatedValues, [section, 'brewing', 'extract', 'value']);

		if (extractValue) {
			const formatted = Number(extractValue.toString());
			set(updatedValues, [section, 'brewing', 'extract', 'value'], formatted);
		}
	
		const alcoholValue = get(updatedValues, [section, 'brewing', 'alcohol', 'value']);
	
		if (alcoholValue) {
			const formatted = Number(alcoholValue.toString());
			set(updatedValues, [section, 'brewing', 'alcohol', 'value'], formatted);
		}

		const expirationDateValue = get(updatedValues, [section, 'brewing', 'expirationDate', 'value']);

		if (expirationDateValue) {
			const formatted = Number(expirationDateValue.toString());
			set(updatedValues, [section, 'brewing', 'expirationDate', 'value'], formatted);
		}

		// ------------------------------------------------
		// Impressions

		const bitterness = get(updatedValues, [section, 'impressions', 'bitterness']);
		const sweetness = get(updatedValues, [section, 'impressions', 'sweetness']);
		const fullness = get(updatedValues, [section, 'impressions', 'fullness']);
		const power = get(updatedValues, [section, 'impressions', 'power']);
		const hoppyness = get(updatedValues, [section, 'impressions', 'hoppyness']);

		if (bitterness) {
			const formatted = Number(bitterness.toString());
			set(updatedValues, [section, 'impressions', 'bitterness'], formatted);
		}
	
		if (sweetness) {
			const formatted = Number(sweetness.toString());
			set(updatedValues, [section, 'impressions', 'sweetness'], formatted);
		}
	
		if (fullness) {
			const formatted = Number(fullness.toString());
			set(updatedValues, [section, 'impressions', 'fullness'], formatted);
		}
	
		if (power) {
			const formatted = Number(power.toString());
			set(updatedValues, [section, 'impressions', 'power'], formatted);
		}
	
		if (hoppyness) {
			const formatted = Number(hoppyness.toString());
			set(updatedValues, [section, 'impressions', 'hoppyness'], formatted);
		}

		const temperature = get(updatedValues, [section, 'impressions', 'temperature']);

		if (temperature) {
			const from = Number(temperature.from.toString());
			set(updatedValues, [section, 'impressions', 'temperature', 'from'], from);

			const to = Number(temperature.to.toString());
			set(updatedValues, [section, 'impressions', 'temperature', 'to'], to);
		}

		// ------------------------------------------------
		// Other

		if (get(updatedValues, [section, 'container'])) {
			const formatted = Number(updatedValues[section].container.value.toString());
			set(updatedValues, [section, 'container', 'value'], formatted);
		}

		const price = get(updatedValues, [section, 'price']);

		if (price) {
			const formatted = price.map((item) => ({
				...item,
				value: Number(item.value.toString())
			}));

			set(updatedValues, [section, 'price'], formatted);
		}

		const images = get(updatedValues, [section, 'images']);

		if (images) {
			const formatted = Number(images.toString());
			set(updatedValues, [section, 'images'], formatted);
		}
	}

	fixFormats('label');
	fixFormats('producer');
	fixFormats('editorial');

	return updatedValues;
}

module.exports = beverage;
