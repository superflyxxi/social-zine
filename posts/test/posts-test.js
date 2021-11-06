import chai from 'chai';
import chaiHttp from 'chai-http';

const {expect} = chai;

chai.use(chaiHttp);

describe('Post tests', async () => {
	let app;
	before(async function () {
		app = (await import('../src/index.js')).default;
	});
	it('List nothing', (done) => {
		chai
			.request(app)
			.get('/v1/posts')
			.end((error, res) => {
				expect(res).to.have.status(200);
				// eslint-disable-next-line no-unused-expressions
				expect(res).to.be.json;
				expect(res.body).to.deep.equal([]);
				done();
			});
	});

	it('Create one', function (done) {
		const date = new Date();
		chai
			.request(app)
			.post('/v1/posts')
			.send({date, content: 'This is the post'})
			.end((error, res) => {
				console.log('res.body(', res.body, ')');
				expect(res).to.have.status(200);
				// eslint-disable-next-line no-unused-expressions
				expect(res).to.be.json;
				expect(res.body).to.deep.include({
					content: 'This is the post',
					comments: [],
					likes: [],
				});
				expect(new Date(res.body.date)).to.deep.equal(date);
				// eslint-disable-next-line no-unused-expressions
				expect(res.body._id).to.exist;
				done();
			});
	});

	it('Get list of one');

	it('Create second');

	it('Get list of many');

	it('Get individual');

	it('Delete individual');

	it('Get non-existent');
});
