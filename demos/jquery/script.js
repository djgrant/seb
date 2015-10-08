import SEB from '../../src/seb.js';
import $ from '../../src/adaptors/seb-jquery.js';
import classnames from '../../src/adaptors/seb-classnames.js';

SEB.addAdaptor([$, classnames]);
SEB.createComponent({

  els: {
    button: 'button',
    container: '[data-key=container]',
    title: '[data-key=pageTitle]',
    counter: '.counter'
  },

  state: {
    count: 0,
    angle: 45
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
      css: count => ({ fontSize: count })
    },
    '.container': {
      html: count => count,
      css: (count, angle) => ({
        width: 100,
        height: 100,
        border: `${count+1}px solid red`,
        transform: `rotate(${angle}deg)`,
        transition: `0.35s transform`
      }),
      fadeIn: count =>  count % 2 && 450,
      fadeOut: count => count % 3 && 500
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
