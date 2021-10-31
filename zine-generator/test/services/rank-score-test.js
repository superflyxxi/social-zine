import {strict as assert} from 'node:assert';
import rank from '../../src/services/rank-score.js';

describe('Rank Score Tests', function() {
	it('Rank empty items', async function() {
		const res = await rank({}, [], []);
		assert.deepEqual(res, []);
	});

	it('Rank no rules', async function() {
		const res = await rank({}, ['attr1'], [{attr1: 1}, {attr1: 2}]);
		assert.deepEqual(res, [
			{score: 0, scoreBreakdown: {attr1: 0}},
			{score: 0, scoreBreakdown: {attr1: 0}},
		]);
	});

	it('Rank empty ranklist');

	it('Rank single');

	it('Rank multiple');

	it('Rank number');

	it('Rank version');

	it('Rank all types');
});
