import makeProp from '../utils/makeProp';

var proto = {
  to: function (element) {
    return Object.create(this, makeProp('element', element));
  },
  event: function (event, payload) {
    this.element.dispatchEvent(new CustomEvent(event, { detail: payload }));
    return this;
  }
};

export default Object.create(proto, makeProp('element', document));
