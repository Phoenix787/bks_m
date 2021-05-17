/**
 * модуль, который отвечает за создание пина — метки на карте
 */


(function () {
	let mainPin = document.querySelector('.map__pin--main');
	let pins = document.querySelector(".map__pins");


	let Rect = function(left, top, right, bottom) {
		this.left = left;
		this.top = top;
		this.right = right;
		this.bottom = bottom;
	}
	let Coordinate = function(x, y, constraints) {
		this._x = x;
		this._y = y;
		this._constraints = constraints;
	}

	Coordinate.prototype.setX = function(newX) {
		// if(newX >= this._constraints.left &&
		// 	newX <= this._constraints.right) {
		// 		this._x = newX;
		// 	}

		if(this._constraints) {
			this._x = Math.min(newX, this._constraints.right);
			this._x = Math.max(this._x, this._constraints.left);
		} else {
			this._x = newX;
		}

	}
	Coordinate.prototype.setY = function(newY) {
		// if(newY >= this._constraints.top && newY <= this._constraints.bottom) {
		// 	this._y = newY;
		// }

		if(this._constraints) {
			this._y = Math.min(newY, this._constraints.bottom);
			this._y = Math.max(this._y, this._constraints.top);
		} else {
			this._y = newY;
		}
	}

	Coordinate.prototype.getX = function() {
		return this._x;
	}

	Coordinate.prototype.getY = function() {
		return this._y;
	} 



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
	
		// let startCoords = {
		// 	x: evt.clientX,
		// 	y: evt.clientY
		// };

		let startCoords = new Coordinate(evt.clientX, evt.clientY);
		
		
		let onPinMouseMove = (moveEvt) => {
			moveEvt.preventDefault();
			
			dragged = true;
			
			window.map.hideOffer();
			
			let shift = {
				x: startCoords.getX() - moveEvt.clientX,
				y: startCoords.getY() - moveEvt.clientY
			};
			
			
			// startCoords = {
				// 	x: moveEvt.clientX,
				// 	y: moveEvt.clientY
				// };

				startCoords.setX(moveEvt.clientX);
				startCoords.setY(moveEvt.clientY);
						
				
				// let shiftedCoords = {
					// 	x: mainPin.offsetLeft - shift.x,
					// 	y: mainPin.offsetTop - shift.y
					// }
					// shiftedCoords.x = Math.min(shiftedCoords.x, MAX_MAP_X);
			// shiftedCoords.x = Math.max(shiftedCoords.x, MIN_MAP_X);

			// shiftedCoords.y = Math.min(shiftedCoords.y, MAX_MAP_Y);
			// shiftedCoords.y = Math.max(shiftedCoords.y, MIN_MAP_Y);
			
			let shiftedCoords = new Coordinate(0, 0, new Rect(MIN_MAP_X, MIN_MAP_Y, MAX_MAP_X, MAX_MAP_Y));
			shiftedCoords.setX(mainPin.offsetLeft - shift.x);
			shiftedCoords.setY(mainPin.offsetTop - shift.y);
			
	
			mainPin.style.top = (shiftedCoords.getY()) + 'px';
			mainPin.style.left = (shiftedCoords.getX()) + 'px';	
	
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