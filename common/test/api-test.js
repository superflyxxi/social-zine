import * as chai from 'chai';
import {default as chaiHttp, request} from "chai-http";
chai.use(chaiHttp);
import {createServer} from '../src/index.js';

const {expect} = chai;

const server = createServer('Title', function (app) {
	app.get('/test1', function (req, res) {
		res.send({
			alright: true,
		});
	});
});

describe('Express path', function () {
	it('Found', function (done) {
		request.execute(server).get('/test1')
			.end((error, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.deep.include({
					alright: true,
				});
				done();
			});
	});

	it('Not Found', function (done) {
		request.execute(server)
			.get('/something')
			.end((error, res) => {
				expect(res).to.have.status(404);
				expect(res.body).to.deep.include({
					type: '/errors/NOT_FOUND',
					title: 'Not Found',
					status: 404,
					detail: 'GET /something not a valid API.',
				});
				done();
			});
	});

	describe('API Docs', function () {
		it('Title and version', function (done) {
			request.execute(server)
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

		it('HTML Swagger', function (done) {
			request.execute(server)
				.get('/api-docs')
				.end((error, res) => {
					expect(res).to.have.status(200);
					done();
				});
		});
	});
});
