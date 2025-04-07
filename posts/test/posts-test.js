import chai from 'chai';
import chaiHttp from 'chai-http';

const {expect} = chai;

chai.use(chaiHttp);

describe('Post tests', function () {
	let app;
	before(async function () {
		const start = await import('../src/index.js');
		app = start.default;
	});

	it('List nothing', function (done) {
		chai
			.request(app)
			.get('/v1/posts')
			.end(function (error, res) {
				expect(res).to.have.status(200);
				// eslint-disable-next-line no-unused-expressions
				expect(res).to.be.json;
				expect(res.body).to.deep.equal([]);
				done();
			});
	});

	it('One: create, get, list, delete', function (done) {
		const input = {
			date: new Date('2021-11-06T17:19:00'),
			content: 'This is the first post',
		};
		chai
			.request(app)
			.post('/v1/posts')
			.send(input)
			.end(function (error, res) {
				expect(res).to.have.status(200);
				// eslint-disable-next-line no-unused-expressions
				expect(res).to.be.json;
				expect(res.body).to.deep.include({
					content: input.content,
					comments: [],
					likes: [],
				});
				expect(new Date(res.body.date)).to.deep.equal(input.date);
				// eslint-disable-next-line no-unused-expressions
				expect(res.body._id).to.exist;
				input._id = res.body._id;
				chai
					.request(app)
					.get('/v1/posts')
					.end(function (error, res) {
						expect(res).to.have.status(200);
						// eslint-disable-next-line no-unused-expressions
						expect(res).to.be.json;
						expect(res.body.length).to.deep.equal(1);
						expect(res.body[0]).to.deep.include({
							_id: input._id,
							content: input.content,
							comments: [],
							likes: [],
						});
						chai
							.request(app)
							.get('/v1/posts/' + input._id)
							.end(function (error, res) {
								expect(res).to.have.status(200);
								console.log('body', res.body);
								// eslint-disable-next-line no-unused-expressions
								expect(res).to.be.json;
								expect(res.body).to.deep.include({
									_id: input._id,
									content: input.content,
									comments: [],
									likes: [],
								});
								expect(new Date(res.body.date)).to.deep.equal(input.date);
								chai
									.request(app)
									.delete('/v1/posts/' + input._id)
									.end(function (error, res) {
										expect(res, 'delete status').to.have.status(204);
										console.log('body', res.body);

										expect(res.body).to.deep.equal({});
										chai
											.request(app)
											.get('/v1/posts/' + input._id)
											.end(function (error, res) {
												expect(res, 'get after delete status').to.have.status(404);
												// eslint-disable-next-line no-unused-expressions
												expect(res).to.be.json;
												expect(res.body).to.deep.include({
													type: '/errors/NOT_FOUND',
													title: 'Not Found',
													status: res.status,
													detail: input._id,
												});
												done();
											});
									});
							});
					});
			});
	});

	it('Get list of many', function (done) {
		chai
			.request(app)
			.post('/v1/posts')
			.send({
				date: new Date(),
				content: 'This is the first',
			})
			.end(function (error, res) {
				expect(res).to.have.status(200);
				// eslint-disable-next-line no-unused-expressions
				expect(res).to.be.json;
				chai
					.request(app)
					.post('/v1/posts')
					.send({
						date: new Date(),
						content: 'This is the second',
					})
					.end(function (error, res) {
						expect(res).to.have.status(200);
						// eslint-disable-next-line no-unused-expressions
						expect(res).to.be.json;
						chai
							.request(app)
							.get('/v1/posts')
							.end(function (error, res) {
								expect(res).to.have.status(200);
								// eslint-disable-next-line no-unused-expressions
								expect(res).to.be.json;
								expect(res.body.length).to.deep.equal(2);
								done();
							});
					});
			});
	});
});
