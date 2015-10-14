import SEB from '../../src/seb.js';
import $ from '../../src/adaptors/seb-jquery.js';

SEB.addAdaptor($);
SEB.createComponent({

  self: '.header',

  els: {},

  state: {
    hidden: false
  },

  events: {
    self: {
      hide: ($state, payload) => {
        $state.set('hidden', payload);
      }
    }
  },

  behaviours: {
    self: {
      hide: hidden => hidden,
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
