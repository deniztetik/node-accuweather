'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var request = require('request-promise');

var accuweather = function accuweather() {
  return function (API_KEY) {
    var baseUrl = 'http://dataservice.accuweather.com';

    // Queries all location keys based on keyword search
    var queryLocations = function queryLocations(query) {
      var params = {
        url: baseUrl + '/locations/v1/cities/autocomplete',
        qs: { apikey: API_KEY, q: query },
        json: true
      };
      return request(params).then(function (resp) {
        return resp;
      }).catch(function (err) {
        return console.error(err);
      });
    };

    // Gets the first result for AccuWeather-specific location keys so that a query can be made to get the weather
    var getFirstLocationKey = function getFirstLocationKey(query) {
      return queryLocations(query).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 1),
            body = _ref2[0];

        return body.Key;
      }).catch(function (err) {
        return console.error(err);
      });
    };

    var getCurrentConditions = function getCurrentConditions(query, options) {
      var unit = options ? options.unit : "Farenheit";
      return getFirstLocationKey(query, API_KEY).then(function (key) {
        var params = {
          url: baseUrl + '/currentconditions/v1/' + key,
          qs: { apikey: API_KEY, details: true },
          json: true
        };
        return request(params);
      }).then(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 1),
            body = _ref4[0];

        if (unit == "Farenheit") {
          return {
            Summary: body.WeatherText,
            Temperature: body.Temperature.Imperial.Value,
            RealFeel: body.RealFeelTemperature.Imperial.Value,
            Precipitation: body.Precip1hr.Imperial
          };
        } else {
          return {
            Summary: body.WeatherText,
            Temperature: body.Temperature.Metric.Value,
            RealFeel: body.RealFeelTemperature.Metric.Value,
            Precipitation: body.Precip1hr.Metric
          };
        }
      }).catch(function (err) {
        return console.error(err);
      });
    };

    return {
      queryLocations: queryLocations,
      getCurrentConditions: getCurrentConditions
    };
  };
};

module.exports = accuweather;
//# sourceMappingURL=index.js.map