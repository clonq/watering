var config = require('config'),
    request = require('request');

module.exports = {
    /**
    * calculates required watering based on the precipitation intensity, location Eto,
    * plant factor, square footage, irrigation system efficiency and sprinklers flow rate
    * 
    * return required watering volume in liters and required watering time in minutes
    */
    calculate: function(precipIntensity){
        var Eto = config.ETO; //location Eto
        var PF = config.PF; //plant factor
        var SF = config.SF //area in sqf
        var IE = config.IE; //irrigation system efficiency
        var SFR = config.SFR; //sprinkler flow rate in liters/minute

        var waterAmountGPD = (Eto * PF * SF * 0.62 ) / IE;// Gallons of Water per day
        var waterAmountLPD = waterAmountGPD * 3.78541; // liters per day

        var rainVolume = 28.3168*24*SF*precipIntensity/12 // liters per day

        console.log('required water per day:', Math.round(waterAmountLPD), 'L');
        console.log('forecasted rain volume:', Math.round(rainVolume), 'L');

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
}
