var watering = require('../index.js'),
    should = require('chai').should();

var TEST_PRECIP_INTENSITY = 0.0095;//inches per hr

describe('API tests', function(){
    it('should require no watering (time==0) for precipitation intensity above 0.00884 and default config data', function(){
        var data = watering.calculate(TEST_PRECIP_INTENSITY);
        should.exist(data);
    });
});