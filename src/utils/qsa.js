function qsa(selector, parent=document) {
  selector = selector.indexOf('seb') === 0 ? `[${selector}]` : selector;
  return parent.querySelectorAll(selector);
}

export default qsa;
