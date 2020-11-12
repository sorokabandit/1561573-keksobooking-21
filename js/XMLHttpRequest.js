'use strict';
const LOAD_URL = `  https://21.javascript.pages.academy/keksobooking/data`;
const SAVE_URL = `https://21.javascript.pages.academy/keksobooking`;
const StatusCode = {
  OK: 200
};
const TIMEOUT_IN_MS = 10000;
window.load = (onLoad, onError) => {
  const loadxhr = new XMLHttpRequest();
  loadxhr.responseType = `json`;
  loadxhr.addEventListener(`load`, () => {
    if (loadxhr.status === StatusCode.OK && onLoad) {
      onLoad(loadxhr.response);
    } else if (onError) {
      onError(`Статус ответа: ` + loadxhr.status + ` ` + loadxhr.statusText);
    }
  });
  loadxhr.addEventListener(`error`, () => {
    if (onError) {
      onError(`Произошла ошибка соединения`);
    }

  });

  loadxhr.addEventListener(`timeout`, () => {
    if (onError) {
      onError(`Запрос не успел выполниться за ` + loadxhr.timeout + `мс`);
    }
  });

  loadxhr.timeout = TIMEOUT_IN_MS;

  loadxhr.open(`GET`, LOAD_URL);
  loadxhr.send();
};
window.save = (data, onLoad, onError) => {
  const savexhr = new XMLHttpRequest();
  savexhr.responseType = `json`;

  savexhr.addEventListener(`load`, () => {
    if (savexhr.status === StatusCode.OK && onLoad) {
      onLoad(savexhr.response);
    } else if (onError) {
      onError(`Статус ответа: ` + savexhr.status + ` ` + savexhr.statusText);
    }
  });
  savexhr.addEventListener(`error`, () => {
    if (onError) {
      onError(`Произошла ошибка соединения`);
    }
  });
  savexhr.addEventListener(`timeout`, () => {
    if (onError) {
      onError(`Запрос не успел выполниться за ` + savexhr.timeout + `мс`);
    }
  });
  savexhr.open(`POST`, SAVE_URL);
  savexhr.send(data);
};


