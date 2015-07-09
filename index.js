var config = require('config'),
    Promise = require('bluebird'),
    request = require('request');

module.exports = {
    /**
    * calculates required watering based on the precipitation intensity, location Eto,
    * plant factor, square footage, irrigation system efficiency and sprinklers flow rate
    * 
    * return required watering volume in liters and required watering time in minutes
    */
    calculate: function(precipIntensity){
        var today = Date.now();
        var yesterday = today-24*60*60*1000;
        var rainYesterday = 0;
        var rainToday = 0;
        return getWeatherDataFor(yesterday)
        .then(function(data){
            rainYesterday = data.precipIntensity * data.precipProbability;
            return getWeatherDataFor(today)
            .then(function(data){
                rainToday = data.precipIntensity * data.precipProbability;
                return getWateringData(rainYesterday, rainToday);
            });
        });
    }
}

function getWeatherDataFor(timestamp) {
    return new Promise(function(resolve, reject){
        var url = 'https://api.forecast.io/forecast/'+config.FORECAST_IO_API_KEY+'/'+config.LAT+','+config.LNG+','+Math.round(timestamp/1000);
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return resolve(JSON.parse(body).daily.data[0]);
            } else {
                if(error) {
                    return reject(error);
                } else {
                    return reject('cannot contact forecast.io');//todo: check actual statusCode
                }
            }
        });
    })
}

function getWateringData(precipIntensityYesterday, precipIntensityToday) {
    var Eto = config.ETO; //location Eto
    var PF = config.PF; //plant factor
    var SF = config.SF //area in sqf
    var IE = config.IE; //irrigation system efficiency
    var SFR = config.SFR; //sprinkler flow rate in liters/minute

    var waterAmountGPD = (Eto * PF * SF * 0.62 ) / IE;// Gallons of Water per day
    var waterAmountLPD = waterAmountGPD * 3.78541; // liters per day

    var precipIntensity = precipIntensityYesterday + precipIntensityToday;
    var rainVolume = 28.3168*24*SF*(precipIntensity/12) // liters per day

    console.log('required water per day:', Math.round(waterAmountLPD), 'L');
    console.log('rain volume yesterday:', Math.round(28.3168*24*SF*(precipIntensityYesterday/12)), 'L');
    console.log('forecasted rain volume:', Math.round(28.3168*24*SF*(precipIntensityToday/12)), 'L');

    var requiredWateringVolume = waterAmountLPD - rainVolume;

    var waterTime = 0;
    if(requiredWateringVolume < 0) {
        // console.log('no watering required');
    } else {
        waterTime = SFR / requiredWateringVolume; // minutes;
        // console.log('required watering time per sprinkler:', Math.round(waterTime/4), 'minutes');
    }
    return {
        volume: requiredWateringVolume,
        time: waterTime
    }
}