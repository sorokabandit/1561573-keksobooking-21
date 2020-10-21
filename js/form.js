'use strick';
const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE_LENGTH = 1000000;
const userName = document.querySelector(`#title`);
const userPrice = document.querySelector(`#price`);
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const priceElement = document.querySelector(`#price`);
const typeElement = document.querySelector(`#type`);
const timeOut = document.querySelector(`#timeout`);
const timeIn = document.querySelector(`#timein`);
const ROOMS_TO_GUESTS_MAP = {
  '1': [`1`],
  '2': [`1`, `2`],
  '3': [`1`, `2`, `3`],
  '100': [`0`]
};


userName.addEventListener(`input`, function () {
  let valueLength = userName.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userName.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userName.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
  } else {
    userName.setCustomValidity('');
  }
  userName.reportValidity();
});

userPrice.addEventListener(`input`, function () {
  let valueLength = userPrice.value;

  if (valueLength > MAX_PRICE_LENGTH) {
    userPrice.setCustomValidity(`Сумма может быть не больше ` + MAX_PRICE_LENGTH);
  } else {
    userPrice.setCustomValidity(``);
  }
  userPrice.reportValidity();
});

let setTypeDependencies = function () {

  if (typeElement.value === `bungalow`) {
    priceElement.setAttribute(`min`, `0`);
    priceElement.setAttribute(`placeholder`, `0`);
  } else if (typeElement.value === `flat`) {
    priceElement.setAttribute(`min`, `1000`);
    priceElement.setAttribute(`placeholder`, `1000`);
  } else if (typeElement.value === `house`) {
    priceElement.setAttribute(`min`, `5000`);
    priceElement.setAttribute(`placeholder`, `5000`);
  } else if (typeElement.value === `palace`) {
    priceElement.setAttribute(`min`, `10000`);
    priceElement.setAttribute(`placeholder`, `10000`);
  }
};
setTypeDependencies();
typeElement.addEventListener('change', () => {
  setTypeDependencies();
});

// время заезда и выезда

let setTimeInDependencies = function () {

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

  Array.from(document.querySelector(`#capacity`).options).forEach(function (option) {
    if (ROOMS_TO_GUESTS_MAP[roomsCount].includes(option.value)) {
      option.removeAttribute(`disabled`);
      option.setAttribute(`selected`, ``);
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

