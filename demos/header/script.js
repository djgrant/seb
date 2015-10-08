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
        padding: '10px 15px',
        background: '#01b69b',
        borderBottom: '8px solid #eee',
        fontSize: 30,
        color: 'white'
      }
    }
  }
});
