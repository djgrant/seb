import state from './state';

var data = {
  happy: true,
  smelly: false,
  age: 100,
  name: 'Perry'
};

var $state = state(data);

describe('$state', function () {

  it('should exist', function () {
    $state.should.be.type('object');
  });

  it('should get and set', function () {
    $state.set('test', 9);
    $state.get('test').should.equal(9);
  });

  it('should execute a callback when state is set', function () {
    var x;
    $state.change('test', function () {
      x = 1;
    });
    $state.set('test', true);
    x.should.equal(1);
  });

  it('should execute a callback when state is set for first time', function () {
    var x;
    $state.ready('new', function () {
      x = 2;
    });
    $state._initSet('new', true);
    x.should.equal(2);
  });
});
