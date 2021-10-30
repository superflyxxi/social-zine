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
		library.errorHandler({}, undefined, res, () => {
			nextCalled = true;
		});
		expect(nextCalled).to.deep.equal(false, 'Next Called');
		expect(message).to.deep.include({
			type: '/errors/SYSTEM_ERROR',
			title: 'System Error',
			status: 500,
			detail: 'An unknown system error has occurred.',
		});
	});

	it('Headers sent', () => {
		let nextCalled = false;
		let message;
		const res = {
			headersSent: true,
			status: () => {
				return {
					send: (input) => {
						message = input;
					},
				};
			},
		};
		library.errorHandler({}, undefined, res, () => {
			nextCalled = true;
		});
		expect(nextCalled).to.deep.equal(true, 'Next Called');
		expect(message).to.deep.equal(undefined, 'Message populated');
	});

	it('RootError', () => {
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
		library.errorHandler(new library.RootError('RootType', 'RootTitle', 401, 'RootDetail'), undefined, res, () => true);
		expect(message).to.deep.include({
			type: 'RootType',
			title: 'RootTitle',
			status: 401,
			detail: 'RootDetail',
		});
	});

	it('NotFoundError', () => {
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
		library.errorHandler(new library.NotFoundError('Not Found Detail'), undefined, res, () => true);
		expect(message).to.deep.include({
			type: '/errors/NOT_FOUND',
			title: 'Not Found',
			status: 404,
			detail: 'Not Found Detail',
		});
	});
});
