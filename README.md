# Accuweather Node

## Installation Instructions

In your project directory, run:

```npm install --save node-accuweather```

## Usage

Get your AccuWeather API Key at http://developer.accuweather.com/user/register.

```var accuweather = require('node-accuweather')()(YOUR_API_KEY);```

### To Get Current Weather Conditions Based on Keyword Location (In Farenheit)

```javascript
accuweather.getCurrentConditions("New York")
  .then(function(result) {
    console.log(result);
  });

// { Summary: 'Cloudy',
//   Temperature: 61,
//   RealFeel: 57,
//   Precipitation: { Value: 0, Unit: 'in', UnitType: 1 } }
```

#### In Celsius

```javascript
accuweather.getCurrentConditions("New York", {unit: "Celsius"})
  .then(function(result) {
    console.log(result);
  });

//{ Summary: 'Cloudy',
//  Temperature: 16.1,
//  RealFeel: 14,
//  Precipitation: { Value: 0, Unit: 'mm', UnitType: 3 } }
```

Note that this will return the "best match" result based on a keyword search, so "New York"s in other places besides the US won't return a result.

