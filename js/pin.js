/**
 * модуль, который отвечает за создание пина — метки на карте
 */


(function () {
	let mainPin = document.querySelector('.map__pin--main');
	let pins = document.querySelector(".map__pins");
//let boundsOfMap = map.getBoundingClientRect();

const PIN_WIDTH = mainPin.offsetWidth;
const PIN_HEIGHT = mainPin.offsetHeight;
const PIN_TAIL = 22;
const MOUSE_LEFT_BUTTON = 0;
const MIN_MAP_Y = 130 - PIN_TAIL;
const MAX_MAP_Y = 630  - PIN_TAIL;
const MIN_MAP_X = pins.offsetLeft;
const MAX_MAP_X = pins.offsetWidth  - PIN_WIDTH;

mainPin.addEventListener('mousedown', (evt) => {
	evt.preventDefault();
	if (evt.button === MOUSE_LEFT_BUTTON) {
		window.form.activateMap();
	
		let dragged = false;
	
		let startCoords = {
			x: evt.clientX,
			y: evt.clientY
		};
	
	
		let onPinMouseMove = (moveEvt) => {
			moveEvt.preventDefault();
			
			dragged = true;
	
			window.map.hideOffer();

			let shift = {
				x: startCoords.x - moveEvt.clientX,
				y: startCoords.y - moveEvt.clientY
			};
	
			startCoords = {
				x: moveEvt.clientX,
				y: moveEvt.clientY
			};

			let shiftedCoords = {
				x: mainPin.offsetLeft - shift.x,
				y: mainPin.offsetTop - shift.y
			}

			shiftedCoords.x = Math.min(shiftedCoords.x, MAX_MAP_X);
			shiftedCoords.x = Math.max(shiftedCoords.x, MIN_MAP_X);

			shiftedCoords.y = Math.min(shiftedCoords.y, MAX_MAP_Y);
			shiftedCoords.y = Math.max(shiftedCoords.y, MIN_MAP_Y);
	
			mainPin.style.top = (shiftedCoords.y) + 'px';
			mainPin.style.left = (shiftedCoords.x) + 'px';	
	
		};
	
		let onPinMouseUp = (upEvt) => {
			upEvt.preventDefault();
			window.form.updateAddress(upEvt, PIN_HEIGHT, PIN_TAIL);
			document.removeEventListener('mousemove', onPinMouseMove);
			document.removeEventListener('mouseup', onPinMouseUp);
		}
	
	
		document.addEventListener('mousemove', onPinMouseMove);
		document.addEventListener('mouseup', onPinMouseUp);
	}

	


});
})();