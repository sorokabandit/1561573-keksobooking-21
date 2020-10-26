'use strict';

(function () {
  const loadURL = `  https://21.javascript.pages.academy/keksobooking/data`;
  const saveURL = `https://21.javascript.pages.academy/keksobooking`;
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;
  window.load = function (onLoad, onError) {
    const loadxhr = new XMLHttpRequest();
    loadxhr.responseType = `json`;


    loadxhr.addEventListener(`load`, function () {
      if (loadxhr.status === StatusCode.OK && onLoad) {
        onLoad(loadxhr.response);
      } else if (onError) {
        onError(`Статус ответа: ` + loadxhr.status + ` ` + loadxhr.statusText);
      }
    });
    loadxhr.addEventListener(`error`, function () {
      if (onError) {
        onError(`Произошла ошибка соединения`);
      }

    });

    loadxhr.addEventListener(`timeout`, function () {
      if (onError) {
        onError(`Запрос не успел выполниться за ` + loadxhr.timeout + `мс`);
      }

    });

    loadxhr.timeout = TIMEOUT_IN_MS;

    loadxhr.open(`GET`, loadURL);
    loadxhr.send();
  };


  window.save = function (data, onLoad, onError) {
    const savexhr = new XMLHttpRequest();
    savexhr.responseType = `json`;

    savexhr.addEventListener(`load`, function () {
      onLoad(savexhr.response);
      
    });
    savexhr.addEventListener(`error`, function () {
      if (onError) {
        onError(`Произошла ошибка соединения`);
      }
    });
    savexhr.open(`POST`, saveURL);
    savexhr.send(data);
  }

})();
