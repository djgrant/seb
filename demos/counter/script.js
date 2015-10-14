import SEB from '../../src/seb.js';
import $ from '../../src/adaptors/seb-jquery.js';
import classnames from '../../src/adaptors/seb-classnames.js';
import $dispatch from '../../src/api/dispatcher.js';

SEB.addAdaptor([$, classnames]);
SEB.createComponent({

  self: 'seb-counter',

  els: {
    button: 'button',
    container: '.container',
    box: '.box'
  },

  state: {
    ready: false,
    count: 0,
    angle: -45,
  },

  events: {
    self: {
      inDOM: ($state) => {
        $state.set('ready', true);
        $dispatch.to('seb-header').event('hide', true);
        $dispatch.event('evt', false);
      }
    },
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
    box: {
      html: count => count,
      css: (count, angle) => ({
        transform: `rotate(${angle}deg)`,
        transition: `0.35s transform`
      }),
      fadeOut: count => count < 1 && 0,
      fadeIn: count => count > 0 && { queue: false, duration: 1000 },
      animate: count => ({
        width: `${count < 8 && count * 30 + 50}`,
        height: `${count < 8 && count * 30 + 50}`
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
