'use strict';

const {expect} = require('chai');

const Preconditions = require('../../../server/utils/preconditions');

describe('#Preconditions utility', () => {
  it('should throw if a condition check on an arg is not true', () => {
    expect(
      Preconditions.checkArg.bind(Preconditions, 10 < 1, 'Arg must be > 1')
    ).to.throw();
  });

  it('should not throw if a condition check on an arg is true', () => {
    expect(
      Preconditions.checkArg.bind(Preconditions, 10 > 1, 'Arg must be > 1')
    ).to.not.throw();
  });
});
