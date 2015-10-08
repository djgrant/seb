import SEB from '../../src/seb.js';
import $ from '../../src/adaptors/seb-jquery.js';
import classnames from '../../src/adaptors/seb-classnames.js';

SEB.addAdaptor([$, classnames]);
SEB.createComponent({

  els: {
    button: 'button',
    container: '.container',
    counter: '.counter',
    box: '.box'
  },

  state: {
    count: 0,
    angle: -45,
    boxAnimating: false
  },

  events: {
    button: {
      click: $state => {
        $state.set('count', $state.get('count') + 1);
        $state.set('angle', $state.get('angle') + 45);
      }
    }
  },

  behaviours: {
    button: {
      html: count => count < 1 ? 'Start Counting!' : 'Incremenent'
    },
    container: {
      css: {
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translateX(-50%) translateY(-50%)'
      }
    },
    box: {
      html: count => count,
      css: (count, angle) => ({
        transform: `rotate(${angle}deg)`,
        transition: `0.35s transform`
      }),
      fadeOut: count => count < 1 && 0,
      fadeIn: count => count > 0 && { queue: false, duration: 1000 },
      animate: count => ({
        width: `${count * 25 + 50}`,
        height: `${count * 25 + 50}`
      }),
    },
    counter: {
      classes: angle => ({
        'wide': angle > 90,
        'narrow': angle < 90,
        'right-angle': angle === 90
      })
    }
  }

});
