'use strict';

const buttonPin = document.querySelector('#pin').content.querySelector(`.map__pin`);
window.announcements = [];

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
  select.addEventListener('change', function () {
    window.debounce(function () {
      getFilters();
    })();
  });
});


function between(x, min, max) {
  return x >= min && x <= max;
}
