import SEB from '../../src/seb.js';
import $ from '../../src/adaptors/seb-jquery.js';

SEB.addAdaptor($);
SEB.createComponent({


  els: {
    header: '.header'
  },

  state: {},
  events: {},

  behaviours: {
    header: {
      css: {
        padding: '15px',
        background: '#01b69b',
        fontSize: 20,
        color: 'white',
        zIndex: 1
      }
    }
  }
});
