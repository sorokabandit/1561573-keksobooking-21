'use strict';
const userWindow = document.querySelector(`.map`);
userWindow.classList.remove(`map--faded`);
const userWindowPin = userWindow.querySelector(`.map__pins`);
const mainPin = document.querySelector(`.map__pin--main`);
const advertising = document.querySelector(`.ad-form`);
const filters = document.querySelector(`.map__filters`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const priceElement = document.querySelector(`#price`);
const typeElement = document.querySelector(`#type`);
const timeOut = document.querySelector(`#timeout`);
const timeIn = document.querySelector(`#timein`);


const announcements = [];
const type = [`palace`, `flat`, `house`, `bungalow`];
const checkin = [`12:00`, `13:00`, `14:00`];
const features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
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


for (let i = 0; i < 8; i++) {
  let obj = {};
  obj.author = {};
  obj.author.avatar = `img/avatars/user0${Math.floor(Math.random() * 7 + 1)}.png`;
  obj.offer = {};
  obj.offer.title = 'For sale';
  obj.offer.address = `${Math.floor(Math.random() * 1000)}, ${Math.floor(Math.random() * 1000)}`;
  obj.offer.price = Math.floor(Math.random() * 10000) + `₽/ночь`;
  obj.offer.type = type[Math.floor(Math.random() * 4)];
  obj.offer.rooms = Math.floor(Math.random() * 6);
  obj.offer.guests = Math.floor(Math.random() * 10);
  obj.offer.checkin = checkin[Math.floor(Math.random() * 2)];
  obj.offer.checkout = checkin[Math.floor(Math.random() * 2)];
  obj.offer.features = features[Math.floor(Math.random() * 5)];
  obj.offer.description = 'огромная квартира для большой компании';
  obj.offer.photos = photos[Math.floor(Math.random() * 2)];
  obj.location = {};
  obj.location.x = Math.floor(Math.random() * document.querySelector('.map__pins').getBoundingClientRect().width);
  obj.location.y = Math.floor(Math.random() * 500 + 130);
  announcements.push(obj);
}

function getAnouncement() {

  for (let index = 0; index < announcements.length; index++) {
    let t = document.querySelector('#pin'),
      buttonNode = t.content.querySelector('button').cloneNode(true);
    buttonNode.querySelector('img').src = announcements[index].author.avatar;
    buttonNode.querySelector('img').alt = announcements[index].offer.title;
    buttonNode.style.left = announcements[index].location.x + 'px';
    buttonNode.style.top = announcements[index].location.y + 'px';
    document.querySelector('.map__pins').appendChild(buttonNode);
  }
}
getAnouncement();

const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE_LENGTH = 1000000;
const userName = document.querySelector(`#title`);
const userPrice = document.querySelector(`#price`);
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
const roomNumber = document.querySelector('#room_number');
const roomNumberOptions = roomNumber.querySelectorAll('option');
const capacity = document.querySelector('#capacity')
const capacityOptions = capacity.querySelectorAll('option');
const ROOMS_TO_GUESTS_MAP = {
  '1': [`1`],
  '2': [`1`, `2`],
  '3': [`1`, `2`, `3`],
  '100': [`0`]
};
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





// значение полей ваша фотография фотографи жилья
const setAllowedFiles = function () {
  document.querySelector(`#avatar`).setAttribute(`accept`, `image/png, image/jpeg`);
  document.querySelector(`#images`).setAttribute(`accept`, `image/png, image/jpeg`);
};
setAllowedFiles();













