import chai from 'chai';
import chaiHttp from 'chai-http';

const {expect} = chai;

chai.use(chaiHttp);

describe('Post tests', async () => {
	const post1 = {
		date: new Date('2021-11-06T17:19:00'),
		content: 'This is the first post',
	};
	let app;
	before(async function () {
		app = (await import('../src/index.js')).default;
	});
	it('List nothing', function(done){
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
		chai
			.request(app)
			.post('/v1/posts')
			.send(post1)
			.end((error, res) => {
				expect(res).to.have.status(200);
				// eslint-disable-next-line no-unused-expressions
				expect(res).to.be.json;
				expect(res.body).to.deep.include({
					content: post1.content,
					comments: [],
					likes: [],
				});
				expect(new Date(res.body.date)).to.deep.equal(post1.date);
				// eslint-disable-next-line no-unused-expressions
				expect(res.body._id).to.exist;
				post1._id = res.body._id;
				done();
			});
	});

	it('Get list of one', function(done) {
		chai
			.request(app)
			.get('/v1/posts')
			.end((error, res) => {
				expect(res).to.have.status(200);
				console.log('body', res.body);
				// eslint-disable-next-line no-unused-expressions
				expect(res).to.be.json;
				expect(res.body).to.deep.include([
					{
						_id: post1._id,
						content: post1.content,
						comments: [],
						likes: [],
					}
				]);
				done();
			});
	});

	it('Create second');

	it('Get list of many');

	it('Get individual');

	it('Delete individual');

	it('Get non-existent');
});
