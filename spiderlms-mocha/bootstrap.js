exports.request = require('supertest')

exports.testURL='http://spiderlms.apiary-mock.com';

exports.log = require('custom-logger').config({ level: 0 });
exports.log.info().config({ color: 'green' });
