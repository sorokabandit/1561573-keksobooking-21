'use strict';
const userWindow = document.querySelector(`.map`);
userWindow.classList.remove(`map--faded`);
const advertising = document.querySelector(`.ad-form`);
const filters = document.querySelector(`.map__filters`);
window.startMainPin = window.mainPin.getAttribute('style');

window.disabledSite = () => {
  userWindow.classList.add(`map--faded`);
  advertising.classList.add(`ad-form--disabled`);
  const fields = advertising.querySelectorAll(`fieldset`);
  fields.forEach((element) => {
    element.setAttribute(`disabled`, `disabled`);
  });

  const selects = filters.querySelectorAll(`select`);
  selects.forEach((element) => {
    element.setAttribute(`disabled`, `disabled`);
  });

  const fieldset = filters.querySelector(`fieldset`);
  fieldset.setAttribute(`disabled`, `disabled`);
};
document.addEventListener("DOMContentLoaded", window.disabledSite);

const enabledSite = () => {
  window.load(successHandler, errorHandler);
  userWindow.classList.remove(`map--faded`);
  advertising.classList.remove(`ad-form--disabled`);
  const fields = advertising.querySelectorAll(`fieldset`);
  fields.forEach((element) => {
    element.removeAttribute(`disabled`, `disabled`);
  });
  const selects = filters.querySelectorAll(`select`);
  selects.forEach((element) => {
    element.removeAttribute(`disabled`, `disabled`);
  });

  const fieldset = filters.querySelector(`fieldset`);
  fieldset.removeAttribute(`disabled`, `disabled`);
};

window.getAddress = (active) => {
  let address;
  if (active) {
    address = parseInt(parseInt(getComputedStyle(window.mainPin).left, 10) + parseInt(getComputedStyle(window.mainPin).width, 10) * 0.5) + `,` + parseInt(parseInt(getComputedStyle(window.mainPin).top, 10) + parseInt(getComputedStyle(window.mainPin).height, 10) + 18);
  } else {
    address = parseInt(parseInt(getComputedStyle(window.mainPin).left) + parseInt(getComputedStyle(window.mainPin).width) * 0.5) + `,` + parseInt(parseInt(getComputedStyle(window.mainPin).top) + parseInt(getComputedStyle(window.mainPin).height) * 0.5);
  }
  const addressField = document.querySelector('#address');
  addressField.setAttribute('value', address);
};
window.getAddress(false);
window.mainPin.addEventListener(`mouseup`, (event) => {
  if (event.button === 0) {
    enabledSite();
    window.getAddress(true);

  }
});
window.mainPin.addEventListener(`keydown`, (event) => {
  if (event.key === `Enter`) {
    enabledSite();
  }
});
const successHandler = (data) => {
  window.announcements = data;
  window.filteredAnnounements = data;
  window.renderPins(window.announcements, window.COUNT_PINS);
};
const errorHandler = (errorMessage) => {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;

  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};
