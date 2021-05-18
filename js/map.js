/**
 * модуль, который управляет карточками объявлений и пинами: 
 * добавляет на страницу нужную карточку, отрисовывает пины 
 * и осуществляет взаимодействие карточки и метки на карте
 * 
 * generatePins(list)
 */

 'use strict';

(function() {
	let map = document.querySelector(".map");
	//let pins = document.querySelector(".map__pins");
	// let list = window.data.generateListAds();
	//let listOfPins = [];

	let clickedPin = null;
	let currentCard = null;
	let loadedOffers = [];
	
	
	/**
	 * функция, которая открывает карточку метки-объявления
	 * @param {*} evt - текущая метка
	 */
	function activateOffer(evt) {
				if (clickedPin) {
					hideOffer();
				}
				clickedPin = evt.currentTarget;
				currentCard = window.card.generateCardAdv(clickedPin.data);
				let popupClose = document.querySelector('.popup__close');
				popupClose.addEventListener('click', hideOffer);
				
	}
	
	function hideOffer() {
		if (currentCard) {
			currentCard.remove();
			clickedPin = null;
		}
	}
	
	/**
	 * функция, которая генерирует метки на карте
	 * @param {*} list - список меток 
	 */
	function generatePins(list) {
		let pinsTokio = document.querySelector(".map__pins");
		let fragment = document.createDocumentFragment();
		let templateMapPin = document
			.querySelector("#pin")
			.content.querySelector(".map__pin");

		for (let i = 0; i < list.length; i++) {
			let element = templateMapPin.cloneNode(true);
			element.children[0].src = list[i].author.avatar;
			element.children[0].alt = list[i].title;
			element.style.left = list[i].location.x + "px";
			element.style.top = list[i].location.y + "px";
			element.data = list[i];
	
			element.addEventListener('click', activateOffer);
	
			fragment.appendChild(element);
		}
	
		pinsTokio.appendChild(fragment);
	}


	function successLoadedData(list) {
		loadedOffers = list;
		let  filtered = window.filter.filterOffers(loadedOffers);
		generatePins(filtered);
		//console.log(filtered);
	}

	function clearPins() {
		let mapPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
		mapPins.forEach((item) => item.parentNode.removeChild(item));
	}
	
	window.filter.setCallback(() => {
		hideOffer();
		clearPins();
		let  filtered = window.filter.filterOffers(loadedOffers).slice(0, 5);
		generatePins(filtered);
	});

	window.map = {
		//list: listOfPins,
	//	generatePins: generatePins,
		hideOffer: hideOffer,
		activateOffer: activateOffer,
		successLoadedData: successLoadedData
	}
})();


