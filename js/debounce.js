'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500; // ms

  const debounce = function (cb) {
    let lastTimeout = null;
    return function (...args) {
      const parameters = args;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.debounce = debounce;
})();
