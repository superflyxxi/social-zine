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

	it('List nothing', async function () {
		const res = await chai.request(app).get('/v1/posts');
		expect(res).to.have.status(200);
		// eslint-disable-next-line no-unused-expressions
		expect(res).to.be.json;
		expect(res.body).to.deep.equal([]);
	});

	it('One: create, get, list, delete', async function () {
		const input = {
			date: new Date('2021-11-06T17:19:00'),
			content: 'This is the first post',
		};
		// Create One
		let res = await chai.request(app).post('/v1/posts').send(input);
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

		// Get List
		input._id = res.body._id;
		res = await chai.request(app).get('/v1/posts');
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

		// Get Single
		res = await chai.request(app).get('/v1/posts/' + input._id);
		console.log('body', res.body);
		expect(res).to.have.status(200);
		// eslint-disable-next-line no-unused-expressions
		expect(res).to.be.json;
		expect(res.body).to.deep.include({
			_id: input._id,
			content: input.content,
			comments: [],
			likes: [],
		});
		expect(new Date(res.body.date)).to.deep.equal(input.date);

		// Delete One
		res = await chai.request(app).delete('/v1/posts/' + input._id);
		console.log('body', res.body);
		expect(res, 'delete status').to.have.status(204);
		expect(res.body).to.deep.equal({});

		// Get One
		res = await chai.request(app).get('/v1/posts/' + input._id);
		expect(res, 'get after delete status').to.have.status(404);
		// eslint-disable-next-line no-unused-expressions
		expect(res).to.be.json;
		expect(res.body).to.deep.include({
			type: '/errors/NOT_FOUND',
			title: 'Not Found',
			status: res.status,
			detail: input._id,
		});
	});

	it('Get list of many', async function () {
		let res = await chai.request(app).post('/v1/posts').send({
			date: new Date(),
			content: 'This is the first',
		});
		expect(res).to.have.status(200);
		// eslint-disable-next-line no-unused-expressions
		expect(res).to.be.json;

		res = await chai.request(app).post('/v1/posts').send({
			date: new Date(),
			content: 'This is the second',
		});
		expect(res).to.have.status(200);
		// eslint-disable-next-line no-unused-expressions
		expect(res).to.be.json;

		res = await chai.request(app).get('/v1/posts');
		expect(res).to.have.status(200);
		// eslint-disable-next-line no-unused-expressions
		expect(res).to.be.json;
		expect(res.body.length).to.deep.equal(2);
	});
});
