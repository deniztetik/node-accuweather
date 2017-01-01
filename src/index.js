const request = require('request')

const accuweather = API_KEY => {
  // Gets the AccuWeather-specific location key so that a query can be made to get the weather

  const getLocationKey = (query) => new Promise((resolve, reject) => {
    const params = {
      url: 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete',
      qs: {apikey: API_KEY, q: query}
    }
    request(params, (err, response, body) => {
      if (err) reject(err)
      resolve(JSON.parse(body)[0].Key)
    })
  })

  const getNowWeatherAndRealFeel = (query) => {
    return new Promise((resolve, reject) => {
      getLocationKey(query, API_KEY)
        .then(key => {
          const params = {
            url: 'http://dataservice.accuweather.com/currentconditions/v1/' + key,
            qs: {apikey: API_KEY, details: true}
          }
          request(params, (err, response, body) => {
            if (err) reject(err)
            resolve({
              Temperature: JSON.parse(body)[0].Temperature.Imperial.Value,
              RealFeel: JSON.parse(body)[0].RealFeelTemperature.Imperial.Value
            })
          })
        })
    })
  }

  return { getNowWeatherAndRealFeel, getNowWeatherAndRealFeel }
}

module.exports = accuweather