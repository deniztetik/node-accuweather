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

/*
 { Summary: 'Cloudy',
   Temperature: 61,
   RealFeel: 57,
   Precipitation: { Value: 0, Unit: 'in', UnitType: 1 } }
*/
```

#### In Celsius

```javascript
accuweather.getCurrentConditions("New York", {unit: "Celsius"})
  .then(function(result) {
    console.log(result);
  });

/*
{ Summary: 'Cloudy',
  Temperature: 16.1,
  RealFeel: 14,
  Precipitation: { Value: 0, Unit: 'mm', UnitType: 3 } }
*/
```

Note that this will return the "best match" result based on a keyword search, so "New York"s in other places besides the US won't return a result. See below to query based on specific key.

### Listing Location Keys Based on Keyword Search

Using the same example, but with New York, NY's specific AccuWeather Location Key.

```javascript
accuweather.queryLocations("New York").then(function(result) {
  console.log(result);  
});
/*
[ { Version: 1,
    Key: '349727',
    Type: 'City',
    Rank: 15,
    LocalizedName: 'New York',
    Country: { ID: 'US', LocalizedName: 'United States' },
    AdministrativeArea: { ID: 'NY', LocalizedName: 'New York' } },
  { Version: 1,
    Key: '2531279',
    Type: 'City',
    Rank: 85,
    LocalizedName: 'New York',
    Country: { ID: 'GB', LocalizedName: 'United Kingdom' },
    AdministrativeArea: { ID: 'TWR', LocalizedName: 'Tyne and Wear' } },
  { Version: 1,
    Key: '710949',
    Type: 'City',
    Rank: 85,
    LocalizedName: 'New York',
    Country: { ID: 'GB', LocalizedName: 'United Kingdom' },
    AdministrativeArea: { ID: 'LIN', LocalizedName: 'Lincolnshire' } },
  { Version: 1,
    Key: '338870',
    Type: 'City',
    Rank: 85,
    LocalizedName: 'New York Mills',
    Country: { ID: 'US', LocalizedName: 'United States' },
    AdministrativeArea: { ID: 'MN', LocalizedName: 'Minnesota' } },
  { Version: 1,
    Key: '2128074',
    Type: 'City',
    Rank: 85,
    LocalizedName: 'New York Mills',
    Country: { ID: 'US', LocalizedName: 'United States' },
    AdministrativeArea: { ID: 'NY', LocalizedName: 'New York' } },
  { Version: 1,
    Key: '2642589',
    Type: 'City',
    Rank: 285,
    LocalizedName: 'New York Precinct',
    Country: { ID: 'US', LocalizedName: 'United States' },
    AdministrativeArea: { ID: 'NE', LocalizedName: 'Nebraska' } },
  { Version: 1,
    Key: '2126946',
    Type: 'City',
    Rank: 285,
    LocalizedName: 'New York Township',
    Country: { ID: 'US', LocalizedName: 'United States' },
    AdministrativeArea: { ID: 'MO', LocalizedName: 'Missouri' } } ]
*/
```

### To Get Current Weather Conditions Based on AccuWeather Specific Location Key

Once you have your location key, you can get the current conditions based on that.
```javascript
// Using location key for New York, NY
accuweather.getCurrentConditions("349727") // can be type string or Number
  .then(function(result) {
    console.log(result);
  });

/*
 { Summary: 'Cloudy',
   Temperature: 61,
   RealFeel: 57,
   Precipitation: { Value: 0, Unit: 'in', UnitType: 1 } }
*/
```


