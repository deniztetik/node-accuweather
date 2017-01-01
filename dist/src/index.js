'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var request = require('request');

var ACCUWEATHER_API_KEY = 'vbP5s0agPwR3QZNr72jHMPFa1IKTIgfE';

// Gets the AccuWeather-specific location key so that a query can be made to get the weather

var qs = { apikey: ACCUWEATHER_API_KEY };

var getLocationKey = function getLocationKey(query) {
    return new Promise(function (resolve, reject) {
        var params = {
            url: 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete',
            qs: Object.assign(qs, { q: query })
        };
        request(params, function (err, response, body) {
            if (err) reject(err);
            resolve(JSON.parse(body)[0].Key);
        });
    });
};

var getNowWeatherAndRealFeel = function getNowWeatherAndRealFeel(query) {
    return new Promise(function (resolve, reject) {
        getLocationKey(query).then(function (key) {
            var params = {
                url: 'http://dataservice.accuweather.com/currentconditions/v1/' + key,
                qs: Object.assign(qs, { details: true })
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

// getLocationKey("New York").then(key => console.log(key))
// getNowWeatherAndRealFeel("New York").then(result => console.log(result))

exports.default = getNowWeatherAndRealFeel;
//# sourceMappingURL=index.js.map