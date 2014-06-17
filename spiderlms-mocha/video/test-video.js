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

    it('Test1: Create a Video - PATCH request', function(done){
        TestURL
            .patch('/videos/4')
            .send({
                "id": 2,
                "title": "Updating the video title!",
                "description": "This is a description for the Spidey callbacks video.  yay.",
                "url": "https://SpiderLMS.s3.amazonaws.com/12345",
                "tags" : "tag1, tag2, tag3, tag4, tags5"
            })
            .expect(201)
            .end(function(err, res){


                log.info('Test1 Response: '+JSON.stringify(res.body));
                log.info('Test1: Response code: '+res.statusCode);

                assert.equal(res.statusCode, 201);

                log.warn("res.body.id = "+res.body.id);

                assert.equal(res.body.id, '2');
                assert.equal(res.body.title, 'Updating the video title!');
                assert.equal(res.body.description, 'This is a description for the Spidey callbacks video.  yay.');
                assert.equal(res.body.url, 'https://SpiderLMS.s3.amazonaws.com/12345');
                assert.equal(res.body.tags, 'tag1, tag2, tag3, tag4, tags5');
                assert.notEqual(res.body.created_at, '');
                assert.notEqual(res.body.updated_at, '');
                
                done();

            });

    })

    it('Test2: Retrieve a Video - GET request', function(done){
        TestURL
            .get('/videos/3')
            .send({})
            .expect(200)
            .end(function(err, res){

                log.info('Test2 Response: '+JSON.stringify(res.body));
                log.info('Test2: Response code: '+res.statusCode);
                assert.equal(res.statusCode, 200);

                assert.equal(res.body.id, '2');
                assert.equal(res.body.title, 'Javascript Callbacks');
                assert.equal(res.body.description, 'This is a description for the Spidey callbacks video.  yay.');
                assert.equal(res.body.url, 'https://SpiderLMS.s3.amazonaws.com/23234234LSKDJFSDF');
                assert.equal(res.body.tags, 'tag1, tag2, tag3, tag4');
                assert.notEqual(res.body.created_at, '');
                assert.notEqual(res.body.updated_at, '');
                assert.equal(res.body.assets[0].id, '1')
                assert.equal(res.body.assets[0].title, 'The slide show')
                assert.equal(res.body.assets[0].filetype, 'pptx')
                assert.equal(res.body.assets[0].fileurl, 'http://this.is.an.amazon.s3.url')
                assert.equal(res.body.assets[1].id, '2')
                assert.equal(res.body.assets[1].title, 'The notes')
                assert.equal(res.body.assets[1].filetype, 'pdf')
                assert.equal(res.body.assets[1].fileurl, 'http://this.is.an.amazon.s3.url')

                done();

            });

    })

    it('Test3: Remove a Video - DELETE request', function(done){
        TestURL
            .del('/videos/3')
            .send({})
            .expect(204)
            .end(function(err, res){

                log.info('Test2 Response: '+JSON.stringify(res.body));
                log.info('Test2: Response code: '+res.statusCode);
                assert.equal(res.statusCode, 204);

                done();

            });

    })




})


