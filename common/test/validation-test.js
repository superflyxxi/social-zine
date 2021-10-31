import chai from 'chai';
import {validate, ValidationError} from '../src/index.js';

const {expect} = chai;

const everything = {s: 'a', b: true, i: 1, d: 1.1, a: [1, 2, 3], o: {name:'Object'}};

describe('Basic Validation', () => {
	it('Empty rules', () => {
		validate(everything, {});
	});

	it('More attributes than expected', () => {
		validate(everything, {
			z: {presence: false, type: 'string'},
		});
	});

	it('Required attributes', () => {
		validate(everything, {
			s: {presence: true},
		});
	});


	it('Bool', () => {
		validate(everything, {
			b: {presence: true, type: 'boolean'},
		});
	});

	it('Integer', () => {
		expect.fail('Missing test');
	});

	it('Decimal', () => {
		expect.fail('Missing test');
	});

	it('Array', () => {
		expect.fail('Missing test');
	});
});


describe('Sting Validations', () => {
	it('String', () => {
		validate(everything, {
			s: {presence: false, type: 'string'},
		});
	});
	it('Bool', () => {
		expect(() => validate(everything, {
			b: {presence: false, type: 'string'},
		})).to.throw(ValidationError);
	});
	it('Integer', () => {
		expect(() => validate(everything, {
			i: {presence: false, type: 'string'},
		})).to.throw(ValidationError);
	});
	it('Decimal', () => {
		expect(() => validate(everything, {
			d: {presence: false, type: 'string'},
		})).to.throw(ValidationError);
	});
	it('Array', () => {
		expect(() => validate(everything, {
			a: {presence: false, type: 'string'},
		})).to.throw(ValidationError);
	});
	it('Object', () => {
		expect(() => validate(everything, {
			o: {presence: false, type: 'string'},
		})).to.throw(ValidationError);
	});
});
