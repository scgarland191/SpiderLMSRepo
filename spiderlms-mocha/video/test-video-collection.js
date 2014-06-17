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
            .send({})
            .expect(200)
            .end(function(err, res){


                log.info('Test1 Response: '+JSON.stringify(res.body));
                log.info('Test1: Response code: '+res.statusCode);

                assert.equal(res.statusCode, 200);

                //TODO: Verify response body
                assert.equal(res.body[0].id, '1');
                assert.equal(res.body[0].title, 'JSON Syntax');
                assert.equal(res.body[0].description, 'This is a description for the JSON Syntax video!  Yeeeeee haw');
                assert.equal(res.body[0].url, 'https://SpiderLMS.s3.amazonaws.com/1234LKJ');
                assert.equal(res.body[0].uploaded_by, '2');
                assert.notEqual(res.body[0].created_at, '');
                assert.notEqual(res.body[0].updated_at, '');
                assert.equal(res.body[0].tags, 'tag1, tag2, tag3, tag4');
                assert.equal(res.body[0].assets[0].id, '1');
                assert.equal(res.body[0].assets[0].title, 'The slide show');
                assert.equal(res.body[0].assets[0].filetype, 'pptx');
                assert.equal(res.body[0].assets[0].fileurl, 'http://this.is.an.amazon.s3.url');
                assert.equal(res.body[0].assets[1].id, '2');
                assert.equal(res.body[0].assets[1].title, 'The notes');
                assert.equal(res.body[0].assets[1].filetype, 'pdf');
                assert.equal(res.body[0].assets[1].fileurl, 'http://this.is.an.amazon.s3.url');

                done();

            });

    })

    it('Test2: Create a Video - PUT request', function(done){
        TestURL
            .put('/videos')
            .send({
                "title": "Javascript Callbacks",
                "description": "This is a description for the Spidey callbacks video.  yay.",
                "url": "https://SpiderLMS.s3.amazonaws.com/23234234LSKDJFSDF",
                "uploaded_by": 2,
                "tags" : "tag1, tag2, tag3, tag4"
            })
            .expect(201)
            .end(function(err, res){

                log.info('Test2: Response code: '+res.statusCode);
                assert.equal(res.statusCode, 201);

                assert.equal(res.body.id, '2');
                assert.equal(res.body.title, 'Javascript Callbacks');
                assert.equal(res.body.description, 'This is a description for the Spidey callbacks video.  yay.');
                assert.equal(res.body.url, 'https://SpiderLMS.s3.amazonaws.com/23234234LSKDJFSDF');
                assert.equal(res.body.uploaded_by, '2');
                assert.notEqual(res.body.created_at, '');
                assert.notEqual(res.body.updated_at, '');
                assert.equal(res.body.tags, 'tag1, tag2, tag3, tag4');
            

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

                assert.equal(res.body[0].id, '1');
                assert.equal(res.body[0].user_id, '1');
                assert.notEqual(res.body[0].time_watched, '');
                assert.equal(res.body[0].video_id, '1');
                assert.equal(res.body[0].ending_frame, '');

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

                assert.equal(res.body[0].activity_title, 'Video Watching');
                assert.equal(res.body[0].user_id, '1');
                assert.notEqual(res.body[0].text, '');
                assert.equal(res.body[0].video_id, '1');
                assert.equal(res.body[0].ending_frame, '');

                done();

            });

    })



})


