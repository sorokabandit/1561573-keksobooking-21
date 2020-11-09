'use strict';

const buttonPin = document.querySelector('#pin').content.querySelector(`.map__pin`);
window.announcements = [];

window.renderPins = (pins, limit) => {
  document.querySelectorAll('button.map__pin').forEach((pin) => {
    if (!pin.classList.contains('map__pin--main')) {
      pin.remove();
      pin.removeEventListener(`keydown`, (evt) => {
        if (evt.key === `Enter`) {
          window.getCard(i);
        }
      });
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
      if (evt.key === `Enter`) {
        window.getCard(i);
      }
    });
  }
};
window.COUNT_PINS = 5;

const filtersForm = document.querySelector('.map__filters');
const selects = filtersForm.querySelectorAll('select');
const checkboxes = filtersForm.querySelectorAll('input[type=checkbox]');
const prices = {
  middle: [10000, 50000],
  low: [0, 9999],
  high: [50001, 1000000000000000]
};

const getFilters = () => {
  getClosePopup();
  const filters = [];
  const checkedFeatures = filtersForm.querySelectorAll('input[type=checkbox]:checked');
  const features = [];
  selects.forEach((e) => {
    filters.push({
      name: e.getAttribute('name').replace('housing-', ''),
      value: e.value
    });
  });
  checkedFeatures.forEach((e) => {
    features.push(e.value);
  });
  let result = window.announcements.filter((announcement) => {
    return filters.every((filter) => {
      if (filter.name === 'price' && filter.value !== 'any') {
        return between(announcement.offer.price, prices[filter.value][0], prices[filter.value][1]);
      }
        return String(announcement.offer[filter.name]) === String(filter.value) || filter.value === 'any';
    });
  });
  if (features.length) {
    result = result.filter((el) => {
      const compare = [];
      features.forEach((fc) => {
        compare.push(el.offer.features.includes(fc));
      });
      return compare.every((i) => i === true);
    });
  }
  window.filteredAnnounements = result;
  window.renderPins(result, window.COUNT_PINS);


};
selects.forEach((select) => {
  select.addEventListener('change', function () {
    window.debounce(function () {
      getFilters();
    })();
  });
});


checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    window.debounce(() => {
      getFilters();
    })();
  });
});


const between = (x, min, max) => {
  return x >= min && x <= max;
}
