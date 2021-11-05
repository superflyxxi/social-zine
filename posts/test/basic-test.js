import process from 'node:process';
import chai from 'chai';
import chaiHttp from 'chai-http';
const {expect} = chai;
import {MongoMemoryServer} from 'mongodb-memory-server';

chai.use(chaiHttp);

const mongoServer = await MongoMemoryServer.create();
process.env.MONGODB_URI = await mongoServer.getUri();

const app = (await import('../src/index.js')).default;

describe('Basic test', () => {
	after(async function () {
		await mongoServer.stop();
	});
	it('Root', (done) => {
		chai
			.request(app)
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
		chai
			.request(app)
			.get('/api-docs/json')
			.end((error, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.deep.include({
					openapi: '3.0.0',
					info: {
						title: 'Posts',
					},
				});
				done();
			});
	});
});
