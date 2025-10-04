import * as chai from 'chai';
import {default as chaiHttp, request} from "chai-http";
import app from '../../src/index.js';

chai.use(chaiHttp);
const {expect} = chai;

describe('Basic test', () => {
	it('Root', (done) => {
		request.execute(app)
			.get('/')
			.end((error, res) => {
				expect(res).to.have.status(404);
				expect(res.body).to.deep.include({
					type: '/errors/NOT_FOUND',
					title: 'Not Found',
					status: res.status,
					detail: 'GET / not a valid API.',
				});
				expect(res.body).to.have.property('instance');
				done();
			});
	});
	it('API Docs JSON', (done) => {
		request.execute(app)
			.get('/api-docs/json')
			.end((error, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.deep.include({
					openapi: '3.0.0',
					info: {
						title: 'Zines',
					},
				});
				done();
			});
	});
});
