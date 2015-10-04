export default function StateAPI(state) {
  var $state = {
    get: key => state[key],

    change: (key, cb) => {
      $state._register($state._changeCbs, key, cb);
    },

    ready: (key, cb) => {
      $state._register($state._readyCbs, key, cb);
    },

    set: (key, value) => {
      state[key] = value;
      $state._execute($state._changeCbs, key);
    },

    _initSet: (key, value) => {
      $state.set(key, value);
      $state._execute($state._readyCbs, key);
    },

    _register: (obj, key, cb) => {
      obj[key] = obj[key] || [];
      obj[key].push(cb);
    },

    _execute: (obj, key) => {
      if(obj[key]) {
        obj[key].forEach(cb => {
          cb();
        });
      }
    },

    _changeCbs: {},
    _readyCbs: {}
  };

  return $state;

}
