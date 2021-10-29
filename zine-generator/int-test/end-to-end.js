import process from 'node:process';
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiAlmost from 'chai-almost';

const {expect} = chai;

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';

chai.use(chaiHttp);
chai.use(chaiAlmost(0.1));

describe('End-to-end integration tests', () => {
	it('Do it', (done) => {
		chai
			.request(BASE_URL)
			.post('/v1/zine')
			.send({
				generator: true,
				from: false,
				to: false,
			})
			.end((error, res) => {
				expect(error).to.equal(null);
				expect(res.status).to.equal(200);
			});
		done();
	}).timeout(30_000);
});
