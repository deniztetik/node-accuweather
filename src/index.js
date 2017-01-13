const request = require('request-promise')

const accuweather = () => {
  return (API_KEY) => {
    const baseUrl = 'http://dataservice.accuweather.com'

    // Gets the AccuWeather-specific location key so that a query can be made to get the weather
    const getLocationKey = (query) => {
      const params = {
        url: baseUrl + '/locations/v1/cities/autocomplete',
        qs: {apikey: API_KEY, q: query},
        json: true
      }
      return request(params)
        .then(([body,]) => body.Key)
        .catch(err => console.error(err))
    }

    const getCurrentConditions = (query, options) => {
      let unit = "Farenheit"
      if (options) {
        unit = options.unit
      }
      return getLocationKey(query, API_KEY)
        .then(key => {
          const params = {
            url: baseUrl + '/currentconditions/v1/' + key,
            qs: {apikey: API_KEY, details: true},
            json: true
          }
          return request(params)
        })
        .then(([body,]) => {
          if (unit == "Farenheit") {
            return {
              Summary: body.WeatherText,
              Temperature: body.Temperature.Imperial.Value,
              RealFeel: body.RealFeelTemperature.Imperial.Value,
              Precipitation: body.Precip1hr.Imperial
            }
          } else {
            return {
              Summary: body.WeatherText,
              Temperature: body.Temperature.Metric.Value,
              RealFeel: body.RealFeelTemperature.Metric.Value,
              Precipitation: body.Precip1hr.Metric
            }
          }
        })
        .catch(err => console.error(err))
    }

    return {
      getCurrentConditions: getCurrentConditions
    }
  }
}

module.exports = accuweather