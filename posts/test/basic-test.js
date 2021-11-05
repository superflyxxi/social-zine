import process from 'node:process';
import chai from 'chai';
import chaiHttp from 'chai-http';
import {MongoMemoryServer} from 'mongodb-memory-server';
import app from '../src/index.js';
import {connect as databaseConnect} from '../src/db/index.js';

const {expect} = chai;

chai.use(chaiHttp);
let mongoServer;

describe('Basic test', () => {
	before(async function () {
		// MongoServer = await MongoMemoryServer.create();
		mongoServer = new MongoMemoryServer();
		process.env.MONGODB_URI = await mongoServer.getUri();
		console.log('Set MONGODB_URI=', process.env.MONGODB_URI);
		console.log('Original', mongoServer.getUri());
		databaseConnect();
	});
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
