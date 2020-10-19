const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);


function renderCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price;
  cardElement.querySelector('.popup__type').textContent = card.offer.type;
  cardElement.querySelector('.popup__features').textContent = card.offer.features;
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  return cardElement;
}


function getCard() {
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < announcements.length; index++) {
    const cardItem = announcements[0];
    fragment.appendChild(renderCard(cardItem));

  }
  userWindowPin.appendChild(fragment);
}
getCard();
