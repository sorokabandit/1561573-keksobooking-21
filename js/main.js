'use strict';
const userWindow = document.querySelector(`.map`);
userWindow.classList.remove(`map--faded`);
const userWindowPin = userWindow.querySelector(`.map__pins`);
const mainPin = document.querySelector(`.map__pin--main`);
const advertising = document.querySelector(`.ad-form`);
const filters = document.querySelector(`.map__filters`);


//неактивная страница
getAddress(false);
document.addEventListener("DOMContentLoaded", disabledSite);


function disabledSite() {
  userWindow.classList.add(`map--faded`);
  advertising.classList.add(`ad-form--disabled`);
  let fields = advertising.querySelectorAll(`fieldset`);
  fields.forEach(element => {
    element.setAttribute(`disabled`, ``);
  });
  let selects = filters.querySelectorAll(`select`);
  selects.forEach(element => {
    element.setAttribute(`disabled`, ``);

  });

  let fieldset = filters.querySelector(`fieldset`);
  fieldset.setAttribute(`disabled`, ``);
}
//активная страница
function enabledSite() {
  userWindow.classList.remove(`map--faded`);
  advertising.classList.remove(`ad-form--disabled`);
  const fields = advertising.querySelectorAll(`fieldset`);
  fields.forEach(element => {
    element.removeAttribute(`disabled`, ``);
  });
  let selects = filters.querySelectorAll(`select`);
  selects.forEach(element => {
    element.removeAttribute(`disabled`, ``);

  });

  let fieldset = filters.querySelector(`fieldset`);
  fieldset.removeAttribute(`disabled`, ``);
}
// изменение координат при активной и неактивной странице
function getAddress(active) {
  let address;
  if (active) {
    address = parseFloat(parseFloat(getComputedStyle(mainPin).left) + parseFloat(getComputedStyle(mainPin).width) * 0.5) + `,` + parseFloat(parseFloat(getComputedStyle(mainPin).top) + parseFloat(getComputedStyle(mainPin).height) * 1.5);
  } else {
    address = parseFloat(parseFloat(getComputedStyle(mainPin).left) + parseFloat(getComputedStyle(mainPin).width) * 0.5) + `,` + parseFloat(parseFloat(getComputedStyle(mainPin).top) + parseFloat(getComputedStyle(mainPin).height) * 0.5);
  }
  let address_field = document.querySelector('#address');
  address_field.setAttribute('value', address);
}
//нажатие мышки
mainPin.addEventListener(`mousedown`, function (event) {
  if (event.button === 0) {
    enabledSite();
    getAddress(true);
  }
});
mainPin.addEventListener(`keydown`, function (event) {
  if (event.key === `Enter`) {
    enabledSite();
  }
})




















