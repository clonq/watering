var watering = require('../index.js'),
    should = require('chai').should();

describe('API tests', function(){
    it('should return valid data based on actual and forecasted rain levels', function(done){
        watering
        .calculate()
        .then(function(data){
            should.exist(data);
            console.log(data);
            data.should.have.property('volume');
            data.should.have.property('time');
            done();
        })
        .catch(function(err){
            should.not.exist(err);
            done(err);
        })
    });
});