'use strict';

const fs = require('fs');
const validate = require('jsonschema').validate;
const expect = require('chai').expect;

const client = require('..');
const config = client.config;

config.apikey = process.env.APIXUKEY;
const apixu = new client.Apixu(config);

const schema = JSON.parse(fs.readFileSync(__dirname + '/history.json'));

describe('History', () => {
	it('it should retrieve historical weather information by given query and date', (done) => {
		apixu.history('London', new Date()).then((history) => {
			const v = validate(history, schema);
			expect(v.errors, v).to.have.length(0);
			done();
		}, (err) => {
			console.log(err)
		});
	});

	it('it should return an error if an invalid date instance sent', (done) => {
		apixu.history('London', "date").then(() => {
		}, (err) => {
			expect(err).to.be.an("object")
			done();
		});
	});
});
