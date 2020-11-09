'use strict';

const overlay = document.querySelector(`.map__overlay`);
const mapRect = overlay.getBoundingClientRect();
window.mainPin = document.querySelector(`.map__pin--main`);

window.mainPin.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();


    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    if (window.mainPin.offsetLeft - shift.x >= 0 - window.mainPin.offsetWidth / 2 &&
      window.mainPin.offsetLeft - shift.x <= mapRect.width - window.mainPin.offsetWidth / 2 &&
      window.mainPin.offsetTop - shift.y >= mapRect.top + 130 &&
      window.mainPin.offsetTop - shift.y <= mapRect.top + 630) {
        window.mainPin.style.top = (window.mainPin.offsetTop - shift.y) + `px`;
        window.mainPin.style.left = (window.mainPin.offsetLeft - shift.x) + `px`;
    } else {
      const event = new Event('mouseup');
        document.dispatchEvent(event);
    }
  };
  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);

  };
  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);

});
