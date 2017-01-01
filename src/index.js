const request = require('request-promise')

const accuweather = () => {
  return (API_KEY) => {
    // Gets the AccuWeather-specific location key so that a query can be made to get the weather
    const getLocationKey = (query) => {
      const params = {
        url: 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete',
        qs: {apikey: API_KEY, q: query}
      }
      return request(params)
        .then(body => {
          return(JSON.parse(body)[0].Key)
        })
        .catch(err => {
          console.error(err);
        })
    }

    const getNowWeatherAndRealFeel = (query) => {
      return getLocationKey(query, API_KEY)
        .then(key => {
          const params = {
            url: 'http://dataservice.accuweather.com/currentconditions/v1/' + key,
            qs: {apikey: API_KEY, details: true}
          }
          return request(params)
        })
        .then(body => {
          console.log('got herrr')
          return {
            Temperature: JSON.parse(body)[0].Temperature.Imperial.Value,
            RealFeel: JSON.parse(body)[0].RealFeelTemperature.Imperial.Value
          }
        })
        .catch(err => {
          if (err) console.error(err)
        })
    }

    return {
      getLocationKey: getLocationKey,
      getNowWeatherAndRealFeel: getNowWeatherAndRealFeel }
  }
}

module.exports = accuweather