const request = require('request')

const ACCUWEATHER_API_KEY = 'vbP5s0agPwR3QZNr72jHMPFa1IKTIgfE'

// Gets the AccuWeather-specific location key so that a query can be made to get the weather

const qs = {apikey: ACCUWEATHER_API_KEY}

const getLocationKey = query => new Promise((resolve, reject) => {
    const params = {
        url: 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete',
        qs: Object.assign(qs, {q: query})
    }
    request(params, (err, response, body) => {
        if (err) reject(err)
        resolve(JSON.parse(body)[0].Key)
    })
})

const getNowWeatherAndRealFeel = query => new Promise((resolve, reject) => {
  getLocationKey(query)
    .then(key => {
      const params = {
          url: 'http://dataservice.accuweather.com/currentconditions/v1/' + key,
          qs: Object.assign(qs, {details: true})
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

// getLocationKey("New York").then(key => console.log(key))
// getNowWeatherAndRealFeel("New York").then(result => console.log(result))

export default getNowWeatherAndRealFeel