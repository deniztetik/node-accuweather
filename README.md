# Accuweather Node

## Installation Instructions

In your project directory, run:

```npm install --save node-accuweather```

## Usage

Get your AccuWeather API Key at http://developer.accuweather.com/user/register.

```var accuweather = require('node-accuweather')()(YOUR_API_KEY);```

### To Get Current Conditions Based on Keyword Location

```javascript
accuweather.getNowWeatherAndRealFeel("New York")
  .then(function(result) {
    console.log(result);
  });

// { Temperature: 34, RealFeel: 29 }
```

Note that this will return the "best match" result based on a keyword search, so New Yorks in other places besides the US won't return a result.

