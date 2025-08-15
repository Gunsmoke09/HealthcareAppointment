const { expect } = require('chai');

describe('Example Test', () => {
  it('should pass', () => {
    expect(true).to.be.true;
  });

it('should add numbers correctly', () => {
  expect(1 + 1).to.equal(2);
});

it('should handle string concatenation', () => {
  expect('Hello' + ' ' + 'World').to.equal('Hello World');
});

it('should verify arrays are equal', () => {
  expect([1, 2, 3]).to.deep.equal([1, 2, 3]);
});

it('should verify object properties', () => {
  const obj = { a: 1, b: 2 };
  expect(obj).to.have.property('a').that.equals(1);
});

it('should check for null', () => {
  const value = null;
  expect(value).to.be.null;
});

it('should verify that numbers are above a threshold', () => {
  expect(10).to.be.above(5);
});

it('should verify that numbers are below a threshold', () => {
  expect(3).to.be.below(5);
});

it('should verify inclusion in array', () => {
  expect([1, 2, 3]).to.include(2);
});

it('should verify string matching', () => {
  expect('testing').to.match(/^test/);
});
});