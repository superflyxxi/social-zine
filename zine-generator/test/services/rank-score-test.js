import {strict as assert} from 'node:assert';
import rank from '../../src/services/rank-score.js';

describe('Rank Score Tests', function () {
	it('Rank empty items', async function () {
		const res = await rank({}, [], []);
		assert.deepEqual(res, []);
	});

	it('Rank no rules', async function () {
		const res = await rank({}, ['attr1'], [{attr1: 1}, {attr1: 2}]);
		assert.deepEqual(res, [
			{score: 0, scoreBreakdown: {attr1: 0}},
			{score: 0, scoreBreakdown: {attr1: 0}},
		]);
	});

	it('Rank empty ranklist', async function () {
		const res = await rank({}, [], [{attr1: 1}, {attr1: 2}]);
		assert.deepEqual(res, [
			{score: 0, scoreBreakdown: {}},
			{score: 0, scoreBreakdown: {}},
		]);
	});

	it('Rank single', async function () {
		const res = await rank(
			{
				id: {
					type: 'identifier',
				},
				attr1: {
					type: 'number',
					scoreMethod: 'PREFER_HIGH',
				},
			},
			['attr1'],
			[{id: 1, attr1: 1}],
		);
		assert.deepEqual(res, [{id: 1, score: Number.NaN, scoreBreakdown: {attr1: Number.NaN}}]);
	});

	describe('Rank numbers', function () {
		it('Prefer higher', async function () {
			const res = await rank(
				{
					id: {
						type: 'identifier',
					},
					attr1: {
						type: 'number',
						scoreMethod: 'PREFER_HIGH',
					},
					attr2: {
						type: 'number',
						scoreMethod: 'PREFER_HIGH',
					},
				},
				['attr1', 'attr2'],
				[
					{id: 'test1', attr1: 1, attr2: 11},
					{id: 'testa', attr1: 2, attr2: 22},
				],
			);
			assert.deepEqual(res, [
				{id: 'testa', score: 6, scoreBreakdown: {attr1: 4, attr2: 2}},
				{id: 'test1', score: 0, scoreBreakdown: {attr1: 0, attr2: 0}},
			]);
		});

		it('Prefer lower', async function () {
			const res = await rank(
				{
					id: {
						type: 'identifier',
					},
					attr1: {
						type: 'number',
						scoreMethod: 'PREFER_LOW',
					},
					attr2: {
						type: 'number',
						scoreMethod: 'PREFER_LOW',
					},
				},
				['attr1', 'attr2'],
				[
					{id: 'test1', attr1: 1, attr2: 11},
					{id: 'testa', attr1: 2, attr2: 22},
				],
			);
			assert.deepEqual(res, [
				{id: 'test1', score: 6, scoreBreakdown: {attr1: 4, attr2: 2}},
				{id: 'testa', score: 0, scoreBreakdown: {attr1: 0, attr2: 0}},
			]);
		});
	});

	it('Rank version');

	it('Rank all types');
});
