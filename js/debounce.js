'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500; // ms

  const debounce = function (cb) {
    let lastTimeout = null;
    return function () {
      const parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.debounce = debounce;
})();
