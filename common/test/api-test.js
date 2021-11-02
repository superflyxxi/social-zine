import chai from 'chai';
import chaiHttp from 'chai-http';
import {createServer} from '../src/index.js';

const {expect} = chai;
chai.use(chaiHttp);

const server = createServer('Title', '1.0.0', function (app) {
	app.get('/test1', function (req, res) {
		res.send({
			alright: true,
		});
	});
});

describe('Express path', function () {
	it('Found', function (done) {
		chai
			.request(server)
			.get('/test1')
			.end((error, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.deep.include({
					alright: true,
				});
				done();
			});
	});

	it('Not Found', function (done) {
		chai
			.request(server)
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
			chai
				.request(server)
				.get('/api-docs/json')
				.end((error, res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.deep.include({
						openapi: '3.0.0',
						info: {
							title: 'Title',
							version: '1.0.0',
						},
					});
					done();
				});
		});

		it('HTML Swagger', function (done) {
			chai
				.request(server)
				.get('/api-docs')
				.end((error, res) => {
					expect(res).to.have.status(200);
					done();
				});
		});
	});
});
