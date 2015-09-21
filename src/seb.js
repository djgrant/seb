import $ from 'jquery';
import extractArgs from './extractArgs';
import StateAPI from './state';

export default {

  createComponent: function(component) {

    var {
      els,
      state,
      initialState,
      events,
      behaviours
    } = component;

    var $state = StateAPI(state);

    // Register event handlers
    Object.keys(events).forEach(selector => {
      var $el = els[selector] || $(selector);

      Object.keys(events[selector]).forEach(event => {
        $el.on(event, e => {
          events[selector][event]($state);
        });
      });
    });

    // Register behaviours
    Object.keys(behaviours).forEach(selector => {
      var $el = els[selector] || $(selector);

      Object.keys(behaviours[selector]).forEach(method => {
        var def = behaviours[selector][method];
        if (typeof def !== 'function'){
          $el[method](def);
        } else {
          var args = extractArgs(def);
          function func() {
            $el[method](def.apply(
              this,
              args.map(arg => $state.get(arg))
            ));
          };
          args.forEach(subState => {
            $state.ready(subState, func);
            $state.change(subState, func);
          });
        }
      });
    });

    // Register state
    Object.keys(state).forEach(subState => {
      $state._initSet(subState, state[subState]);
    });
  }
}
