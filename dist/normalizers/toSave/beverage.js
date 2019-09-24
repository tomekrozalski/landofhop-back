"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const mongodb = require('mongodb');

const get = require('lodash/get');

const isBoolean = require('lodash/isBoolean');

const isEmpty = require('lodash/isEmpty');

const isNumber = require('lodash/isNumber');

const {
  ObjectId
} = mongodb;

const beverage = ({
  badge,
  label,
  producer,
  editorial,
  added,
  updated,
  shortId
}) => {
  const values = _objectSpread({
    badge,
    label: _objectSpread({
      general: _objectSpread({
        name: label.general.name
      }, get(label, 'general.series') && {
        series: get(label, 'general.series')
      }, {
        brand: new ObjectId(label.general.brand)
      }, get(label, 'general.cooperation') && {
        cooperation: get(label, 'general.cooperation', []).map(item => new ObjectId(item))
      }, {}, get(label, 'general.contract') && {
        contract: new ObjectId(get(label, 'general.contract'))
      }, {}, get(label, 'general.place') && {
        place: new ObjectId(get(label, 'general.place'))
      }, {}, get(label, 'general.tale') && {
        tale: get(label, 'general.tale')
      }, {}, get(label, 'general.barcode') && {
        barcode: get(label, 'general.barcode')
      }),
      brewing: _objectSpread({}, get(label, 'brewing.fermentation') && {
        fermentation: get(label, 'brewing.fermentation')
      }, {}, get(label, 'brewing.extract') && {
        extract: _objectSpread({}, get(label, 'brewing.extract', {}), {
          value: get(label, 'brewing.extract.value').toString()
        })
      }, {}, get(label, 'brewing.alcohol') && {
        alcohol: _objectSpread({}, get(label, 'brewing.alcohol', {}), {
          value: get(label, 'brewing.alcohol.value').toString()
        })
      }, {}, isBoolean(get(label, 'brewing.filtration')) && {
        filtration: get(label, 'brewing.filtration')
      }, {}, isBoolean(get(label, 'brewing.pasteurization')) && {
        pasteurization: get(label, 'brewing.pasteurization')
      }, {}, get(label, 'brewing.aged') && {
        aged: get(label, 'brewing.aged', []).map(({
          previousContent,
          time,
          type,
          wood
        }) => _objectSpread({}, previousContent && {
          previousContent
        }, {}, time && {
          time: {
            unit: time.unit,
            value: time.value.toString()
          }
        }, {}, type && {
          type
        }, {}, wood && {
          wood
        }))
      }, {}, get(label, 'brewing.style') && {
        style: get(label, 'brewing.style')
      }, {}, get(label, 'brewing.dryHopped') && {
        dryHopped: get(label, 'brewing.dryHopped') === true ? true : {
          hops: get(label, 'brewing.dryHopped').map(item => new ObjectId(item))
        }
      }, {}, get(label, 'brewing.expirationDate') && {
        expirationDate: {
          value: get(label, 'brewing.expirationDate.value').toString(),
          unit: get(label, 'brewing.expirationDate.unit')
        }
      }),
      ingredients: _objectSpread({}, get(label, 'ingredients.description') && {
        description: get(label, 'ingredients.description')
      }, {}, get(label, 'ingredients.list') && {
        list: get(label, 'ingredients.list', []).map(item => new ObjectId(item))
      }, {}, get(label, 'ingredients.smokedMalt') === true && {
        smokedMalt: true
      }),
      impressions: _objectSpread({}, isNumber(get(label, 'impressions.bitterness')) && {
        bitterness: get(label, 'impressions.bitterness').toString()
      }, {}, isNumber(get(label, 'impressions.sweetness')) && {
        sweetness: get(label, 'impressions.sweetness').toString()
      }, {}, isNumber(get(label, 'impressions.fullness')) && {
        fullness: get(label, 'impressions.fullness').toString()
      }, {}, isNumber(get(label, 'impressions.power')) && {
        power: get(label, 'impressions.power').toString()
      }, {}, isNumber(get(label, 'impressions.hoppyness')) && {
        hoppyness: get(label, 'impressions.hoppyness').toString()
      }, {}, get(label, 'impressions.temperature') && {
        temperature: {
          from: get(label, 'impressions.temperature.from').toString(),
          to: get(label, 'impressions.temperature.to').toString(),
          unit: get(label, 'impressions.temperature.unit')
        }
      }),
      container: _objectSpread({}, get(label, 'container', {}), {
        value: get(label, 'container.value').toString()
      })
    }, get(label, 'price') && {
      price: get(label, 'price', {}).map(({
        currency,
        date,
        value
      }) => ({
        currency,
        date: new Date(date),
        value: value.toString()
      }))
    }),
    producer: _objectSpread({
      general: _objectSpread({}, get(producer, 'general.series') && {
        series: get(producer, 'general.series')
      }, {}, get(producer, 'general.cooperation') && {
        cooperation: get(producer, 'general.cooperation', []).map(item => new ObjectId(item))
      }, {}, get(producer, 'general.contract') && {
        contract: new ObjectId(get(producer, 'general.contract'))
      }, {}, get(producer, 'general.place') && {
        place: new ObjectId(get(producer, 'general.place'))
      }, {}, get(producer, 'general.tale') && {
        tale: get(producer, 'general.tale')
      }),
      brewing: _objectSpread({}, get(producer, 'brewing.fermentation') && {
        fermentation: get(producer, 'brewing.fermentation')
      }, {}, get(producer, 'brewing.extract') && {
        extract: _objectSpread({}, get(producer, 'brewing.extract', {}), {
          value: get(producer, 'brewing.extract.value').toString()
        })
      }, {}, get(producer, 'brewing.alcohol') && {
        alcohol: _objectSpread({}, get(producer, 'brewing.alcohol', {}), {
          value: get(producer, 'brewing.alcohol.value').toString()
        })
      }, {}, isBoolean(get(producer, 'brewing.filtration')) && {
        filtration: get(producer, 'brewing.filtration')
      }, {}, isBoolean(get(producer, 'brewing.pasteurization')) && {
        pasteurization: get(producer, 'brewing.pasteurization')
      }, {}, get(producer, 'brewing.aged') && {
        aged: get(producer, 'brewing.aged', []).map(({
          previousContent,
          time,
          type,
          wood
        }) => _objectSpread({}, previousContent && {
          previousContent
        }, {}, time && {
          time: {
            unit: time.unit,
            value: time.value.toString()
          }
        }, {}, type && {
          type
        }, {}, wood && {
          wood
        }))
      }, {}, get(producer, 'brewing.style') && {
        style: get(producer, 'brewing.style')
      }, {}, get(producer, 'brewing.dryHopped') && {
        dryHopped: _objectSpread({}, get(producer, 'brewing.dryHopped').length > 0 && {
          hops: get(producer, 'brewing.dryHopped').map(item => new ObjectId(item))
        })
      }, {}, get(producer, 'brewing.expirationDate') && {
        expirationDate: {
          value: get(producer, 'brewing.expirationDate.value').toString(),
          unit: get(producer, 'brewing.expirationDate.unit')
        }
      }),
      ingredients: _objectSpread({}, get(producer, 'ingredients.description') && {
        description: get(producer, 'ingredients.description')
      }, {}, get(producer, 'ingredients.list') && {
        list: get(producer, 'ingredients.list', []).map(item => new ObjectId(item))
      }, {}, get(producer, 'ingredients.smokedMalt') === true && {
        smokedMalt: true
      }),
      impressions: _objectSpread({}, isNumber(get(producer, 'impressions.bitterness')) && {
        bitterness: get(producer, 'impressions.bitterness').toString()
      }, {}, isNumber(get(producer, 'impressions.sweetness')) && {
        sweetness: get(producer, 'impressions.sweetness').toString()
      }, {}, isNumber(get(producer, 'impressions.fullness')) && {
        fullness: get(producer, 'impressions.fullness').toString()
      }, {}, isNumber(get(producer, 'impressions.power')) && {
        power: get(producer, 'impressions.power').toString()
      }, {}, isNumber(get(producer, 'impressions.hoppyness')) && {
        hoppyness: get(producer, 'impressions.hoppyness').toString()
      }, {}, get(producer, 'impressions.temperature') && {
        temperature: {
          from: get(producer, 'impressions.temperature.from').toString(),
          to: get(producer, 'impressions.temperature.to').toString(),
          unit: get(producer, 'impressions.temperature.unit')
        }
      })
    }, get(producer, 'price') && {
      price: get(producer, 'price', {}).map(({
        currency,
        date,
        value
      }) => ({
        currency,
        date: new Date(date),
        value: value.toString()
      }))
    }),
    editorial: _objectSpread({
      general: _objectSpread({}, get(editorial, 'general.cooperation') && {
        cooperation: get(editorial, 'general.cooperation', []).map(item => new ObjectId(item))
      }, {}, get(editorial, 'general.contract') && {
        contract: new ObjectId(get(editorial, 'general.contract'))
      }, {}, get(editorial, 'general.place') && {
        place: new ObjectId(get(editorial, 'general.place'))
      }),
      brewing: _objectSpread({}, get(editorial, 'brewing.fermentation') && {
        fermentation: get(editorial, 'brewing.fermentation')
      }, {}, get(editorial, 'brewing.alcoholScope') && {
        alcohol: {
          scope: get(editorial, 'brewing.alcoholScope')
        }
      }, {}, isBoolean(get(editorial, 'brewing.filtration')) && {
        filtration: get(editorial, 'brewing.filtration')
      }, {}, isBoolean(get(editorial, 'brewing.pasteurization')) && {
        pasteurization: get(editorial, 'brewing.pasteurization')
      }, {}, get(editorial, 'brewing.aged') && {
        aged: get(editorial, 'brewing.aged', []).map(({
          previousContent,
          time,
          type,
          wood
        }) => _objectSpread({}, previousContent && {
          previousContent
        }, {}, time && {
          time: {
            unit: time.unit,
            value: time.value.toString()
          }
        }, {}, type && {
          type
        }, {}, wood && {
          wood
        }))
      }, {}, get(editorial, 'brewing.style') && {
        style: get(editorial, 'brewing.style')
      }, {}, get(editorial, 'brewing.dryHopped') && {
        dryHopped: _objectSpread({}, get(editorial, 'brewing.dryHopped').length > 0 && {
          hops: get(editorial, 'brewing.dryHopped').map(item => new ObjectId(item))
        })
      }),
      impressions: _objectSpread({}, get(editorial, 'impressions.color') && {
        color: get(editorial, 'impressions.color')
      }, {}, get(editorial, 'impressions.clarity') && {
        clarity: get(editorial, 'impressions.clarity')
      })
    }, get(editorial, 'images') && {
      images: get(editorial, 'images').toString()
    }, {}, get(editorial, 'cap') && get(editorial, 'cap') === true && {
      cap: true
    }, {}, get(editorial, 'price') && {
      price: get(editorial, 'price', {}).map(({
        currency,
        date,
        value
      }) => ({
        currency,
        date: new Date(date),
        value: value.toString()
      }))
    }, {}, get(editorial, 'notes') && {
      notes: get(editorial, 'notes')
    }),
    added: added ? new Date(added) : new Date()
  }, updated && {
    updated: new Date(updated)
  }, {}, shortId && {
    shortId
  }); // -----------------------------------
  // Clean up label


  if (isEmpty(values.label.brewing)) {
    delete values.label.brewing;
  }

  if (isEmpty(values.label.ingredients)) {
    delete values.label.ingredients;
  }

  if (isEmpty(values.label.impressions)) {
    delete values.label.impressions;
  } // -----------------------------------
  // Clean up producer


  if (isEmpty(values.producer.general)) {
    delete values.producer.general;
  }

  if (isEmpty(values.producer.brewing)) {
    delete values.producer.brewing;
  }

  if (isEmpty(values.producer.ingredients)) {
    delete values.producer.ingredients;
  }

  if (isEmpty(values.producer.impressions)) {
    delete values.producer.impressions;
  }

  if (isEmpty(values.producer)) {
    delete values.producer;
  } // -----------------------------------
  // Clean up editorial


  if (isEmpty(values.editorial.general)) {
    delete values.editorial.general;
  }

  if (isEmpty(values.editorial.brewing)) {
    delete values.editorial.brewing;
  }

  if (isEmpty(values.editorial.impressions)) {
    delete values.editorial.impressions;
  }

  if (isEmpty(values.editorial)) {
    delete values.editorial;
  }

  return values;
};

module.exports = beverage;