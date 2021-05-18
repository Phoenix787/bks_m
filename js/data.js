/**
 * модуль, который создаёт данные
 */
(function() {
	let DATA_ADS = {
  TITLE: [
    "Большая уютная квартира",
    "Маленькая неуютная квартира",
    "Огромный прекрасный дворец",
    "Маленький ужасный дворец",
    "Красивый гостевой домик",
    "Некрасивый негостеприимный домик",
    "Уютное бунгало далеко от моря",
    "Неуютное бунгало по колено в воде",
  ],
  MIN_X: 300,
  MAX_X: 900,
  MIN_Y: 100,
  MAX_Y: 500,
  PRICE_MIN: 1000,
  PRICE_MAX: 1000000,
  TYPE: ["palace", "flat", "house", "bungalo"],
  GUEST_MIN: 1,
  GUEST_MAX: 20,
  CHECKIN: ["12:00", "13:00", "14:00"],
  CHECKOUT: ["12:00", "13:00", "14:00"],
  FACILITY: ["wifi", "dishwasher", "parking", "elevator", "conditioner"],
  PHOTOS: [
    "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
    "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
    "http://o0.github.io/assets/images/tokyo/hotel3.jpg",
  ],
};

// function generatePins(list) {
//   let pinsTokio = document.querySelector(".map__pins");
//   let fragment = document.createDocumentFragment();
//   let templateMapPin = document
//     .querySelector("#pin")
//     .content.querySelector(".map__pin");
//   for (let i = 0; i < list.length; i++) {
//     let element = templateMapPin.cloneNode(true);
//     element.children[0].src = list[i].author.avatar;
//     element.children[0].alt = list[i].title;
//     element.style.left = list[i].location.x + "px";
//     element.style.top = list[i].location.y + "px";
// 		element.data = list[i];

// 		element.addEventListener('click', activateOffer);

//     fragment.appendChild(element);
//   }

//   pinsTokio.appendChild(fragment);
// }

function generateListAds() {
  let result = [];

  for (let i = 0; i < 8; i++) {
    let locationX = window.util.generateRandomNumber(DATA_ADS.MIN_X, DATA_ADS.MAX_X);
    let locationY = window.util.generateRandomNumber(DATA_ADS.MIN_Y, DATA_ADS.MAX_Y);
    let ad = {
      author: {
        avatar: generateAvatars(),
      },
      offer: {
        title: getTitle(),
        address: locationX + ", " + locationY,
        price: window.util.generateRandomNumber(DATA_ADS.PRICE_MIN, DATA_ADS.PRICE_MAX),
        type: DATA_ADS.TYPE[window.util.generateRandomNumber(0, DATA_ADS.TYPE.length)],
        rooms: window.util.generateRandomNumber(1, 5),
        guests: window.util.generateRandomNumber(DATA_ADS.GUEST_MIN, DATA_ADS.GUEST_MAX),
        checkin:
          DATA_ADS.CHECKIN[
            window.util.generateRandomNumber(0, DATA_ADS.CHECKIN.length - 1)
          ],
        checkout:
          DATA_ADS.CHECKOUT[
            window.util.generateRandomNumber(0, DATA_ADS.CHECKOUT.length - 1)
          ],
        features: window.util.getArrayLength(DATA_ADS.FACILITY),
        description: "Какая-то информация, описывающая комфортность и уютность жилья",
        photos: window.util.shuffleArray(DATA_ADS.PHOTOS),
      },
      location: {
        x: locationX,
        y: locationY,
      },
    };

    result.push(ad);
  }

  return result;
}
//-------------------------------------------------------------------------

function generateAvatars() {
  return "img/avatars/user0" + window.util.generateRandomNumber(1, 8) + ".png";
}

//------------------------------------------------------------------------
function getTitle() {
  return DATA_ADS.TITLE[window.util.generateRandomNumber(0, DATA_ADS.TITLE.length)];
}

// //--------------------------------------------------------------------------
// // function generateRandomNumber(min, max) {
// //   return Math.floor(Math.random() * (max - min + 1) + min);
// // }

// // //функция возвращяющая массив произвольной длины
// // function getArrayLength(arr) {
// //   let clone = arr.slice();
// //   clone.length = generateRandomNumber(1, arr.length);
// //   return clone;
// // }

// // //------------------------------------------------------------------------------
// // function shuffleArray(arr) {
// //   let mixed = arr.slice();
// //   for (let i = mixed.length - 1; i > 0; i--) {
// //     const randomIndex = Math.floor(Math.random() * (i + 1));
// //     let tmpItem = mixed[i];
// //     mixed[i] = mixed[randomIndex];
// //     mixed[randomIndex] = tmpItem;
// //   }

// //   return mixed;
// // }

// //возвращает цену квартиры в виде строки
// function getPrice(item) {
//   return item.offer.price + "₽/ночь";
// }

// function getGuestsAndRooms (item) {
// 	return item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
// }
// //-------шаблон для вывода строки заезда/выезда
// function getChecinCheckout(item) {
// 	return 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
// }

// function generatePhotos(item) {
// 	let fragment = document.createDocumentFragment();
// 	for(let i= 0; i < item.offer.photos.length; i++) {
// 		let img = document.createElement('img');
// 		img.src = item.offer.photos[i];
// 		img.className = 'popup__photo';
// 		img.width = "45";
// 		img.height = "40";
// 		img.alt = "Фотография жилья";
// 		fragment.appendChild(img);
// 	}
// 	return fragment;
// }

// //-----------------------------
// function translateType(item) {
//   let type = item.offer.type;
//   switch (type) {
//     case "flat":
//       return "Квартира";
//     case "bungalo":
//       return "Бунгало";
//     case "house":
//       return "Дом";
//     case "palace":
//       return "Дворец";
//   }
// }


// function createIconFeature(feature) {
// 	let icon = document.createElement('li');
// 	icon.classList.add('popup__feature'); // popup__feature--wifi
// 	icon.classList.add('popup__feature--'+feature);
// 	return icon;
// }

// function generateFeatures(features) {
// 	let fragment = document.createDocumentFragment();
// 	for (let i = 0; i < features.length; i++) {
// 		fragment.appendChild(createIconFeature(features[i]));		
// 	}

// 	return fragment;	
// }

window.data = {
	generateListAds: generateListAds,

}
})();