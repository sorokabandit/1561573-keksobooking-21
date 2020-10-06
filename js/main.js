'use strict';
const userWindow = document.querySelector(`.map`);
userWindow.classList.remove(`map--faded`);
const announcements = [];
const type = [`palace`, `flat`, `house`, `bungalow`];
const checkin = [`12:00`, `13:00`, `14:00`];
const features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
for (let i = 0; i < 8; i++) {
  let obj = {};
  obj.author = {};
  obj.author.avatar = `img/avatars/user0${Math.floor(Math.random() * 8)}.png`;
  obj.offer = {};
  obj.offer.title = 'For sale';
  obj.offer.address = `${Math.floor(Math.random() * 1000)}, ${Math.floor(Math.random() * 1000)}`;
  obj.offer.price = Math.floor(Math.random() * 1000000);
  obj.offer.type =  type[Math.floor(Math.random() * 3)];
  obj.offer.rooms = Math.floor(Math.random() * 6);
  obj.offer.guests = Math.floor(Math.random() * 10);
  obj.offer.checkin = checkin[Math.floor(Math.random() * 2)];
  obj.offer.checkout = checkin[Math.floor(Math.random() * 2)];
  obj.offer.features =  features[Math.floor(Math.random() * 5)];
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
