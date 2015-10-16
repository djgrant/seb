import SEB from '../../src/seb.js';
import $ from '../../src/adaptors/seb-jquery.js';
import classnames from '../../src/adaptors/seb-classnames.js';
import $dispatch from '../../src/api/dispatcher.js';

SEB.addAdaptor([$, classnames]);
SEB.createComponent({

  self: 'seb-clock',

  els: {
    card: '.card',
    hour1: '.hour-1',
    hour2: '.hour-2',
    minute1: '.minute-1',
    minute2: '.minute-2',
    second1: '.second-1',
    second2: '.second-2'
  },

  state: {
    hour1: String,
    hour2: String,
    minute1: String,
    minute2: String,
    second1: String,
    second2: String
  },

  events: {
    self: {
      inDOM: () => {
        window.requestAnimationFrame(tick);
      },
      tick: $state => {
        var now = new Date();
        $state.set('hour1', parse(now.getHours())[0]);
        $state.set('hour2', parse(now.getHours())[1]);
        $state.set('minute1', parse(now.getMinutes())[0]);
        $state.set('minute2', parse(now.getMinutes())[1]);
        $state.set('second1', parse(now.getSeconds())[0]);
        $state.set('second2', parse(now.getSeconds())[1]);
        window.requestAnimationFrame(tick);
      }
    },

  },

  behaviours: {
    hour1: {
      html: hour1 => hour1
    },
    hour2: {
      html: hour2 => hour2
    },
    minute1: {
      html: minute1 => minute1
    },
    minute2: {
      html: minute2 => minute2
    },
    second1: {
      html: second1 => second1
    },
    second2: {
      html: second2 => second2
      // css: second2 => ({
      //   transition: '0.5s',
      //   transform: `rotateX(${second2 % 2 ? '360deg' : '0'}) translateZ(0)`
      // })
    }
  }
});

function tick() {
  $dispatch.to('seb-clock').event('tick', true);
}

function parse(num) {
  return num > 9 ? num.toString() : '0' + num;
}
