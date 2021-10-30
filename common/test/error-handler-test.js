import chai from 'chai';
import library from '../src/index.js';

const {expect} = chai;

describe('Error-handler', () => {
	it('All attributes populated', () => {
		let nextCalled = false;
		let message;
		const res = {
			status: () => {
				return {
					send: (input) => {
						message = input;
					},
				};
			},
		};
		library.errorHandler({type: 'MyType', title: 'My Title', status: 400, detail: 'My Detail'}, undefined, res, () => {
			nextCalled = true;
		});
		expect(nextCalled).to.deep.equal(false, 'Next Called');
		expect(message).to.deep.include({
			type: 'MyType',
			title: 'My Title',
			status: 400,
			detail: 'My Detail',
		});
	});

	it('No attributes populated', () => {
		expect.fail('Missing test');
	});

	it('Minimum attributes populated', () => {
		expect.fail('Missing test');
	});
});
