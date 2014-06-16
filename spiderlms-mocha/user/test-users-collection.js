/**
 * Created by rpatel on 5/26/14.
 */

var bootstrap = require('../bootstrap');
var assert = require('assert');
var log = bootstrap.log;
var TheAPI;

describe('Test User', function(){
    before(function(done){
        log.info('>>>>> Test Setup')
        TheAPI = bootstrap.request(bootstrap.testURL);
        done();
    })

    after(function(done){
        done();
    })

    it('Test1: List all Users - GET request', function(done){
        TheAPI
            .get('/users')
            .send()
            .expect(200)
            .end(function(err, res){
                log.info('Test1 Response: '+JSON.stringify(res.body));
                log.info('Test1: Response code: '+res.statusCode);
                assert.equal(res.statusCode, 200);

                //TODO: Verify each user

                done();
            });

    })

    it('Test2: Create a User - POST request', function(done){
        TheAPI
            .put('/users')
            .send({
                "name": "Sarah Conner",
                "email": "sconner@mobiquityinc.com",
                "role": "user",
                "manager_id": 1
            })
            .expect(201)
            .end(function(err, res){
                log.info('Test2 Response: '+JSON.stringify(res.body));
                log.info('Test2: Response code: '+res.statusCode);
                assert.equal(res.statusCode, 201);
                done();
            });
    })
})


