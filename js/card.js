const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const photoTemplate = cardTemplate.querySelector(`.popup__photos`);

function renderCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price;
  cardElement.querySelector('.popup__type').textContent = card.offer.type;
  cardElement.querySelector('.popup__features').textContent = card.offer.features;
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  cardElement.querySelector(`.popup__description`).textContent = card.offer.description;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  cardElement.querySelector('.popup__photos').innerHTML = "";
  getPhoto(card, card.offer.photos.length, cardElement.querySelector('.popup__photos'));
  //console.log(card, card.offer.photos.length)
  return cardElement;
}
function renderPhoto(photo) {
  const phototem = photoTemplate.querySelector('.popup__photo');
  const photoElement = phototem.cloneNode(true);
  phototem.src = photo;

  return photoElement;
}
function getPhoto(el, sum, card) {
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < sum; index++) {
    const photoItem = el.offer.photos[index];
    fragment.appendChild(renderPhoto(photoItem));
    console.log(index, photoItem);
  }

  //photoTemplate.innerHTML = '';
  card.appendChild(fragment);
  console.log(photoTemplate);

}


function getCard() {
  const fragment = document.createDocumentFragment();
  const mapFilter = document.querySelector(`.map__filters-container`);
  const map = document.querySelector(`.map`);
  for (let index = 0; index < announcements.length; index++) {
  const cardItem = announcements[0];
  fragment.appendChild(renderCard(cardItem));
  //console.log(cardItem)

  }
  map.insertBefore(fragment, mapFilter);
}
getCard();
console.log(document.querySelector('.map__card.popup'))

