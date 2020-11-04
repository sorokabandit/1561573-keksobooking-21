'use strict';
const userWindow = document.querySelector(`.map`);
userWindow.classList.remove(`map--faded`);
window.mainPin = document.querySelector(`.map__pin--main`);
const advertising = document.querySelector(`.ad-form`);
const filters = document.querySelector(`.map__filters`);
window.startMainPin = mainPin.getAttribute('style');


window.disabledSite = () => {
  userWindow.classList.add(`map--faded`);
  advertising.classList.add(`ad-form--disabled`);
  const fields = advertising.querySelectorAll(`fieldset`);
  fields.forEach((element) => {
    element.setAttribute(`disabled`, ``);
  });

  const selects = filters.querySelectorAll(`select`);
  selects.forEach((element) => {
    element.setAttribute(`disabled`, ``);
  });

  const fieldset = filters.querySelector(`fieldset`);
  fieldset.setAttribute(`disabled`, ``);
};
document.addEventListener("DOMContentLoaded", window.disabledSite);

const enabledSite = () => {
  window.renderPins(window.announcements, window.countPins);
  userWindow.classList.remove(`map--faded`);
  advertising.classList.remove(`ad-form--disabled`);
  const fields = advertising.querySelectorAll(`fieldset`);
  fields.forEach((element) => {
    element.removeAttribute(`disabled`, ``);
  });
  const selects = filters.querySelectorAll(`select`);
  selects.forEach((element) => {
    element.removeAttribute(`disabled`, ``);
  });

  const fieldset = filters.querySelector(`fieldset`);
  fieldset.removeAttribute(`disabled`, ``);
};

window.getAddress = (active) => {
  let address;
  if (active) {
    address = parseFloat(parseFloat(getComputedStyle(window.mainPin).left) + parseFloat(getComputedStyle(window.mainPin).width) * 0.5) + `,` + parseFloat(parseFloat(getComputedStyle(window.mainPin).top) + parseFloat(getComputedStyle(window.mainPin).height) * 1.5);
  } else {
    address = parseFloat(parseFloat(getComputedStyle(window.mainPin).left) + parseFloat(getComputedStyle(window.mainPin).width) * 0.5) + `,` + parseFloat(parseFloat(getComputedStyle(window.mainPin).top) + parseFloat(getComputedStyle(window.mainPin).height) * 0.5);
  }
  const addressField = document.querySelector('#address');
  addressField.setAttribute('value', address);
};
window.getAddress(false);
window.mainPin.addEventListener(`mouseup`, function (event) {
  if (event.button === 0) {
    enabledSite();
    window.getAddress(true);
  }
});
window.mainPin.addEventListener(`keydown`, function (event) {
  if (event.key === `Enter`) {
    enabledSite();
  }
});
