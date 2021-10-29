import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiAlmost from 'chai-almost';

chai.use(chaiHttp);
chai.use(chaiAlmost(0.1));

describe('Dummy', () => {
	it('Test', (done) => {
		done();
	});
});
