// All images
const removeBeverage = require('./beverages/removeBeverage');

// Cap
const removeCap = require('./beverages/cap/removeCap');
const saveCap = require('./beverages/cap/saveCap');

// Cover
const saveCover = require('./beverages/cover/saveCover');

// Gallery
const removeGallery = require('./beverages/gallery/removeGallery');
const saveGallery = require('./beverages/gallery/saveGallery');

module.exports = {
	removeBeverage,
	removeCap,
	removeGallery,
	saveCap,
	saveCover,
	saveGallery,
};
