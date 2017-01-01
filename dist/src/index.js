'use strict';

var request = require('request-promise');

var accuweather = function accuweather() {
  return function (API_KEY) {
    // Gets the AccuWeather-specific location key so that a query can be made to get the weather
    var getLocationKey = function getLocationKey(query) {
      var params = {
        url: 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete',
        qs: { apikey: API_KEY, q: query }
      };
      return request(params).then(function (body) {
        return JSON.parse(body)[0].Key;
      }).catch(function (err) {
        console.error(err);
      });
    };

    var getNowWeatherAndRealFeel = function getNowWeatherAndRealFeel(query) {
      return getLocationKey(query, API_KEY).then(function (key) {
        var params = {
          url: 'http://dataservice.accuweather.com/currentconditions/v1/' + key,
          qs: { apikey: API_KEY, details: true }
        };
        return request(params);
      }).then(function (body) {
        return {
          Temperature: JSON.parse(body)[0].Temperature.Imperial.Value,
          RealFeel: JSON.parse(body)[0].RealFeelTemperature.Imperial.Value
        };
      }).catch(function (err) {
        if (err) console.error(err);
      });
    };

    return {
      getLocationKey: getLocationKey,
      getNowWeatherAndRealFeel: getNowWeatherAndRealFeel };
  };
};

module.exports = accuweather;
//# sourceMappingURL=index.js.map