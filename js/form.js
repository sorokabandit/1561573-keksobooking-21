'use strict';
const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE_LENGTH = 1000000;
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
const ROOMS_TO_GUESTS_MAP = {
  '1': [`1`],
  '2': [`1`, `2`],
  '3': [`1`, `2`, `3`],
  '100': [`0`]
};

let Valid = new Validate();
class Validate {
  constructor() {
    this.fields = {
      name: false,
      price: true,
      rooms: true
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
  reset() {
    this.fields.name = false;
    this.fields.price = true;
    this.fields.rooms = true;
  }
}


const validateUserName = (nameInput) => {
  let valueLength = nameInput.value.length;
  Valid.fields.name = false;
  if (valueLength < MIN_NAME_LENGTH) {
    nameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    nameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
  } else {
    nameInput.setCustomValidity('');
    Valid.fields.name = true;
  }
  nameInput.reportValidity();
};
userName.addEventListener('input', () => {
  validateUserName(userName);
});

const validateUserPrice = (priceInput) => {
  let valueLength = priceInput.value;
  Valid.fields.price = false;
  if (valueLength > MAX_PRICE_LENGTH) {
    priceInput.setCustomValidity(`Сумма может быть не больше ` + MAX_PRICE_LENGTH);
  } else {
    priceInput.setCustomValidity(``);
    Valid.fields.price = true;
  }
  priceInput.reportValidity();
};
userPrice.addEventListener('input', () => {
  validateUserPrice(userPrice);
});

let setTypeDependencies = () => {
  switch (typeElement.value) {
    case 'bungalow':
      priceElement.setAttribute(`min`, `0`);
      priceElement.setAttribute(`placeholder`, `0`);
      priceElement.setAttribute(`value`, `0`);
      priceElement.value = 0;
      break;
    case 'flat':
      priceElement.setAttribute(`min`, `1000`);
      priceElement.setAttribute(`placeholder`, `1000`);
      priceElement.setAttribute(`value`, `1000`);
      priceElement.value = 1000;
      break;
    case 'house':
      priceElement.setAttribute(`min`, `5000`);
      priceElement.setAttribute(`placeholder`, `5000`);
      priceElement.setAttribute(`value`, `5000`);
      priceElement.value = 5000;
      break;
    case 'palace':
      priceElement.setAttribute(`min`, `10000`);
      priceElement.setAttribute(`placeholder`, `10000`);
      priceElement.setAttribute(`value`, `10000`);
      priceElement.value = 10000;
      break;
  }
};
setTypeDependencies();
typeElement.addEventListener('input', () => {
  setTypeDependencies();
});

// время заезда и выезда

let setTimeInDependencies = () => {
  switch (timeIn.value) {
    case '12:00':
      timeOut.value = `12:00`;
      break;
    case '13:00':
      timeOut.value = `13:00`;
      break;
    case '14:00':
      timeOut.value = `14:00`;
      break;
  }
};
timeIn.addEventListener('change', () => {
  setTimeInDependencies();
});

let setTimeOutDependencies = () => {
  switch (timeOut.value) {
    case '12:00':
      timeIn.value = `12:00`;
      break;
    case '13:00':
      timeIn.value = `13:00`;
      break;
    case '14:00':
      timeIn.value = `14:00`;
      break;
  }
};

timeOut.addEventListener('change', () => {
  setTimeOutDependencies();
});


if (Number(roomNumber.value) === 1) {
  Array.from(document.querySelector(`#capacity`).options).forEach((option) => {
    if (Number(option.getAttribute(`value`)) !== 1) {
      option.setAttribute(`disabled`, `disabled`);
    }
  });
}

window.compareRooms = () => {
  let roomsCount = document.querySelector(`#room_number`).value;
  Valid.fields.rooms = false;
  Array.from(document.querySelector(`#capacity`).options).forEach((option) => {
    if (ROOMS_TO_GUESTS_MAP[roomsCount].includes(option.value)) {
      option.removeAttribute(`disabled`);
      option.setAttribute(`selected`, ``);
      Valid.fields.rooms = true;
    } else {
      option.setAttribute(`disabled`, ``);
      option.removeAttribute(`selected`);
    }
  });
};
roomNumber.addEventListener(`change`, window.compareRooms);


const setAllowedFiles = () => {
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
  if (Valid.check()) {
    window.getClosePopup();

    window.save(formData, saveHandler, saveerrorHandler);
    window.mainPin.setAttribute('style', window.startMainPin);
    window.getAddress(false);
    window.disabledSite();
    form.reset();
    document.querySelectorAll('button.map__pin').forEach((pin) => {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });
    const headerPhoto = document.querySelector(`.ad-form-header__preview img`);
    if (headerPhoto.dataset.src) {
      headerPhoto.src = headerPhoto.dataset.src;
    }
    const footerPhoto = document.querySelector(`.ad-form__photo img`);
    if (footerPhoto.dataset.src) {
      footerPhoto.src = footerPhoto.dataset.src;
    }
    Valid.reset();
    setTypeDependencies();
  } else {
    validateUserName(userName);
    validateUserPrice(userPrice);
  }


});

resetForm.addEventListener(`click`, () => {
  form.reset();
  window.compareRooms();
  setTypeDependencies();
  window.mainPin.setAttribute('style', window.startMainPin);
  window.getAddress(false);
  const headerPhoto = document.querySelector(`.ad-form-header__preview img`);
  if (headerPhoto.dataset.src) {
    headerPhoto.src = headerPhoto.dataset.src;
  }
  const footerPhoto = document.querySelector(`.ad-form__photo img`);
  if (footerPhoto.dataset.src) {
    footerPhoto.src = footerPhoto.dataset.src;
  }
  document.querySelectorAll('button.map__pin').forEach((pin) => {
    if (!pin.classList.contains('map__pin--main')) {
      pin.remove();
    }
  });
  window.disabledSite();
});
