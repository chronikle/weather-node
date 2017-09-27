const yargs = require('yargs');
const geocode = require('./lib/geocode.js');
const weather = require('./lib/weather.js');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
        
    })
    .help()
    .alias('help', 'h')
    .argv;

//console.log(encodeURIComponent(argv.a));

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
    if(errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        weather.getWeather(results.latitude,results.longitude, (errorMessage, results) => {
            if(errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`The temperature is: ${results.temperature} \u00B0C`);
                console.log(`Feels like: ${results.apparentTemperature} \u00B0C`);
            }
        });
    }
});

