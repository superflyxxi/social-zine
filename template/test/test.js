import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiAlmost from 'chai-almost';

chai.use(chaiHttp);
chai.use(chaiAlmost(0.1));

describe('End-to-end tests', () => {
	it('Template', (done) => {
		done();
	});
});
