'use strict';
const userWindow = document.querySelector(`.map`);
userWindow.classList.remove(`map--faded`);
const announcements = [
  {
    author: {
      avatar: 'img/avatars/user04.png'
    },
    offer: {
      title: 'For sale',
      address: '600, 350',
      price: 5000000,
      type: 'flat',
      rooms: 5,
      guests: 10,
      checkin: '12:00',
      checkout: '14:00',
      features: ['wifi', 'dishwasher', 'parking'],
      description: 'огромная квартира для большой компании',
      photos: ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"],
    },
    location: {
      x: 150,
      y: 420
    }
  },
  {
    author: {
      avatar: 'img/avatars/user03.png'
    },
    offer: {
      title: 'For sale',
      address: '600, 350',
      price: 5000000,
      type: 'flat',
      rooms: 5,
      guests: 10,
      checkin: '12:00',
      checkout: '14:00',
      features: ['wifi', 'dishwasher', 'parking'],
      description: 'огромная квартира для большой компании',
      photos: ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"],
    },
    location: {
      x: 280,
      y: 140
    }
  },
  {
    author: {
      avatar: 'img/avatars/user01.png'
    },
    offer: {
      title: 'For sale',
      address: '600, 350',
      price: 5000000,
      type: 'flat',
      rooms: 5,
      guests: 10,
      checkin: '12:00',
      checkout: '14:00',
      features: ['wifi', 'dishwasher', 'parking'],
      description: 'огромная квартира для большой компании',
      photos: ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"],
    },
    location: {
      x: 150,
      y: 580
    }
  },
  {
    author: {
      avatar: 'img/avatars/user01.png'
    },
    offer: {
      title: 'For sale',
      address: '600, 350',
      price: 5000000,
      type: 'flat',
      rooms: 5,
      guests: 10,
      checkin: '12:00',
      checkout: '14:00',
      features: ['wifi', 'dishwasher', 'parking'],
      description: 'огромная квартира для большой компании',
      photos: ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"],
    },
    location: {
      x: 380,
      y: 540
    }
  },
  {
    author: {
      avatar: 'img/avatars/user08.png'
    },
    offer: {
      title: 'For sale',
      address: '600, 350',
      price: 5000000,
      type: 'flat',
      rooms: 5,
      guests: 10,
      checkin: '12:00',
      checkout: '14:00',
      features: ['wifi', 'dishwasher', 'parking'],
      description: 'огромная квартира для большой компании',
      photos: ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"],
    },
    location: {
      x: 150,
      y: 180
    }
  },
  {
    author: {
      avatar: 'img/avatars/user07.png'
    },
    offer: {
      title: 'For sale',
      address: '600, 350',
      price: 5000000,
      type: 'flat',
      rooms: 5,
      guests: 10,
      checkin: '12:00',
      checkout: '14:00',
      features: ['wifi', 'dishwasher', 'parking'],
      description: 'огромная квартира для большой компании',
      photos: ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"],
    },
    location: {
      x: 210,
      y: 101
    }
  },
  {
    author: {
      avatar: 'img/avatars/user06.png'
    },
    offer: {
      title: 'For sale',
      address: '600, 350',
      price: 5000000,
      type: 'flat',
      rooms: 5,
      guests: 10,
      checkin: '12:00',
      checkout: '14:00',
      features: ['wifi', 'dishwasher', 'parking'],
      description: 'огромная квартира для большой компании',
      photos: ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"],
    },
    location: {
      x: 540,
      y: 600
    }
  },
  {
    author: {
      avatar: 'img/avatars/user05.png'
    },
    offer: {
      title: 'For sale',
      address: '600, 350',
      price: 5000000,
      type: 'flat',
      rooms: 5,
      guests: 10,
      checkin: '12:00',
      checkout: '14:00',
      features: ['wifi', 'dishwasher', 'parking'],
      description: 'огромная квартира для большой компании',
      photos: ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"],
    },
    location: {
      x: 450,
      y: 500
    }
  }
];
getAnouncement();
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

