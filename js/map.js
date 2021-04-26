/**
 * модуль, который управляет карточками объявлений и пинами: 
 * добавляет на страницу нужную карточку, отрисовывает пины 
 * и осуществляет взаимодействие карточки и метки на карте
 */

let map = document.querySelector(".map");
(function() {
	let pins = document.querySelector(".map__pins");
	let list = window.data.generateListAds();
	let clickedPin = null;
	let currentCard = null;
	
	
	//------------------------------------------------------------------------
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
	
	window.map = {
		list: list,
		generatePins: generatePins,
		hideOffer: hideOffer,
		activateOffer: activateOffer
	}
})();

