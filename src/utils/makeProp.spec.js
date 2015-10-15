import makeProp from './makeProp';

describe('makeProp utility', function () {

  it('should exist', function () {
    makeProp.should.be.type('function');
  });

  var obj = Object.create({}, makeProp('number', 10));

  it('should prepare a key/value pair for Object.create', function () {
    obj.number.should.equal(10);
  });

  it('which should be enumerable', function () {
    Object.keys(obj).forEach(function (key) {
      key.should.be('number');
    });
  });

  it('which should be writable', function () {
    obj.number = 11;
    obj.number.should.equal(11);
  })
});
