/**
 * модуль, который отвечает за создание карточки объявлений
 */
'use strict';

(function (){

	function generateCardAdv(item) {
		let avatar = item.author.avatar;
		let templateCard = document
			.querySelector("#card")
			.content.querySelector(".map__card");
		let element = templateCard.cloneNode(true);
		element.querySelector(".popup__avatar").src = avatar;
		element.querySelector(".popup__title").textContent = item.offer.title;
		element.querySelector(".popup__text--address").textContent =
			item.offer.address;
		element.querySelector(".popup__text--price").textContent = getPrice(item);
		element.querySelector(".popup__type").textContent = translateType(item);
		element.querySelector(".popup__text--capacity").textContent = getGuestsAndRooms(item);
		element.querySelector(".popup__text--time").textContent = getChecinCheckout(item);
		let featuresDiv = element.querySelector('.popup__features');
		removeChilds(featuresDiv);
		featuresDiv.appendChild(generateFeatures(item.offer.features));
		element.querySelector(".popup__description").textContent = item.offer.description;
	
		let photosBlock = element.querySelector(".popup__photos");
		let tmp = element.querySelector(".popup__photo")
		photosBlock.removeChild(tmp);
		photosBlock.appendChild(generatePhotos(item))
	
		map.insertBefore(element, map.children[0]);
	
		function removeChilds(element) {
			while(element.firstChild) {
				element.removeChild(element.firstChild);
			}
		}
		return element;
	}

//возвращает цену квартиры в виде строки
function getPrice(item) {
  return item.offer.price + "₽/ночь";
}

function getGuestsAndRooms (item) {
	return item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
}
//-------шаблон для вывода строки заезда/выезда
function getChecinCheckout(item) {
	return 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
}

function generatePhotos(item) {
	let fragment = document.createDocumentFragment();
	for(let i= 0; i < item.offer.photos.length; i++) {
		let img = document.createElement('img');
		img.src = item.offer.photos[i];
		img.className = 'popup__photo';
		img.width = "45";
		img.height = "40";
		img.alt = "Фотография жилья";
		fragment.appendChild(img);
	}
	return fragment;
}

//-----------------------------
function translateType(item) {
  let type = item.offer.type;
  switch (type) {
    case "flat":
      return "Квартира";
    case "bungalo":
      return "Бунгало";
    case "house":
      return "Дом";
    case "palace":
      return "Дворец";
  }
}


function createIconFeature(feature) {
	let icon = document.createElement('li');
	icon.classList.add('popup__feature'); // popup__feature--wifi
	icon.classList.add('popup__feature--'+feature);
	return icon;
}

function generateFeatures(features) {
	let fragment = document.createDocumentFragment();
	for (let i = 0; i < features.length; i++) {
		fragment.appendChild(createIconFeature(features[i]));		
	}

	return fragment;	
}

	window.card = {
		generateCardAdv: generateCardAdv
	}
})();