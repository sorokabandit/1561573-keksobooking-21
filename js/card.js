'use strict';
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const photoTemplate = cardTemplate.querySelector(`.popup__photos`);
const getPhoto = (el, sum, card) => {
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < sum; index++) {
    const photoItem = el.offer.photos[index];
    fragment.appendChild(renderPhoto(photoItem));
  }
  card.appendChild(fragment);
};
const renderCard = (card) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${card.offer.price}/ночь`;
  cardElement.querySelector('.popup__type').textContent = card.offer.type;
  cardElement.querySelector('.popup__features').innerHTML = '';
  card.offer.features.forEach((el) => {
    const li = document.createElement('li');
    li.classList.add('popup__feature');
    const elClass = 'popup__feature--' + el;
    li.classList.add(elClass);
    cardElement.querySelector('.popup__features').appendChild(li);
  });
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  cardElement.querySelector(`.popup__description`).textContent = card.offer.description;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  cardElement.querySelector('.popup__photos').innerHTML = "";


  getPhoto(card, card.offer.photos.length, cardElement.querySelector('.popup__photos'));
  return cardElement;
};
const renderPhoto = (photo) => {
  const phototem = photoTemplate.querySelector('.popup__photo');
  const photoElement = phototem.cloneNode(true);
  phototem.src = photo;

  return photoElement;
};


window.getClosePopup = () => {
  const popup = document.querySelector('.map__card.popup');
  if (popup) {
    popup.remove();
  }
  document.removeEventListener(`keydown`, closePopupHandler);
};
const closePopupHandler = (evt) => {
  if (evt.key === `Escape`) {
    window.getClosePopup();
  }
};
window.getCard = (index) => {
  const popup = document.querySelector('.map__card.popup');
  if (popup) {
    popup.remove();
  }

  const fragment = document.createDocumentFragment();
  const mapFilter = document.querySelector(`.map__filters-container`);
  const map = document.querySelector(`.map`);
  const cardItem = window.filteredAnnounements[index];
  fragment.appendChild(renderCard(cardItem));

  document.addEventListener(`keydown`, closePopupHandler);
  const closePopup = fragment.querySelector(`.popup__close`);
  closePopup.addEventListener('click', window.getClosePopup);
  map.insertBefore(fragment, mapFilter);
};
