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
			.put('/api')
			.send({
				input: true,
			})
			.end((error, res) => {
				expect(error).to.equal(null);
				expect(res.status).to.equal(404);
			});
		done();
	}).timeout(30_000);
});
