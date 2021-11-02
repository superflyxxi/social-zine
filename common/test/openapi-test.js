import chai from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import {getApiDocsRouter} from '../src/index.js';

const {expect} = chai;
chai.use(chaiHttp);

function createApp(title, version) {
	const app = express();
	app.use(express.json());
	app.use('/api-docs', getApiDocsRouter(title, version));
	return app;
}

describe('Api Docs Router', function () {
	it('Title but no version', function (done) {
		chai
			.request(createApp('Title'))
			.get('/api-docs/json')
			.end((error, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.deep.include({
					openapi: '3.0.0',
					info: {
						title: 'Title',
					},
				});
				done();
			});
	});

	it('Title and version', function (done) {
		chai
			.request(createApp('Title', '0.1.2'))
			.get('/api-docs/json')
			.end((error, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.deep.include({
					openapi: '3.0.0',
					info: {
						title: 'Title',
						version: '0.1.2',
					},
				});
				done();
			});
	});

	it('No title or version', function (done) {
		chai
			.request(createApp())
			.get('/api-docs/json')
			.end((error, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.deep.include({
					openapi: '3.0.0',
					info: {},
				});
				done();
			});
	});

	it('HTML Swagger', function (done) {
		chai
			.request(createApp('Title', '1.2.3'))
			.get('/api-docs')
			.end((error, res) => {
				expect(res).to.have.status(200);
				done();
			});
	});
});
