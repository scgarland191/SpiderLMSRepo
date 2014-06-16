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

    it('Test1: Retrieve a User - GET request', function(done){
        TheAPI
            .get('/users/4')
            .send()
            .expect(200)
            .end(function(err, res){
                log.info('Test1 Response: '+JSON.stringify(res.body));
                log.info('Test1: Response code: '+res.statusCode);

                assert.equal(res.statusCode, 200);
                assert.equal(res.body.name, 'Sarah Conner');
                assert.equal(res.body.email, 'sconner@mobiquityinc.com');
                assert.equal(res.body.manager_id, 1);
                assert.notEqual(res.body.last_login, '');

                done();
            });
    })

    it('Test2: Update a User - POST request', function(done){
        TheAPI
            .post('/users/4')
            .send({
                "id": 4,
                "name": "Sarah Conner",
                "email": "sconner@mobiquityinc.com",
                "role": "user",
                "manager_id": 1,
                "last_login": "2014-03-17 10:10:10"
            } )
            .expect(204)
            .end(function(err, res){
                log.info('Test2: Response: '+JSON.stringify(res.body));
                log.info('Test2: Response code: '+res.statusCode);
                assert.equal(res.statusCode, 204);

                done();
            });

    })

    it('Test3: Remove a User - DELETE request', function(done){
        TheAPI
            .del('/users/4')
            .send()
            .expect(204)
            .end(function(err, res){
                log.info('Test3: Response: '+JSON.stringify(res.body));
                log.info('Test3: Response code: '+res.statusCode);
                assert.equal(res.statusCode, 204);
                done();
            });
    })
})


