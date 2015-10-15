import each from './each';

var obj = {
  a: 0,
  b: 1,
  c: 2
};

describe('each utility', function () {
  it('should exist', function () {
    each.should.be.type('function');
  });

  it('should iterate over an object and run a callback', function () {
    var arr = [];

    each(obj, function () {
      arr.push(1);
    });

    arr.length.should.equal(3);
  });

  it('should pass the key as the first callback argument', function () {
    var newObj = {};
    each(obj, function (key) {
      newObj[key] = obj[key];
    });
    newObj.should.eql(obj);
  });

  it('should pass the index as the second callback argument', function () {
    each(obj, function (key, index) {
      obj[key].should.equal(index);
    });
  });
});
