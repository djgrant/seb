/* eslint space-in-parens: 0, no-unused-vars: 0  */

import extractArgs from './extractArgs';

var argsArray = ['foo', 'bar', 'baz'];

describe('extractArgs utility', function () {
  it('should exist', function () {
    extractArgs.should.be.type('function');
  });

  it('should extract arguments from a function', function () {
    function test(foo, bar, baz) {
      return null;
    }
    var args = extractArgs(test);
    args.should.eql(argsArray);
  });

  it('should ignore comments', function () {
    function test(/* first arg */ foo, /* second arg */ bar, baz /* last arg */) {
      return null;
    }
    var args = extractArgs(test);
    args.should.eql(argsArray);
  });

  it('should strip out whitespace from parsed arguments', function () {
    function test( foo,   bar,   baz   ) {
      return null;
    }
    var args = extractArgs(test);
    args.forEach(function (arg, index) {
      arg.should.eql(argsArray[index]);
    });
  });
});
