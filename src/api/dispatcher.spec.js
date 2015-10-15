import $dispatcher from './dispatcher';

describe('$dispatcher', function () {

  it('should exist', function () {
    $dispatcher.should.be.type('object');
  });

  it('should emit an event to a DOM selector', function () {
    var el = document.createElement('button');
    $dispatcher.to('button').event('evt', 3);
    el.addEventListener('evt', function (e) {
      console.log(e);
      e.should.equal(3);
    });
  });

  it('should emit an event to the document if destination is not specified', function () {
    $dispatcher.event('evt2', 10);
    document.addEventListener('evt2', function (e) {
      e.should.equal(10);
    });
  });

})
