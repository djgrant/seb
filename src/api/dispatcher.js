var proto = {
  to: function (element) {
    this.element = element;
    return this;
  },
  event: function (event, payload) {
    this.element.dispatchEvent(new CustomEvent(event, { detail: payload }));
  }
};

var defaultProps = {
  element: {
    writable: true,
    configurable: true,
    value: document
  }
};

export default Object.create(proto, defaultProps);
