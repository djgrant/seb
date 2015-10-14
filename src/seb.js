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
      self,
      els,
      state,
      events,
      behaviours
    } = component;

    var $state = stateAPI(state);

    // Register DOM nodes
    var _self = qsa(self);

    each(els, selector => {
      _els[selector] = qsa(els[selector], _self[0]);
    });

    var getNodeList = function (selector) {
      if (selector === 'self') {
        return _self;
      }
      return _els[selector] || qsa(selector);
    }

    // Register event handlers
    each(events, (selector) => {
      var nodeList = getNodeList(selector);
      var nodeEvents = events[selector];
      var nodeCustomEvents = events[selector].custom;

      if (nodeCustomEvents) {
        each(nodeCustomEvents, evName => {
          var handler = nodeCustomEvents[evName];
          registerEvent(nodeList, evName, handler);
        });
      }
      else {
        each(nodeEvents, evName => {
          var handler = nodeEvents[evName];
          registerEvent(nodeList, evName, handler);
        });
      }
    });

    function registerEvent(nodeList, event, handler) {
      [].forEach.call(nodeList, node => {
        node.addEventListener(event, e => {
          handler($state, e.detail);
        });
      });
    }

    // Register behaviours
    each(behaviours, (selector) => {
      var nodeList = getNodeList(selector);

      each(behaviours[selector], method => {
        var def = behaviours[selector][method];
        var defIsStatic = typeof def !== 'function';
        var isCustomEvent = !(method in _behaviourMethods);

        if (defIsStatic) {
          getCallback()(def);
        }
        else {
          injectArgs(def, getCallback());
        }

        function injectArgs(def, callback) {
          var args = extractArgs(def);
          var onStateChange = () => {
            var currentDef = def.apply(null,
              args.map(arg => $state.get(arg))
            );
            callback(currentDef);
          };
          args.forEach(subState => {
            $state.ready(subState, onStateChange);
            $state.change(subState, onStateChange);
          });
        }

        function getCallback() {
          return isCustomEvent ? dispatchCustomEvent : callAdaptorMethod;
        }

        function callAdaptorMethod(def) {
          if (def !== false) {
            try {
              _behaviourMethods[method](nodeList, def);
            }
            catch (e) {
              throw [e, state];
            }
          }
        }

        function dispatchCustomEvent(def) {
          [].forEach.call(nodeList, node => {
            node.dispatchEvent(new CustomEvent(method, { detail: def }));
          });
        }
      });
    });

    // Register state
    each(state, subState => {
      $state._initSet(subState, state[subState]);
    });

    // Dispatch lifecycle events
    _self[0].dispatchEvent(new CustomEvent('inDOM', { detail: null }));
  }
}

export default SEB;
