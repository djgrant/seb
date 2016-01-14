# SEB

Create reactive components in sites without the luxury of a virtual DOM

<a href="https://codeship.com/projects/109085">
  <img src="https://img.shields.io/codeship/26c45920-55a8-0133-691e-56be39fb689c.svg" alt="Codeship Status for djgrant/seb">
</a>

SEB is a library for creating components in the browsers DOM that facilitates a one way data flow: Events -> State -> Behaviours.

Events can only change state, and behaviours in turn respond to state changes. Adaptors allow custom behaviour methods to be made available. For example, the jquery adaptor allows you to use jquery methods declaratively, triggering them as a representation of component's state.

[Examples](https://github.com/djgrant/seb/blob/master/demos/counter/script.js)

A sample counter component:

```
import SEB from 'seb';
import $ from 'seb-adaptor-jquery';
import classnames from 'seb-adaptor-classnames';

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
```
