'use strict';

const buttonPin = document.querySelector('#pin').content.querySelector(`.map__pin`);
const type = [`palace`, `flat`, `house`, `bungalow`];
const checkin = [`12:00`, `13:00`, `14:00`];
const features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
window.announcements = [];


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
  obj.offer.features = features[Math.floor(Math.random() * 5)] + ', ' + features[Math.floor(Math.random() * 5)];
  obj.offer.description = 'огромная квартира для большой компании';
  obj.offer.photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
  obj.location = {};
  obj.location.x = Math.floor(Math.random() * document.querySelector('.map__pins').getBoundingClientRect().width);
  obj.location.y = Math.floor(Math.random() * 500 + 130);
  window.announcements.push(obj);
}
const renderPins = (pins, limit) => {
  document.querySelectorAll('button.map__pin').forEach((pin) => {
    if (!pin.classList.contains('map__pin--main')) {
      pin.remove();
    }
  });

  for (let i = 0; i < limit && i < pins.length; i++) {
    const pinElem = buttonPin.cloneNode(true);
    pinElem.querySelector('img').src = pins[i].author.avatar;
    pinElem.querySelector('img').alt = pins[i].offer.title;
    pinElem.style.left = pins[i].location.x + 'px';
    pinElem.style.top = pins[i].location.y + 'px';
    document.querySelector('.map__pins').appendChild(pinElem);
    pinElem.addEventListener(`click`, () => {

      window.getCard(i);
    });
    pinElem.addEventListener(`keydown`, (evt) => {
      if (evt.keycode === `Enter`) {
        window.getCard(i);
      }
    });
  }
};

const countPins = 5;
const successHandler = function (data) {
  window.announcements = data;
  window.filteredAnnounements = data;
  renderPins(window.announcements, countPins);
};
const errorHandler = function (errorMessage) {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;

  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};
window.load(successHandler, errorHandler);
// window.save();

const filtersForm = document.querySelector('.map__filters');
const selects = filtersForm.querySelectorAll('select');


const getFilters = function () {
  const filters = [];
  // set range of prices
  const prices = {
    middle: [10000, 50000],
    low: [0, 9999],
    high: [50001, 1000000000000000]
  };
  // create filters array
  selects.forEach((e) => {
    filters.push({
      name: e.getAttribute('name').replace('housing-', ''),
      value: e.value
    });
  });
  // find houses
  const result = window.announcements.filter((announcement) => {
    return filters.every((filter) => {
      if (filter.name === 'price' && filter.value !== 'any') {
        return between(announcement.offer.price, prices[filter.value][0], prices[filter.value][1]);
      } else {
        return String(announcement.offer[filter.name]) === String(filter.value) || filter.value === 'any';
      }
    });
  });
  window.filteredAnnounements = result;
  renderPins(result, countPins);
};
selects.forEach((select) => {
  select.addEventListener('change', getFilters);
});

function between(x, min, max) {
  return x >= min && x <= max;
}
