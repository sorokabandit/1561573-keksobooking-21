'use strick';

const type = [`palace`, `flat`, `house`, `bungalow`];
const checkin = [`12:00`, `13:00`, `14:00`];
const features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
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
  obj.offer.photos = photos[Math.floor(Math.random() * 2)];
  obj.location = {};
  obj.location.x = Math.floor(Math.random() * document.querySelector('.map__pins').getBoundingClientRect().width);
  obj.location.y = Math.floor(Math.random() * 500 + 130);
  window.announcements.push(obj);
}


function getAnouncement() {

  for (let index = 0; index < window.announcements.length; index++) {
    let t = document.querySelector('#pin'),
      buttonNode = t.content.querySelector('button').cloneNode(true);
    buttonNode.querySelector('img').src = window.announcements[index].author.avatar;
    buttonNode.querySelector('img').alt = window.announcements[index].offer.title;
    buttonNode.style.left = window.announcements[index].location.x + 'px';
    buttonNode.style.top = window.announcements[index].location.y + 'px';
    document.querySelector('.map__pins').appendChild(buttonNode);
  }
}
getAnouncement();



