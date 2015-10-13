import SEB from '../../src/seb.js';
import $ from '../../src/adaptors/seb-jquery.js';

SEB.addAdaptor($);
SEB.createComponent({

  self: '.header',

  els: {},
  state: {},
  events: {},

  behaviours: {
    self: {
      html: '<a href="/demos/">SEB demos</a>',
      css: {
        padding: '15px',
        background: '#01b69b',
        fontSize: 20,
        zIndex: 1
      }
    }
  }
});
