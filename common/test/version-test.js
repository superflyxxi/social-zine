import * as chai from 'chai';
import {getVersionObject} from '../src/index.js';

const {expect} = chai;

describe('Version Object', function () {
	it('Only Major', function () {
		expect(getVersionObject('11')).to.deep.equal({
			major: 11,
			minor: undefined,
			patch: undefined,
		});
	});
	it('Major.Minor', function () {
		expect(getVersionObject('11.22')).to.deep.equal({
			major: 11,
			minor: 22,
			patch: undefined,
		});
	});
	it('Major.Minor.Patch', function () {
		expect(getVersionObject('11.22.33')).to.deep.equal({
			major: 11,
			minor: 22,
			patch: 33,
		});
	});
	it('Extra long', function () {
		expect(getVersionObject('11.22.33.44')).to.deep.equal({
			major: 11,
			minor: 22,
			patch: 33,
		});
	});
	it('None', function () {
		expect(getVersionObject('string')).to.deep.equal({
			major: Number.NaN,
			minor: undefined,
			patch: undefined,
		});
	});
});
