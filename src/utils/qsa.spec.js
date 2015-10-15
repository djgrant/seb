import qsa from './qsa';

describe('qsa (querySelectorAll) utility', function () {

  it('should exist', function () {
    qsa.should.be.type('function');
  });

  it('should return a nodelist from a selector', function () {
    var el = document.createElement('div');
    el.className= 'test-selector';
    document.body.appendChild(el);
    var myEl = qsa('.test-selector');
    myEl[0].should.equal(el);
  });

  it('should accept shorthand selectors for seb components', function () {
    var el = document.createElement('div');
    el.setAttribute('seb-test', true);
    document.body.appendChild(el);
    var myEl = qsa('seb-test');
    myEl[0].should.equal(el);
  })
});
