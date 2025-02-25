import process from 'node:process';
import {use, expect} from 'chai';
import chaiHttp from 'chai-http';
import chaiAlmost from 'chai-almost';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';

const chai = use(chaiHttp);
use(chaiAlmost(0.1));

describe('End-to-end integration tests', () => {
	it('Do it', (done) => {
		chai.request
			.execute(BASE_URL)
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
