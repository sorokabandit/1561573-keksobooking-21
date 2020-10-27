'use strict';

const movePin = document.querySelector(`.map__pin--main`);
const overlay = document.querySelector(`.map__overlay`);
const mapRect = overlay.getBoundingClientRect();


movePin.addEventListener(`mousedown`, function (evt) {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();


    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    if (movePin.offsetLeft - shift.x >= 0 - movePin.offsetWidth / 2
      && movePin.offsetLeft - shift.x <= mapRect.width - movePin.offsetWidth / 2
      && movePin.offsetTop - shift.y >= mapRect.top + 130
      && movePin.offsetTop - shift.y <= mapRect.top + 630) {
      movePin.style.top = (movePin.offsetTop - shift.y) + `px`;
      movePin.style.left = (movePin.offsetLeft - shift.x) + `px`;
    }

  };
  const onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);

  };
  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

