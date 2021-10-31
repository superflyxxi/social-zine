import chai from 'chai';
import {getVersionObject} from '../src/index.js';

const {expect} = chai;

describe('Version Object', function () {
	it('Only Major');
	it('Major.Minor');
	it('Major.Minor.Revision');
	it('Extra long');
	it('None');
});
