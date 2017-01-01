'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var request = require('request');

var accuweather = function accuweather() {
  return function (API_KEY) {
    // Gets the AccuWeather-specific location key so that a query can be made to get the weather

    var getLocationKey = function getLocationKey(query) {
      return new Promise(function (resolve, reject) {
        var params = {
          url: 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete',
          qs: { apikey: API_KEY, q: query }
        };
        request(params, function (err, response, body) {
          if (err) reject(err);
          resolve(JSON.parse(body)[0].Key);
        });
      });
    };

    var getNowWeatherAndRealFeel = function getNowWeatherAndRealFeel(query) {
      return new Promise(function (resolve, reject) {
        getLocationKey(query, API_KEY).then(function (key) {
          var params = {
            url: 'http://dataservice.accuweather.com/currentconditions/v1/' + key,
            qs: { apikey: API_KEY, details: true }
          };
          request(params, function (err, response, body) {
            if (err) reject(err);
            resolve({
              Temperature: JSON.parse(body)[0].Temperature.Imperial.Value,
              RealFeel: JSON.parse(body)[0].RealFeelTemperature.Imperial.Value
            });
          });
        });
      });
    };

    return _defineProperty({ getNowWeatherAndRealFeel: getNowWeatherAndRealFeel }, 'getNowWeatherAndRealFeel', getNowWeatherAndRealFeel);
  };
};

module.exports = accuweather;
//# sourceMappingURL=index.js.map