'use strict';


const DEBOUNCE_INTERVAL = 500; // ms

const debounce = (cb) => {
  let lastTimeout = null;
  return (...args) => {
    const parameters = args;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

window.debounce = debounce;
