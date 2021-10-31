import chai from 'chai';
import {validate, ValidationError} from '../src/index.js';

const {expect} = chai;

const everything = {s: 'a', b: true, i: 1, d: 1.1, a: [1, 2, 3], o: {name: 'Object'}};

describe('Basic Validation', function () {
	it('Empty rules', function () {
		validate(everything, {});
	});

	it('More attributes than expected', function () {
		validate(everything, {
			z: {presence: false, type: 'string'},
		});
	});

	it('Required attributes', function () {
		validate(everything, {
			s: {presence: true},
		});
	});

	describe('Sting Validations', function () {
		it('String', function () {
			expect(function () {
				validate(everything, {
					s: {presence: false, type: 'string'},
				});
			}).to.not.throw(ValidationError);
		});
		it('Bool', function () {
			expect(function () {
				validate(everything, {
					b: {presence: false, type: 'string'},
				});
			}).to.throw(ValidationError);
		});
		it('Integer', function () {
			expect(function () {
				validate(everything, {
					i: {presence: false, type: 'string'},
				});
			}).to.throw(ValidationError);
		});
		it('Decimal', function () {
			expect(function () {
				validate(everything, {
					d: {presence: false, type: 'string'},
				});
			}).to.throw(ValidationError);
		});
		it('Array', function () {
			expect(function () {
				validate(everything, {
					a: {presence: false, type: 'string'},
				});
			}).to.throw(ValidationError);
		});
		it('Object', function () {
			expect(function () {
				validate(everything, {
					o: {presence: false, type: 'string'},
				});
			}).to.throw(ValidationError);
		});
	});

	describe('Boolean Validations', function () {
		it('String', function () {
			expect(function () {
				validate(everything, {
					s: {presence: false, inclusion: [true, false]},
				});
			}).to.throw(ValidationError);
		});
		it('Bool', function () {
			expect(function () {
				validate(everything, {
					b: {presence: false, inclusion: [true, false]},
				});
			}).to.not.throw(ValidationError);
		});
		it('Integer', function () {
			expect(function () {
				validate(everything, {
					i: {presence: false, inclusion: [true, false]},
				});
			}).to.throw(ValidationError);
		});
		it('Decimal', function () {
			expect(function () {
				validate(everything, {
					d: {presence: false, inclusion: [true, false]},
				});
			}).to.throw(ValidationError);
		});
		it('Array', function () {
			expect(function () {
				validate(everything, {
					a: {presence: false, inclusion: [true, false]},
				});
			}).to.throw(ValidationError);
		});
		it('Object', function () {
			expect(function () {
				validate(everything, {
					o: {presence: false, inclusion: [true, false]},
				});
			}).to.throw(ValidationError);
		});
	});

	describe('Integer Validations', function () {
		it('String', function () {
			expect(function () {
				validate(everything, {
					s: {presence: false, type: 'integer'},
				});
			}).to.throw(ValidationError);
		});
		it('Bool', function () {
			expect(function () {
				validate(everything, {
					b: {presence: false, type: 'integer'},
				});
			}).to.throw(ValidationError);
		});
		it('Integer', function () {
			expect(function () {
				validate(everything, {
					i: {presence: false, type: 'integer'},
				});
			}).to.not.throw(ValidationError);
		});
		it('Decimal', function () {
			expect(function () {
				validate(everything, {
					d: {presence: false, type: 'integer'},
				});
			}).to.throw(ValidationError);
		});
		it('Array', function () {
			expect(function () {
				validate(everything, {
					a: {presence: false, type: 'integer'},
				});
			}).to.throw(ValidationError);
		});
		it('Object', function () {
			expect(function () {
				validate(everything, {
					o: {presence: false, type: 'integer'},
				});
			}).to.throw(ValidationError);
		});
	});

	describe('Decimal Validations', function () {
		it('String', function () {
			expect(function () {
				validate(everything, {
					s: {presence: false, type: 'number'},
				});
			}).to.throw(ValidationError);
		});
		it('Bool', function () {
			expect(function () {
				validate(everything, {
					b: {presence: false, type: 'number'},
				});
			}).to.throw(ValidationError);
		});
		it('Integer', function () {
			expect(function () {
				validate(everything, {
					i: {presence: false, type: 'number'},
				});
			}).to.not.throw(ValidationError);
		});
		it('Decimal', function () {
			expect(function () {
				validate(everything, {
					d: {presence: false, type: 'number'},
				});
			}).to.not.throw(ValidationError);
		});
		it('Array', function () {
			expect(function () {
				validate(everything, {
					a: {presence: false, type: 'number'},
				});
			}).to.throw(ValidationError);
		});
		it('Object', function () {
			expect(function () {
				validate(everything, {
					o: {presence: false, type: 'number'},
				});
			}).to.throw(ValidationError);
		});
	});

	it('Array');
});
