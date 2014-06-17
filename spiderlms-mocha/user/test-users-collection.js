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
                assert.equal(res.body[0].name, 'Daniel Cohen');
                assert.equal(res.body[0].email, 'dcohen@mobiquityinc.com');
                assert.equal(res.body[0].role, 'admin');
                assert.equal(res.body[0].manager_id, '');
                assert.notEqual(res.body[0].last_login, '');

                assert.equal(res.body[1].name, 'Elise Carmichael');
                assert.equal(res.body[1].email, 'ecarmichael@mobiquityinc.com');
                assert.equal(res.body[1].role, 'admin');
                assert.equal(res.body[1].manager_id, '');
                assert.notEqual(res.body[1].last_login, '');

                assert.equal(res.body[2].name, 'John Smich');
                assert.equal(res.body[2].email, 'jsmith@mobiquityinc.com');
                assert.equal(res.body[2].role, 'admin');
                assert.equal(res.body[2].manager_id, '');
                assert.notEqual(res.body[2].last_login, '');

                done();
            });

    })

    it('Test2: Create a User - PUT request', function(done){
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

                assert.equal(res.body.id, '4');
                assert.equal(res.body.name, 'Sarah Conner');
                assert.equal(res.body.email, 'sconner@mobiquityinc.com');
                assert.equal(res.body.role, 'user');
                assert.equal(res.body.manager_id, 1);
                assert.notEqual(res.body.last_login, '');

                done();
            });
    })
})


