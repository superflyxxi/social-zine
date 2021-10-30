import {strict as assert} from 'node:assert';
import library from '../src/index.js';

describe('Error-handler', () => {
	it('All attributes populated', () => {
		let nextCalled = false;
		let sendCalled =false;
		const res = {
			status: (input) => {
				return { send: (input) => { sendCalled = true;} };
			}
		};
		library.errorHandler({type: 'MyType', title: 'My Title', status: 400, detail: 'My Detail'},{headersSent: true}, res, () => { nextCalled=true;});
		assert.deepEqual(sendCalled, true, 'Send Called');
		assert.deepEqual(nextCalled, false, 'Next Called');
	});
});
