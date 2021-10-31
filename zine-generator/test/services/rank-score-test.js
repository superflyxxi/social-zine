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

	it('Rank empty ranklist', async function() {
		const res = await rank({}, [], [{attr1: 1}, {attr1: 2}]);
		assert.deepEqual(res, [
			{score: 0, scoreBreakdown: {}},
			{score: 0, scoreBreakdown: {}},
		]);
	});

	it('Rank single', async function() {
		const res = await rank({
			id: {
				type: 'identifier'
			},
			attr1: {
				type: 'number',
				scoreMethod: 'PREFER_HIGH',
			}
		}, ['attr1'], [{id: 1, attr1: 1}]);
		assert.deepEqual(res, [
			{id: 1, score: NaN, scoreBreakdown: {attr1: NaN}},
		]);
	});

	it('Rank multiple', async function() {
		const res = await rank({
			id: {
				type: 'identifier',
			},
			attr1: {
				type: 'number',
				scoreMethod: 'PREFER_HIGH',
			}
		}, ['attr1'], [{id: 1, attr1: 1}, {id: 2, attr1: 2}]);
		assert.deepEqual(res, [
			{id: 2, score: 2, scoreBreakdown: {attr1: 2}},
			{id: 1, score: 0, scoreBreakdown: {attr1: 0}},
		]);
	});

	it('Rank number');

	it('Rank version');

	it('Rank all types');
});
