/**
 * Created by rpatel on 5/26/14.
 */


var assert = require('assert');
var request = require('supertest')

var TestURL;
var testURL='http://spiderlms.apiary-mock.com';

var log = require('custom-logger').config({ level: 0 });
log.info().config({ color: 'green' });


describe('Test Video Collection', function(){

    before(function(done){

        log.info('>>>>> Test Setup')

        //Init TestURL
        TestURL = request(testURL);

        done();


    }) //End of Before

    after(function(done){

        done();

    })

    it('Test1: List all Videos - GET request', function(done){
        TestURL
            .get('/videos')
            .send({
            })
            .expect(200)
            .end(function(err, res){


                log.info('Test1 Response: '+JSON.stringify(res.body));
                log.info('Test1: Response code: '+res.statusCode);

                assert.equal(res.statusCode, 200);

                //TODO: Verify response body

                done();

            });

    })

    it('Test2: Create a Video - POST request', function(done){
        TestURL
            .put('/users')
            .send({
                "title": "Javascript Callbacks",
                "description": "This is a description for the Spidey callbacks video.  yay.",
                "url": "https://SpiderLMS.s3.amazonaws.com/23234234LSKDJFSDF",
                "uploaded_by": 2,
                "tags" : "tag1, tag2, tag3, tag4"
            })
            .expect(201)
            .end(function(err, res){

                log.info('Test2 Response: '+JSON.stringify(res.body));
                log.info('Test2: Response code: '+res.statusCode);
                assert.equal(res.statusCode, 201);

                //assert.equal(res.body.id,4);
                //assert.equal(res.body.name,'Sarah Conner');

                done();

            });

    })

    it('Test3: List all VideoViews For a video - GET request', function(done){
        TestURL
            .get('/videosviews/3')
            .send({})
            .expect(200)
            .end(function(err, res){

                log.info('Test2 Response: '+JSON.stringify(res.body));
                log.info('Test2: Response code: '+res.statusCode);
                assert.equal(res.statusCode, 200);

                done();

            });

    })
    it('Test4: List all VideoViews For a video - GET request', function(done){
        TestURL
            .get('/users/4/activities')
            .send({})
            .expect(200)
            .end(function(err, res){

                log.info('Test4 Response: '+JSON.stringify(res.body));
                log.info('Test4: Response code: '+res.statusCode);
                assert.equal(res.statusCode, 200);

                done();

            });

    })



})


