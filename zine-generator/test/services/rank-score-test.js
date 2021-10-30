import {strict as assert} from 'node:assert';
import rank from '../../src/services/rank-score.js';

describe('Rank Score Tests', () => {
	it('Rank empty items', async () => {
		const res = await rank({}, [], []);
		assert.deepEqual(res, []);
	});

	it('Rank no rules', async () => {
		const res = await rank({}, ['attr1'], [{attr1: 1}, {attr1: 2}]);
		assert.deepEqual(res, [
			{score: 0, scoreBreakdown: {attr1: 0}},
			{score: 0, scoreBreakdown: {attr1: 0}},
		]);
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
