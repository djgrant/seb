import makeProp from '../utils/makeProp';
import qsa from '../utils/qsa';

var proto = {
  to: function (element) {
    return Object.create(this, makeProp('element', qsa(element)));
  },
  event: function (event, payload) {
    [].forEach.call(this.element, function (node) {
      node.dispatchEvent(new CustomEvent(event, { detail: payload }));
    });
    return this;
  }
};

export default Object.create(proto, makeProp('element', document));
