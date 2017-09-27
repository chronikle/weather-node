const request = require('request');

var toCelsius = (t) => {
    return ((5/9) * (t-32)).toFixed(2);
};

let getWeather = (lat,lng, callback) => {
    request({
        //url: `https://api.darksky.net/forecast/244c81554aa79056afcb3f7a0001d14d/${results.latitude},${results.longitude}`,
        url: `https://api.darksky.net/forecast/244c81554aa79056afcb3f7a0001d14d/${lat},${lng}`,
        json: true
    }, (error,response,body) => {
            if (!error && response.statusCode === 200) {
                callback(undefined, {
                    temperature: toCelsius(body.currently.temperature),
                    apparentTemperature: toCelsius(body.currently.apparentTemperature)
                });
            } else callback('Unable to fetch weather.');
        }
    );
}

module.exports = {
    getWeather
};