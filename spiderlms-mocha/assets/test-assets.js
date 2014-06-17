/**
 * Created by rpatel on 5/26/14.
 */


var assert = require('assert');
var request = require('supertest')

var TestURL;
var testURL='http://spiderlms.apiary-mock.com';

var log = require('custom-logger').config({ level: 0 });
log.info().config({ color: 'green' });


describe('Test Assets', function(){

    before(function(done){

        log.info('>>>>> Test Setup')

        //Init TestURL
        TestURL = request(testURL);

        done();


    }) //End of Before

    after(function(done){

        done();

    })

    it('Test1: Get all Assets - GET request', function(done){
        TestURL
            .get('/assets')
            .send({})
            .expect(200)
            .end(function(err, res){


                log.info('Test1 Response: '+JSON.stringify(res.body));
                log.info('Test1: Response code: '+res.statusCode);

                assert.equal(res.statusCode, 200);

                assert.equal(res.id, '1');
                assert.equal(res.body[0].title, 'Laura\'s cool pdf');
                assert.equal(res.body[0].description, 'coolest pdf of allllll time');
                assert.equal(res.body[0].type, 'pdf');
                assert.equal(res.body[0].url, 'https://SpiderLMS.s3.amazonaws.com/12345');
                assert.equal(res.body[0].uploaded_by, '2');
                
                done();

            });

    })

    it('Test2: Create an Asset - POST request', function(done){
        TestURL
            .post('/assets')
            .send({
                "id": 1,
                "title": 'Laura\'s cool pdf',
                "description": 'coolest pdf of allllll time',
                "type": 'pdf',
                "url": 'https://SpiderLMS.s3.amazonaws.com/12345',
                "uploaded_by": 2
            })
            .expect(201)
            .end(function(err, res){

                log.info('Test2 Response: '+JSON.stringify(res.body));
                log.info('Test2: Response code: '+res.statusCode);
                assert.equal(res.statusCode, 201);

                assert.equal(res.body[0].id, '1');
                assert.equal(res.body[0].title, 'Laura\'s cool pdf');
                assert.equal(res.body[0].description, 'coolest pdf of allllll time');
                assert.equal(res.body[0].type, 'pdf');
                assert.equal(res.body[0].url, 'https://SpiderLMS.s3.amazonaws.com/12345');
                assert.equal(res.body[0].uploaded_by, '2');

                done();

            });
    })


})


