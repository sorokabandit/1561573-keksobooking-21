'use strict';
const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE_LENGTH = 1000000;
const adressDisabled = document.querySelector(`#address`);
const userName = document.querySelector(`#title`);
const userPrice = document.querySelector(`#price`);
const roomNumber = document.querySelector('#room_number');
const priceElement = document.querySelector(`#price`);
const typeElement = document.querySelector(`#type`);
const timeOut = document.querySelector(`#timeout`);
const timeIn = document.querySelector(`#timein`);
const adFormButton = document.querySelector(`.ad-form__submit`);
const form = document.querySelector(`.ad-form`);
const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
const resetForm = document.querySelector(`.ad-form__reset`);
const addFormElem = document.querySelectorAll(`.ad-form__element`);
const ROOMS_TO_GUESTS_MAP = {
  '1': [`1`],
  '2': [`1`, `2`],
  '3': [`1`, `2`, `3`],
  '100': [`0`]
};

let valid = new validate();
class validate {
  constructor() {
    this.fields = {
      name: false,
      price: false,
      rooms: false
    };
  }
  check() {
    let flag = true;
    for (let e in this.fields) {
      if (this.fields[e] === false) {
        flag = false;
      }
    }
    return flag;
  }
}

userName.addEventListener(`input`, function () {
  let valueLength = userName.value.length;
  valid.fields.name = false;
  if (valueLength < MIN_NAME_LENGTH) {
    userName.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userName.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
  } else {
    userName.setCustomValidity('');
    valid.fields.name = true;
  }
  userName.reportValidity();
});

userPrice.addEventListener(`input`, function () {
  let valueLength = userPrice.value;
  valid.fields.price = false;
  if (valueLength > MAX_PRICE_LENGTH) {
    userPrice.setCustomValidity(`Сумма может быть не больше ` + MAX_PRICE_LENGTH);
  } else {
    userPrice.setCustomValidity(``);
    valid.fields.price = true;
  }
  userPrice.reportValidity();
});

let setTypeDependencies = () => {

  if (typeElement.value === `bungalow`) {
    priceElement.setAttribute(`min`, `0`);
    priceElement.setAttribute(`placeholder`, `0`);
    priceElement.setAttribute(`value`, `0`);
    priceElement.value = 0;
  } else if (typeElement.value === `flat`) {
    priceElement.setAttribute(`min`, `1000`);
    priceElement.setAttribute(`placeholder`, `1000`);
    priceElement.setAttribute(`value`, `1000`);
    priceElement.value = 1000;
  } else if (typeElement.value === `house`) {
    priceElement.setAttribute(`min`, `5000`);
    priceElement.setAttribute(`placeholder`, `5000`);
    priceElement.setAttribute(`value`, `5000`);
    priceElement.value = 5000;
  } else if (typeElement.value === `palace`) {
    priceElement.setAttribute(`min`, `10000`);
    priceElement.setAttribute(`placeholder`, `10000`);
    priceElement.setAttribute(`value`, `10000`);
    priceElement.value = 10000;
  }
};
setTypeDependencies();
typeElement.addEventListener('change', () => {
  setTypeDependencies();
});

// время заезда и выезда

let setTimeInDependencies = () => {

  if (timeIn.value === `12:00`) {
    timeOut.value = `12:00`;

  } else if (timeIn.value === `13:00`) {
    timeOut.value = `13:00`;

  } else if (timeIn.value === `14:00`) {
    timeOut.value = `14:00`;

  }
};

timeIn.addEventListener('change', () => {
  setTimeInDependencies();
});

let setTimeOutDependencies = function () {

  if (timeOut.value === `12:00`) {
    timeIn.value = `12:00`;

  } else if (timeOut.value === `13:00`) {
    timeIn.value = `13:00`;

  } else if (timeOut.value === `14:00`) {
    timeIn.value = `14:00`;

  }
};

timeOut.addEventListener('change', () => {
  setTimeOutDependencies();
});

// кол-во комнат и гости

roomNumber.addEventListener(`change`, () => {
  let roomsCount = document.querySelector(`#room_number`).value;
  valid.fields.rooms = false;
  Array.from(document.querySelector(`#capacity`).options).forEach(function (option) {
    if (ROOMS_TO_GUESTS_MAP[roomsCount].includes(option.value)) {
      option.removeAttribute(`disabled`);
      option.setAttribute(`selected`, ``);
      valid.fields.rooms = true;
    } else {
      option.setAttribute(`disabled`, ``);
      option.removeAttribute(`selected`);
    }
  });
});

const setAllowedFiles = function () {
  document.querySelector(`#avatar`).setAttribute(`accept`, `image/png, image/jpeg`);
  document.querySelector(`#images`).setAttribute(`accept`, `image/png, image/jpeg`);
};
setAllowedFiles();

const saveHandler = () => {
  window.disabledSite();
  const successMesage = successTemplate.cloneNode(true);
  document.querySelector('.ad-form').appendChild(successMesage);
  successMesage.addEventListener(`click`, () => {
    successMesage.remove();
  });
  document.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Escape`) {
      successMesage.remove();
    }
  });
};
const saveerrorHandler = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  document.querySelector(`main`).appendChild(errorMessage);
  errorMessage.addEventListener(`click`, () => {
    errorMessage.remove();
  });
  document.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Escape`) {
      errorMessage.remove();
    }
  });
};

adFormButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  const formData = new FormData(form);
  if (valid.check()) {
    window.save(formData, saveHandler, saveerrorHandler);

  }
});

resetForm.addEventListener(`click`, () => {
  form.reset();
  window.mainPin.setAttribute('style', window.startMainPin);
  window.getAddress(false);
  const headerPhoto = document.querySelector(`.ad-form-header__preview img`);
  if (headerPhoto.dataset.src) {
    headerPhoto.src = headerPhoto.dataset.src;
  }
  document.querySelectorAll('button.map__pin').forEach((pin) => {
    if (!pin.classList.contains('map__pin--main')) {
      pin.remove();
    }
  });
  window.disabledSite();
});
