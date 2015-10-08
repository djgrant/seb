import each from './utils/each';
import qsa from './utils/qsa';
import extractArgs from './utils/extractArgs';
import stateAPI from './api/state';

var _els = {};
var _behaviourMethods = {};

var SEB = {

  addAdaptor: adaptors => {
    [].concat(adaptors).forEach(adaptorMethods => {
      each(adaptorMethods, key => {
        _behaviourMethods[key] = adaptorMethods[key];
      });
    });
  },

  createComponent: component => {

    var {
      els,
      state,
      events,
      behaviours
    } = component;

    var $state = stateAPI(state);

    var getNodeList = function (selector) {
      return _els[selector] || qsa(selector);
    }

    // Register DOM nodes
    each(els, selector => {
      _els[selector] = qsa(els[selector]);
    });

    // Register event handlers
    each(events, (selector) => {
      var nodeList = getNodeList(selector);

      each(events[selector], event => {
        [].forEach.call(nodeList, node => {
          node.addEventListener(event, e => {
            events[selector][event]($state, e);
          });
        });
      });
    });

    // Register behaviours
    each(behaviours, (selector) => {
      var nodeList = getNodeList(selector);

      each(behaviours[selector], method => {
        var def = behaviours[selector][method];
        if (typeof def !== 'function') {
          def && _behaviourMethods[method](nodeList, def);
        }
        else {
          var args = extractArgs(def);
          var onStateChange = () => {
            var currentDef = def.apply(null,
              args.map(arg => $state.get(arg))
            );
            currentDef !== false && _behaviourMethods[method](nodeList, currentDef);
          };
          args.forEach(subState => {
            $state.ready(subState, onStateChange);
            $state.change(subState, onStateChange);
          });
        }
      });
    });

    // Register state
    each(state, subState => {
      $state._initSet(subState, state[subState]);
    });
  }
}

export default SEB;
