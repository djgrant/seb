import $ from 'jquery';
import each from '../utils/each';

var methods = {};

var jQueryMethods = [

// declarative
  'animate',
  'before',
  'blur',
  'css',
  'data',
  'fadeToggle',
  'focus',
  'height',
  'html',
  'innerHeight',
  'innerWidth',
  'outerHeight',
  'outerWidth',
  'scroll',
  'scrollLeft',
  'scrollTop',
  'slideToggle',
  'text',
  'toggle',
  'toggleClass',
  'width',

// imperative
  'after',
  'attr',
  'addClass',
  'fadeOut',
  'fadeIn',
  'finish',
  'hide',
  'prepend',
  'prop',
  'remove',
  'removeClass',
  'removeAttr',
  'removeData',
  'removeProp',
  'select',
  'show',
  'slideDown',
  'slideUp',
  'stop',
  'submit'
];

jQueryMethods.forEach(method => {
  methods[method] = (nodeList, def) => {
    $(nodeList)[method](def);
  }
});

export default methods;
