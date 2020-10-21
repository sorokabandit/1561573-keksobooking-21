'use strict';

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

const countPins = 5;
const successHandler = function (data) {
  window.announcements = data;

  for (let i = 0; i < countPins; i++) {
    let t = document.querySelector('#pin'),
      buttonNode = t.content.querySelector('button').cloneNode(true);
    buttonNode.querySelector('img').src = window.announcements[i].author.avatar;
    buttonNode.querySelector('img').alt = window.announcements[i].offer.title;
    buttonNode.style.left = window.announcements[i].location.x + 'px';
    buttonNode.style.top = window.announcements[i].location.y + 'px';
    document.querySelector('.map__pins').appendChild(buttonNode);
  }

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


