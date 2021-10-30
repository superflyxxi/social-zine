import service from '../../src/services/rank-score.js';
import { strict as assert } from 'assert';

describe('Rank Score Tests', () => {
	it('Rank empty items', (done) => {
		const res = service.rank({}, [], []);
		assert.deepEqual(res, []);
		done();
	});

	it('Rank no rules', (done) => {
		assert.fail('Missing tests');
		done();
	});

	it('Rank empty ranklist', (done) => {
		assert.fail('Missing tests');
		done();
	});

	it('Rank single', (done) => {
		assert.fail('Missing tests');
		done();
	});

	it('Rank multiple', (done) => {
		assert.fail('Missing tests');
		done();
	});

	it('Rank number', (done) => {
		assert.fail('Missing tests');
		done();
	});

	it('Rank version', (done) => {
		assert.fail('Missing tests');
		done();
	});

	it('Rank all types', (done) => {
		assert.fail('Missing tests');
		done();
	});
});
